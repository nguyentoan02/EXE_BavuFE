# Stage 1: Build (Giữ nguyên như của bạn)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve bằng Nginx (Tối ưu hơn 'serve')
FROM nginx:alpine AS runner

# Copy file build từ stage 1 vào thư mục html của nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy file cấu hình custom (để fix lỗi React Router 404 khi refresh)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]