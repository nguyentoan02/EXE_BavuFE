import React from "react";
import { Calendar, Clock, FileText, MapPin, Building } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "./Header";

export default function ListService() {
    return (
        <>
            <Header />
            <div className="container mx-auto py-16 px-4">
                <h1 className="text-3xl font-bold text-center mb-12 text-sky-700">
                    Our Services
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Hourly Package */}
                    <ServiceCard
                        title="Hourly Package"
                        image="/images/hourly-care.jpg" // Replace with your actual image path
                        price="150,000 VND/H"
                        type="Baby Care"
                        schedule="Monday - Saturday"
                        location="Da Nang"
                        fallbackImage="https://images.unsplash.com/photo-1577201561566-380f0197471a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                    />

                    {/* Daily Package */}
                    <ServiceCard
                        title="Daily Package"
                        image="/images/daily-care.jpg" // Replace with your actual image path
                        price="450,000 VND/D"
                        type="Baby care"
                        schedule="Monday - Saturday"
                        location="Da Nang"
                        fallbackImage="https://images.unsplash.com/photo-1540479859555-17af45c78602?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                    />

                    {/* Monthly Package */}
                    <ServiceCard
                        title="Monthly Package"
                        image="/images/monthly-care.jpg" // Replace with your actual image path
                        price="7,840,000 VND/H"
                        type="Baby care"
                        schedule="Monday - Saturday"
                        location="Da Nang"
                        fallbackImage="https://images.unsplash.com/photo-1607285164713-4469958553c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                    />
                </div>
            </div>
        </>
    );
}

function ServiceCard({
    title,
    image,
    price,
    type,
    schedule,
    location,
    fallbackImage,
}) {
    // Handle image error by replacing with fallback
    const handleImageError = (e) => {
        e.target.src = fallbackImage;
    };

    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg">
            <div className="aspect-[16/10] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                    onError={handleImageError}
                />
            </div>

            <CardHeader>
                <h3 className="text-xl font-semibold text-sky-600">{title}</h3>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-2xl font-bold">{price}</p>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                        >
                            <Building className="mr-1 h-3 w-3" />
                            Care / Recovery
                        </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <Building className="h-4 w-4 text-sky-600" />
                        <span>{type}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-sky-600" />
                        <span>{schedule}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-sky-600" />
                        <span>Contract</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-sky-600" />
                        <span>{location}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <Button className="w-full bg-sky-600 hover:bg-sky-700">
                    Book Now
                </Button>
            </CardFooter>
        </Card>
    );
}
