import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Phone, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function BabysitterListUser() {
    const [babysitters, setBabysitters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${API_URL}/babysitters`)
            .then((res) => setBabysitters(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-sky-700 mb-8 text-center">
                Babysitter List
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {babysitters.map((b) => (
                    <Card
                        key={b._id}
                        className="shadow-lg rounded-xl border border-blue-100 hover:shadow-xl transition-shadow duration-200 bg-gradient-to-br from-white via-blue-50 to-blue-100"
                    >
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex-shrink-0">
                                    {b.photo ? (
                                        <img
                                            src={b.photo}
                                            alt={b.name}
                                            className="w-32 h-32 object-cover rounded-full border-4 border-blue-200 shadow"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-100 border-4 border-blue-200 shadow">
                                            <User className="w-16 h-16 text-blue-400" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-sky-700 flex items-center gap-2">
                                        <User className="w-5 h-5 text-blue-500" />
                                        {b.name}
                                    </h2>
                                </div>
                            </div>
                            <div className="space-y-2 text-[17px]">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Phone className="w-5 h-5 text-green-500" />
                                    <span className="font-medium">
                                        {b.phoneNumber}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Mail className="w-5 h-5 text-pink-500" />
                                    <span className="font-medium">
                                        {b.email}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <MapPin className="w-5 h-5 text-orange-500" />
                                    <span className="font-medium">
                                        {b.location || "N/A"}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-end pt-6">
                                <Button
                                    size="sm"
                                    onClick={() =>
                                        navigate(`/babysitters/${b._id}`)
                                    }
                                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                                >
                                    Detail
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
