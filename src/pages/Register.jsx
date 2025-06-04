import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { register as registerApi } from "../api/auth";

export default function Register() {
    const [form, setForm] = useState({ email: "", password: "", role: "user" });
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: registerApi,
        onSuccess: () => {
            alert("Registration successful!");
            navigate("/login");
        },
        onError: (error) => {
            alert(
                "Registration failed: " +
                    (error.response?.data?.message || error.message)
            );
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg ring-1 ring-gray-200">
                <h2 className="mb-6 text-center text-3xl font-semibold text-gray-900">
                    Đăng ký tài khoản
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
                            Email
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
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="password"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Mật khẩu
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            required
                            className="mt-1"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? "Đang đăng ký..." : "Đăng ký"}
                    </Button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Bạn đã có tài khoản?{" "}
                    <a
                        href="/login"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                        Đăng nhập ngay
                    </a>
                </p>
            </div>
        </div>
    );
}
