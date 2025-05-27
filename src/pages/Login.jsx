import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react"; // icon shadcn/ lucide-react

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            login(data.payload);
            const payload = JSON.parse(atob(data.payload.split(".")[1]));
            navigate(
                payload.role === "user" ? "/admin/dashboard" : "/user/dashboard"
            );
        },
        onError: (error) => {
            alert(
                "Login failed: " +
                    (error.response?.data?.message || error.message)
            );
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg ring-1 ring-gray-200">
                <h2 className="mb-6 text-center text-3xl font-semibold text-gray-900">
                    Đăng nhập tài khoản
                </h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        mutation.mutate(form);
                    }}
                    className="space-y-6"
                >
                    <div>
                        <Label
                            htmlFor="email"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Email hoặc tên đăng nhập
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="example@domain.com"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            required
                            autoComplete="username"
                            className="mt-1"
                        />
                    </div>
                    <div className="relative">
                        <Label
                            htmlFor="password"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Mật khẩu
                        </Label>
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            required
                            autoComplete="current-password"
                            className="mt-1 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[38px] inline-flex items-center justify-center rounded-md p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            tabIndex={-1}
                            aria-label={
                                showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                            }
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Bạn chưa có tài khoản?{" "}
                    <a
                        href="/register"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                        Đăng ký ngay
                    </a>
                </p>
            </div>
        </div>
    );
}
