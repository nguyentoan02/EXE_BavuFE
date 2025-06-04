import React from "react";

export function TestimonialCard({ quote, author, role }) {
    return (
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <div className="text-cyan-500 text-4xl mb-4">"</div>
            <p className="text-gray-600 italic mb-6">{quote}</p>
            <div className="flex items-center">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                    <span className="text-cyan-500 font-bold">
                        {author.charAt(0)}
                    </span>
                </div>
                <div className="ml-4">
                    <p className="font-semibold text-gray-800">{author}</p>
                    <p className="text-gray-500 text-sm">{role}</p>
                </div>
            </div>
        </div>
    );
}

export default function Testimonials() {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    What Parents Say
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TestimonialCard
                        quote="BabyCare has been a lifesaver for our family. The nannies are professional and loving."
                        author="Sarah Johnson"
                        role="Mother of two"
                    />
                    <TestimonialCard
                        quote="The peace of mind that comes with knowing your child is in good hands is priceless."
                        author="Michael Chen"
                        role="Father of one"
                    />
                    <TestimonialCard
                        quote="We've used BabyCare for over a year now and couldn't be happier with the service."
                        author="Emily Rodriguez"
                        role="Mother of three"
                    />
                </div>
            </div>
        </div>
    );
}