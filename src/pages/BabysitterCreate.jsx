import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL;

export default function BabysitterCreate() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        certificate: "",
    });

    const handleCreate = async () => {
        try {
            await axios.post(
                `${API_URL}/babysitters`,
                { ...form },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate("/babysitters/admin"); // Điều hướng về trang danh sách
        } catch (error) {
            console.error("Failed to create babysitter:", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <Card className="max-w-lg mx-auto shadow-md">
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-bold text-center">
                        Create New Babysitter
                    </h2>
                    <Input
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />
                    <Input
                        placeholder="Phone Number"
                        value={form.phoneNumber}
                        onChange={(e) =>
                            setForm({ ...form, phoneNumber: e.target.value })
                        }
                    />
                    <Input
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />
                    <Input
                        placeholder="Certificate"
                        value={form.certificate}
                        onChange={(e) =>
                            setForm({ ...form, certificate: e.target.value })
                        }
                    />
                    <div className="flex justify-between">
                        <Button
                            onClick={handleCreate}
                            className="bg-green-500 hover:bg-green-600"
                        >
                            Create
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate("/babysitters/admin")}
                        >
                            Cancel
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
