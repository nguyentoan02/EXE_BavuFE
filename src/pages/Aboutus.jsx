// This is a simplified example for a React component.
// You can adapt this to your specific framework (Vue, Angular, etc.)
// or just use the raw HTML and Tailwind classes.

import React from "react";
import { Button } from "@/components/ui/button"; // Assuming Shadcn Button import path
import Header from "./Header";

const AboutUsPage = () => {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                    {/* Left Column: Content */}
                    <div className="space-y-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                            Postpartum Emotional Care & Parenting Skills
                        </h1>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            We understand that new mothers need emotional
                            support and guidance to navigate the postpartum
                            period with confidence. Our dedicated team provides
                            compassionate care, expert advice, and practical
                            parenting skills to help mothers feel empowered and
                            supported in their journey.
                        </p>

                        <ul className="list-disc list-inside text-gray-700 space-y-3">
                            <li>
                                Emotional support and counseling for postpartum
                                well-being.
                            </li>
                            <li>
                                Parenting workshops on newborn care and
                                breastfeeding.
                            </li>
                            <li>
                                Guidance on sleep training and baby routines.
                            </li>
                            <li>
                                Nutritional advice for postpartum recovery and
                                lactation.
                            </li>
                            <li>
                                Relaxation techniques and stress management for
                                new mothers.
                            </li>
                            <li>
                                Community support groups for shared experiences
                                and encouragement.
                            </li>
                        </ul>

                        <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out">
                            Learn More
                        </Button>
                    </div>

                    {/* Right Column: Image */}
                    <div className="flex justify-center md:justify-end">
                        <img
                            src="image4.png" // **Replace with your actual image path**
                            alt="Mother holding baby, symbolizing care and support"
                            className="rounded-lg shadow-xl object-cover w-full h-auto max-w-lg md:max-w-none"
                            // You might want to add aspect-ratio classes like aspect-video or aspect-square if needed
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUsPage;
