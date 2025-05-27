import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate để điều hướng
import Header from "./Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ModalForm from "./ModalForm";
import { useAuth } from "../hooks/useAuth"; // Import useAuth để kiểm tra trạng thái đăng nhập

const ServiceDetail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { token } = useAuth(); // Lấy token từ context hoặc hook
    const navigate = useNavigate(); // Dùng để điều hướng

    const handleOpenModal = () => {
        if (!token) {
            // Nếu chưa đăng nhập, điều hướng đến trang login
            navigate("/login");
        } else {
            // Nếu đã đăng nhập, mở modal
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-8">
                    {/* Left Section: Text Content */}
                    <div>
                        {/* Location, Date, Contract */}
                        <div className="flex items-center space-x-4 text-yellow-600 mb-6">
                            <Badge
                                variant="outline"
                                className="flex items-center gap-2"
                            >
                                <span className="material-icons text-lg">
                                    place
                                </span>
                                <span>Vietnam</span>
                            </Badge>
                            <Badge
                                variant="outline"
                                className="flex items-center gap-2"
                            >
                                <span className="material-icons text-lg">
                                    event
                                </span>
                                <span>15-05-2025</span>
                            </Badge>
                            <Badge
                                variant="outline"
                                className="flex items-center gap-2"
                            >
                                <span className="material-icons text-lg">
                                    description
                                </span>
                                <span>Contract</span>
                            </Badge>
                        </div>

                        {/* Title and Description */}
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            Experienced and Caring Baby Care
                        </h1>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Emily Johnson is a dedicated and experienced
                            childcare provider with over 7 years of experience.
                            She offers a safe, nurturing, and engaging
                            environment for infants and toddlers. Her passion
                            for childcare ensures that every baby receives the
                            attention and love they need to thrive happily.
                        </p>

                        {/* Features */}
                        <ul className="space-y-4 text-blue-600">
                            <li className="flex items-center gap-2">
                                <span className="material-icons text-lg">
                                    arrow_right
                                </span>
                                <span className="font-medium">
                                    Certified in infant and toddler care
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-icons text-lg">
                                    arrow_right
                                </span>
                                <span className="font-medium">
                                    Warm, patient, and attentive to every
                                    child's needs
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-icons text-lg">
                                    arrow_right
                                </span>
                                <span className="font-medium">
                                    Creates a stimulating environment for early
                                    learning and development
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-icons text-lg">
                                    arrow_right
                                </span>
                                <span className="font-medium">
                                    Flexible schedule to support parents' needs
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Right Section: Image and Button */}
                    <div className="flex flex-col items-center justify-center space-y-6">
                        <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
                            <img
                                src="image2.png"
                                alt="Childcare"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <Button
                            className="bg-red-500 text-white hover:bg-red-600 w-full py-3 text-lg"
                            onClick={handleOpenModal}
                        >
                            Book Now
                        </Button>
                    </div>
                </div>
            </div>

            {/* Modal Form */}
            <ModalForm isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default ServiceDetail;
