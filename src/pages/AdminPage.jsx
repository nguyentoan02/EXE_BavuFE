import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Calendar, FileText, MapPin, Building } from "lucide-react";
import Footer from "./Footer";

export default function AdminPage() {
    // if (!user) {
    //     return <div className="text-center mt-20">Loading...</div>;
    // }

    return (
        <>
            <Header />

            <div className="container mx-auto py-10">
                {/* Services Section */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-center mb-12 text-sky-700">
                        Available Services
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ServiceCard
                            title="Hourly Package"
                            image="/image.png"
                            price="150,000 VND/H"
                            type="Baby Care"
                            schedule="Monday - Saturday"
                            location="Da Nang"
                        />
                        {/* Daily Package */}
                        <ServiceCard
                            title="Daily Package"
                            image="/image2.png"
                            price="450,000 VND/D"
                            type="Baby Care"
                            schedule="Monday - Saturday"
                            location="Da Nang"
                        />
                        {/* Monthly Package */}
                        <ServiceCard
                            title="Monthly Package"
                            image="/image3.png"
                            price="7,840,000 VND/H"
                            type="Baby Care"
                            schedule="Monday - Saturday"
                            location="Da Nang"
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

function ServiceCard({ title, image, price, type, schedule, location }) {
    const navigate = useNavigate();

    return (
        <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
            <div className="aspect-[16/10] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                />
            </div>

            <div className="p-4 border-b">
                <h3
                    className="text-xl font-semibold text-sky-600 cursor-pointer hover:underline"
                    onClick={() => navigate("/service-detail-daily")}
                >
                    {title}
                </h3>
            </div>

            <div className="p-4 space-y-4">
                <p className="text-2xl font-bold">{price}</p>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Building className="h-4 w-4 text-sky-600" />
                        <span>{type}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-sky-600" />
                        <span>{schedule}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-sky-600" />
                        <span>{location}</span>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t">
                <button
                    className="w-full px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
                    onClick={() => {
                        if (title === "Daily Package") {
                            navigate("/service-detail-daily");
                        } else {
                            navigate("/service-detail");
                        }
                    }}
                >
                    Book Now
                </button>
            </div>
        </div>
    );
}
