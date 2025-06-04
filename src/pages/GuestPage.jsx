import React from "react";
import Header from "./Header";
import Midlanding from "./MidLanding";
import Services from "./Services";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";
import BlogSection from "./BlogSection";
import Footer from "./Footer";

export default function GuestPage() {
    return (
        <>
            <Header />
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                {/* Khung chứa ảnh */}
                <div className="relative w-full h-full overflow-hidden">
                    <img
                        src="/image4.png"
                        alt="Welcome to Baby Care"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Phần nội dung bên dưới */}
            <Midlanding />

            {/* Các phần được tách ra thành component riêng */}
            <Services />
            <Testimonials />
            <BlogSection />
            <CallToAction />

            <Footer />
        </>
    );
}
