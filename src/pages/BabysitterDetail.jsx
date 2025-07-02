import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Award, Star, User } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function BabysitterDetail() {
    const { id } = useParams();
    const [babysitter, setBabysitter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBabysitterDetail = async () => {
            try {
                const res = await axios.get(`${API_URL}/babysitters/${id}`);
                setBabysitter(res.data.data);
            } catch (error) {
                console.error("Failed to fetch babysitter detail:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBabysitterDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-medium text-gray-600">Loading...</p>
            </div>
        );
    }

    if (!babysitter) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-medium text-red-600">
                    Babysitter not found.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <Card className="shadow-lg rounded-xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-blue-100">
                <CardContent className="p-6 space-y-6">
                    {/* Photo */}
                    {babysitter.photo && (
                        <div className="flex justify-center mb-6">
                            <img
                                src={babysitter.photo}
                                alt={babysitter.name}
                                className="w-48 h-48 object-cover rounded-full border-4 border-blue-200 shadow-md"
                            />
                        </div>
                    )}

                    {/* Name */}
                    <h1 className="text-3xl font-bold text-center text-sky-700 flex items-center gap-2">
                        <User className="w-6 h-6 text-sky-600" />
                        {babysitter.name}
                    </h1>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <div className="flex items-center gap-2">
                            <Phone className="w-5 h-5 text-green-500" />
                            <span>{babysitter.phoneNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-5 h-5 text-pink-500" />
                            <span>{babysitter.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-500" />
                            <span>{babysitter.age} years old</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-orange-500" />
                            <span>{babysitter.location}</span>
                        </div>
                    </div>

                    {/* Certificate */}
                    <div>
                        <h2 className="text-lg font-semibold text-sky-700 flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-500" />
                            Certificates
                        </h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {babysitter.certificate.map((cert, index) => (
                                <Badge key={index} variant="outline">
                                    {cert}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Forte */}
                    <div>
                        <h2 className="text-lg font-semibold text-sky-700 flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            Forte
                        </h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {babysitter.forte.map((skill, index) => (
                                <Badge key={index} variant="outline">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Feedback */}
                    <div>
                        <h2 className="text-lg font-semibold text-sky-700 flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            Feedback
                        </h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {babysitter.feedback.map((feedback, index) => (
                                <Badge key={index} variant="outline">
                                    {feedback}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Experience */}
                    <div>
                        <h2 className="text-lg font-semibold text-sky-700 flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-500" />
                            Experience
                        </h2>
                        <div
                            className="prose max-w-none mt-2 text-gray-700"
                            dangerouslySetInnerHTML={{
                                __html:
                                    babysitter.experience ||
                                    "<p>No experience provided</p>",
                            }}
                        />
                    </div>

                    {/* Back Button */}
                    <div className="flex justify-center mt-6">
                        <Button
                            variant="outline"
                            className="hover:bg-blue-50"
                            onClick={() => window.history.back()}
                        >
                            Back
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
