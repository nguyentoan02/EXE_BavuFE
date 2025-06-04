import { ShieldCheck, Clock, Users, Star } from "lucide-react";

export default function Midlanding() {
    return (
        <>
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        {/* Hình ảnh bên trái */}
                        <div className="w-full md:w-1/2">
                            <div className="relative rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src="/image5.png"
                                    alt="BabyCare Story"
                                    className="w-full h-auto"
                                />
                                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-cyan-100 rounded-full -z-10 opacity-70"></div>
                            </div>
                        </div>

                        {/* Nội dung bên phải */}
                        <div className="w-full md:w-1/2 space-y-6">
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-12 bg-cyan-500 rounded-full"></span>
                                <h2 className="text-3xl font-bold text-gray-800">
                                    Our Mission
                                </h2>
                            </div>

                            <p className="text-gray-600 leading-relaxed">
                                At BabyCare, we're transforming the way families
                                find childcare by creating a trusted platform
                                that connects parents with certified,
                                experienced nannies.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0">
                                        <ShieldCheck className="h-6 w-6 text-cyan-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">
                                            Trusted Safety
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            All nannies undergo rigorous
                                            background checks and certification
                                            verification
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex-shrink-0">
                                        <Clock className="h-6 w-6 text-cyan-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">
                                            Flexible Scheduling
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Book services by hour, day, or month
                                            to fit your unique needs
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex-shrink-0">
                                        <Users className="h-6 w-6 text-cyan-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">
                                            Community Building
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Creating connections between
                                            families and qualified caregivers
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex-shrink-0">
                                        <Star className="h-6 w-6 text-cyan-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">
                                            Quality Care
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Ensuring every child receives
                                            attentive, loving, and
                                            developmentally appropriate care
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-600 leading-relaxed border-l-4 border-cyan-500 pl-4 italic">
                                "Our vision is a world where every family has
                                access to reliable, affordable childcare, and
                                every qualified caregiver can build a rewarding
                                career."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
