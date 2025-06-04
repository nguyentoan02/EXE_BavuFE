import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth"; // Import hook để kiểm tra trạng thái đăng nhập

export default function Header() {
    const { logout, token, user } = useAuth(); // Lấy token từ context
    const navigate = useNavigate(); // Dùng để điều hướng sau khi logout

    const handleLogout = () => {
        logout(); // Gọi hàm logout
        navigate("/admin/dashboard"); // Điều hướng về trang login
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <div className="relative h-12 w-12">
                        {" "}
                        {/* Giảm kích thước logo */}
                        <img
                            src="/logo.jpeg"
                            alt="Baby Care Logo"
                            className="h-full w-full object-contain rounded-full"
                        />
                    </div>
                    <span className="ml-2 text-lg font-bold text-sky-500">
                        {" "}
                        {/* Giảm kích thước chữ */}
                        BABY CARE
                    </span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center">
                    <nav className="flex items-center space-x-8 mr-6">
                        <NavItem
                            href={
                                user?.role === "admin"
                                    ? "/babysitters/admin"
                                    : "/babysitters"
                            }
                        >
                            Babysitter
                        </NavItem>
                        <NavItem href="/admin/dashboard">Services</NavItem>
                        {token && (
                            <NavItem
                                href={
                                    user?.role === "admin"
                                        ? "/user/dashboard"
                                        : "/appointments/user"
                                }
                            >
                                History
                            </NavItem>
                        )}{" "}
                        {/* Chỉ hiển thị nếu đã đăng nhập */}
                        <NavItem href="/about">About us</NavItem>
                        <NavItem href="/blog">Blog</NavItem>
                        <NavItem href="/more" hasDropdown>
                            More
                        </NavItem>
                        <NavItem
                            href="/contact"
                            className="text-blue-500 font-medium"
                        >
                            Contact Us
                        </NavItem>
                    </nav>

                    {/* Login Button */}
                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        {token ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-600">
                                        {user?.email}
                                    </span>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1 hover:bg-red-50"
                                    onClick={handleLogout}
                                >
                                    <LogIn className="h-4 w-4" />
                                    <span>Logout</span>
                                </Button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1"
                                >
                                    <LogIn className="h-4 w-4" />
                                    <span>Login</span>
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

function NavItem({ href, children, hasDropdown = false, className }) {
    return (
        <Link
            to={href}
            className={cn(
                "relative flex items-center text-sm font-medium transition-colors hover:text-blue-500",
                hasDropdown && "group",
                className
            )}
        >
            {children}
            {hasDropdown && (
                <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
            )}

            {/* Active indicator - appears when route is active */}
            <span className="absolute left-0 -bottom-[18px] h-[2px] w-full scale-x-0 bg-blue-500 transition-transform hover:scale-x-100"></span>
        </Link>
    );
}
