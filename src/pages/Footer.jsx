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
        <footer className="bg-gradient-to-r from-sky-600 to-cyan-500 text-white py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* About Section */}
                <div>
                    <h3 className="text-xl font-bold mb-4">About Us</h3>
                    <p className="text-sm leading-relaxed">
                        We provide professional babysitting services to ensure
                        your child's safety and happiness. Trust us to care for
                        your loved ones.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <Home className="h-5 w-5 text-white" />
                            <Link to="/" className="hover:underline">
                                Home
                            </Link>
                        </li>
                        <li className="flex items-center gap-3">
                            <Info className="h-5 w-5 text-white" />
                            <Link to="/about" className="hover:underline">
                                About Us
                            </Link>
                        </li>
                        <li className="flex items-center gap-3">
                            <Briefcase className="h-5 w-5 text-white" />
                            <Link to="/services" className="hover:underline">
                                Services
                            </Link>
                        </li>
                        <li className="flex items-center gap-3">
                            <MessageSquare className="h-5 w-5 text-white" />
                            <Link to="/contact" className="hover:underline">
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-white" />
                            <span>+84 123 456 789</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-white" />
                            <span>support@babycare.com</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-white" />
                            <span>123 Le Loi Street, Da Nang</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-12 text-center text-sm border-t border-white/20 pt-6">
                © {new Date().getFullYear()} Baby Care. All rights reserved.
            </div>
        </footer>
    );
}
