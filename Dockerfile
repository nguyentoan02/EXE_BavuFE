# ==========================================
# STAGE 1: BUILDER
# Dùng node:20-slim để build ổn định hơn Alpine
# ==========================================
FROM node:20-slim AS builder

WORKDIR /app

# Copy file định nghĩa gói trước để tận dụng cache layer của Docker
COPY package.json package-lock.json* ./

# --- KỸ THUẬT TĂNG TỐC ĐỘ BUILD ---
# 1. --mount=type=cache: Lưu thư mục .npm vào cache của máy chủ (không bị xóa sau khi build xong).
# 2. --prefer-offline: Ưu tiên lấy từ cache nếu có.
# 3. --no-audit: Bỏ qua kiểm tra bảo mật để chạy nhanh hơn.
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline --no-audit

# Copy toàn bộ source code (bao gồm cả file .env do CI/CD tạo ra)
COPY . .

# Chạy lệnh build (Vite sẽ tạo thư mục /dist)
RUN npm run build

# ==========================================
# STAGE 2: RUNNER (NGINX)
# Dùng Nginx Alpine để chạy production cho nhẹ (chỉ tốn ~20MB RAM)
# ==========================================
FROM nginx:alpine AS runner

# Xóa cấu hình mặc định của Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy file cấu hình Nginx chuẩn SPA (bạn đã tạo file nginx.conf chưa?)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy kết quả build từ Stage 1 sang thư mục chạy web của Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Frontend luôn chạy port 80 (Traefik sẽ chọc vào port này)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
