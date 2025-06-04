import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-sky-700">
                    Babysitter List
                </h1>
                <Button
                    variant="outline"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    Back to Dashboard
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {babysitters.map((b) => (
                    <Card key={b._id} className="shadow-lg hover:shadow-xl">
                        <CardContent className="p-6 space-y-4">
                            {/* Add photo display */}
                            {b.photo && (
                                <div className="mb-4">
                                    <img
                                        src={b.photo}
                                        alt={b.name}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            <div className="space-y-2">
                                <p className="text-lg">
                                    <strong>Name:</strong> {b.name}
                                </p>
                                <p className="text-lg">
                                    <strong>Phone:</strong> {b.phoneNumber}
                                </p>
                                <p className="text-lg">
                                    <strong>Email:</strong> {b.email}
                                </p>
                                <p className="text-lg">
                                    <strong>Certificate:</strong>{" "}
                                    {b.certificate}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
