import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function BabysitterListAdmin() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [babysitters, setBabysitters] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        certificate: "",
    });
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const fetchData = () => {
        axios
            .get(`${API_URL}/babysitters`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setBabysitters(res.data));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/babysitters/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchData();
    };

    const handleEdit = async (b) => {
        setEditing(b._id);
        setForm(b);
        // Reset photo preview nếu có
        if (b.photo) {
            setPhotoPreview(b.photo);
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("phoneNumber", form.phoneNumber);
        formData.append("email", form.email);
        formData.append("certificate", form.certificate);
        if (photo) {
            formData.append("photo", photo);
        }

        await axios.put(`${API_URL}/babysitters/${editing}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        setEditing(null);
        setPhoto(null);
        setPhotoPreview(null);
        fetchData();
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            // Tạo preview URL cho ảnh
            const previewUrl = URL.createObjectURL(file);
            setPhotoPreview(previewUrl);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-sky-700">
                    Manage Babysitters
                </h1>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/babysitters/create")}
                    >
                        Create babysitters
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate("/user/dashboard")}
                    >
                        Back to Dashboard
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {babysitters.map((b) =>
                    editing === b._id ? (
                        <Card key={b._id} className="shadow-lg">
                            <CardContent className="p-4 space-y-2">
                                {/* Thêm input cho ảnh */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Photo
                                    </label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="w-full"
                                    />
                                    {photoPreview && (
                                        <div className="mt-2">
                                            <img
                                                src={photoPreview}
                                                alt="Preview"
                                                className="w-32 h-32 object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>

                                <Input
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    placeholder="Name"
                                />
                                <Input
                                    value={form.phoneNumber}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            phoneNumber: e.target.value,
                                        })
                                    }
                                    placeholder="Phone Number"
                                />
                                <Input
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                    }
                                    placeholder="Email"
                                />
                                <Input
                                    value={form.certificate}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            certificate: e.target.value,
                                        })
                                    }
                                    placeholder="Certificate"
                                />
                                <Button
                                    onClick={handleSave}
                                    className="w-full bg-green-500 hover:bg-green-600"
                                >
                                    Save
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card key={b._id} className="shadow-lg">
                            <CardContent className="p-4 space-y-2">
                                {b.photo && (
                                    <div className="mb-4">
                                        <img
                                            src={b.photo}
                                            alt={b.name}
                                            className="w-32 h-32 object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                                <p>
                                    <strong>Name:</strong> {b.name}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {b.phoneNumber}
                                </p>
                                <p>
                                    <strong>Email:</strong> {b.email}
                                </p>
                                <p>
                                    <strong>Certificate:</strong>{" "}
                                    {b.certificate}
                                </p>
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        size="sm"
                                        onClick={() => handleEdit(b)}
                                        className="bg-blue-500 hover:bg-blue-600"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDelete(b._id)}
                                        className="bg-red-500 hover:bg-red-600"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                )}
            </div>
        </div>
    );
}
