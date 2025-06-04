import React from "react";
import { useNavigate } from "react-router-dom";

export default function CallToAction() {
    const navigate = useNavigate();

    return (
        <div className="bg-cyan-500 text-white py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">
                    Ready to Find Your Perfect Nanny?
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Join thousands of families who trust BabyCare for their
                    childcare needs.
                </p>
                <button 
                    className="px-8 py-4 bg-white text-cyan-500 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                    onClick={() => navigate("/login")}
                >
                    Get Started Today
                </button>
            </div>
        </div>
    );
}