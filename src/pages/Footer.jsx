import { Link } from "react-router-dom";
import {
    Phone,
    Mail,
    MapPin,
    Home,
    Info,
    Briefcase,
    MessageSquare,
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-sky-600 text-white py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* About Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">About Us</h3>
                    <p className="text-sm">
                        We provide professional babysitting services to ensure
                        your child's safety and happiness.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <Home className="h-4 w-4" />
                            <Link to="/" className="hover:underline">
                                Home
                            </Link>
                        </li>
                        <li className="flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            <Link to="/about" className="hover:underline">
                                About Us
                            </Link>
                        </li>
                        <li className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            <Link to="/services" className="hover:underline">
                                Services
                            </Link>
                        </li>
                        <li className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            <Link to="/contact" className="hover:underline">
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <p className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4" /> +84 123 456 789
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4" /> support@babycare.com
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4" /> 123 Le Loi Street, Da
                        Nang
                    </p>
                </div>
            </div>

            <div className="mt-8 text-center text-sm border-t border-white pt-4">
                © {new Date().getFullYear()} Baby Care. All rights reserved.
            </div>
        </footer>
    );
}
