import React from "react";

export function ServiceCard({ icon, title, description }) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {title}
            </h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

export default function Services() {
    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    Our Services
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ServiceCard
                        icon="👶"
                        title="Infant Care"
                        description="Specialized care for newborns and infants with experienced nannies."
                    />
                    <ServiceCard
                        icon="🏫"
                        title="After School Care"
                        description="Reliable care for school-aged children when parents are at work."
                    />
                    <ServiceCard
                        icon="🏠"
                        title="Home Daycare"
                        description="Full-day childcare services in a safe and nurturing environment."
                    />
                </div>
            </div>
        </div>
    );
}