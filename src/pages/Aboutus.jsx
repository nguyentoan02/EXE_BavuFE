import React from "react";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import Footer from "./Footer";

const AboutUsPage = () => {
    return (
        <>
            <Header />
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Left Column: Content */}
                        <div className="space-y-6">
                            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                                Empowering Mothers, Building Strong Families
                            </h1>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                At BabyCare, we provide emotional support and
                                practical parenting skills to help new mothers
                                navigate the postpartum period with confidence.
                                Our mission is to empower families and ensure
                                every child receives the care they deserve.
                            </p>

                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <span className="material-icons text-blue-500">
                                        favorite
                                    </span>
                                    <span>
                                        Emotional support and counseling for
                                        postpartum well-being.
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-icons text-blue-500">
                                        child_care
                                    </span>
                                    <span>
                                        Parenting workshops on newborn care and
                                        breastfeeding.
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-icons text-blue-500">
                                        bedtime
                                    </span>
                                    <span>
                                        Guidance on sleep training and baby
                                        routines.
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-icons text-blue-500">
                                        restaurant
                                    </span>
                                    <span>
                                        Nutritional advice for postpartum
                                        recovery and lactation.
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-icons text-blue-500">
                                        groups
                                    </span>
                                    <span>
                                        Community support groups for shared
                                        experiences and encouragement.
                                    </span>
                                </li>
                            </ul>

                            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md">
                                Learn More
                            </Button>
                        </div>

                        {/* Right Column: Image */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-100 rounded-lg -z-10 opacity-50"></div>
                            <img
                                src="image4.png"
                                alt="Mother holding baby, symbolizing care and support"
                                className="rounded-lg shadow-lg object-cover w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUsPage;
