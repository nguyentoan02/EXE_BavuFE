import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, MapPin, Eye, Edit, Trash2 } from "lucide-react";

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
            const previewUrl = URL.createObjectURL(file);
            setPhotoPreview(previewUrl);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-sky-700">
                    Manage Babysitters
                </h1>
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/babysitters/create")}
                    >
                        Create Babysitter
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate("/user/dashboard")}
                    >
                        Back to Dashboard
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {babysitters.map((b) =>
                    editing === b._id ? (
                        <Card key={b._id} className="shadow-lg rounded-lg">
                            <CardContent className="p-6 space-y-4">
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
                                                className="w-32 h-32 object-cover rounded-lg shadow-md"
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
                                <div className="flex gap-4 pt-6 justify-end">
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            navigate(`/babysitters/${b._id}`)
                                        }
                                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View Details
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            navigate(
                                                `/babysitters/update/${b._id}`
                                            )
                                        }
                                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDelete(b._id)}
                                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                                    >
                                        <Trash2 className="w-4 h-4" />
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
