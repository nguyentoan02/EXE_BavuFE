import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
    Mail,
    Phone,
    User,
    Award,
    Star,
    MessageCircle,
    MapPin,
    Calendar,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function BabysitterUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        certificate: "",
        forte: "",
        feedback: "",
        location: "",
        age: "",
        experience: "",
    });
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${API_URL}/babysitters/${id}`)
            .then((res) => {
                const data = res.data.data || res.data;
                setForm({
                    name: data.name || "",
                    phoneNumber: data.phoneNumber || "",
                    email: data.email || "",
                    certificate: Array.isArray(data.certificate)
                        ? data.certificate.join(", ")
                        : "",
                    forte: Array.isArray(data.forte)
                        ? data.forte.join(", ")
                        : "",
                    feedback: Array.isArray(data.feedback)
                        ? data.feedback.join(", ")
                        : "",
                    location: data.location || "",
                    age: data.age || "",
                    experience: data.experience || "",
                });
                if (data.photo) {
                    setPhotoPreview(data.photo);
                }
                setIsLoading(false); // Đánh dấu đã load xong
            })
            .catch((err) => {
                console.error("Failed to fetch babysitter:", err);
                navigate("/babysitters/admin"); // Redirect to list page on error
            });
    }, [id]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            const previewUrl = URL.createObjectURL(file);
            setPhotoPreview(previewUrl);
        }
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("phoneNumber", form.phoneNumber);
        formData.append("email", form.email);
        formData.append(
            "certificate",
            form.certificate.split(",").map((s) => s.trim())
        );
        formData.append(
            "forte",
            form.forte.split(",").map((s) => s.trim())
        );
        formData.append(
            "feedback",
            form.feedback.split(",").map((s) => s.trim())
        );
        formData.append("location", form.location);
        formData.append("age", form.age);
        formData.append("experience", form.experience);
        if (photo) {
            formData.append("photo", photo);
        }

        try {
            await axios.put(`${API_URL}/babysitters/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/babysitters/admin");
        } catch (error) {
            console.error("Failed to update babysitter:", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-8">
            <div className="w-full max-w-xl rounded-2xl bg-white/90 shadow-2xl ring-1 ring-blue-100 p-8">
                <h1 className="text-3xl font-bold text-center text-sky-700 mb-8 tracking-tight">
                    Update Babysitter
                </h1>
                {isLoading ? (
                    <div className="text-center text-sky-500 py-12">
                        Loading...
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Photo */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <User className="w-4 h-4 text-sky-500" />
                                Photo
                            </label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="w-full"
                            />
                            {photoPreview && (
                                <div className="mt-3 flex justify-center">
                                    <img
                                        src={photoPreview}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-full border-4 border-blue-200 shadow"
                                    />
                                </div>
                            )}
                        </div>
                        {/* Info fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                    <User className="w-4 h-4 text-sky-500" />
                                    Name
                                </label>
                                <Input
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    placeholder="Name"
                                    className="bg-blue-50"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                    <Phone className="w-4 h-4 text-sky-500" />
                                    Phone Number
                                </label>
                                <Input
                                    value={form.phoneNumber}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            phoneNumber: e.target.value,
                                        })
                                    }
                                    placeholder="Phone Number"
                                    className="bg-blue-50"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                    <Mail className="w-4 h-4 text-sky-500" />
                                    Email
                                </label>
                                <Input
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                    }
                                    placeholder="Email"
                                    className="bg-blue-50"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                    <Calendar className="w-4 h-4 text-sky-500" />
                                    Age
                                </label>
                                <Input
                                    value={form.age}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            age: e.target.value,
                                        })
                                    }
                                    placeholder="Age"
                                    className="bg-blue-50"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                    <Award className="w-4 h-4 text-sky-500" />
                                    Certificate
                                </label>
                                <Input
                                    value={form.certificate}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            certificate: e.target.value,
                                        })
                                    }
                                    placeholder="Certificate (comma separated)"
                                    className="bg-blue-50"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                    <Star className="w-4 h-4 text-sky-500" />
                                    Forte
                                </label>
                                <Input
                                    value={form.forte}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            forte: e.target.value,
                                        })
                                    }
                                    placeholder="Forte (comma separated)"
                                    className="bg-blue-50"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                    <MessageCircle className="w-4 h-4 text-sky-500" />
                                    Feedback
                                </label>
                                <Input
                                    value={form.feedback}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            feedback: e.target.value,
                                        })
                                    }
                                    placeholder="Feedback (comma separated)"
                                    className="bg-blue-50"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                    <MapPin className="w-4 h-4 text-sky-500" />
                                    Location
                                </label>
                                <Input
                                    value={form.location}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            location: e.target.value,
                                        })
                                    }
                                    placeholder="Location"
                                    className="bg-blue-50"
                                />
                            </div>
                        </div>
                        {/* Experience */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Award className="w-4 h-4 text-sky-500" />
                                Experience
                            </label>
                            <div className="rounded-lg border border-blue-100 bg-blue-50 p-2">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={form.experience || ""}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setForm({ ...form, experience: data });
                                    }}
                                />
                            </div>
                        </div>
                        {/* Buttons */}
                        <div className="flex flex-col gap-3 pt-4">
                            <Button
                                onClick={handleUpdate}
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition-transform transform hover:scale-105"
                            >
                                Update
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/babysitters/admin")}
                                className="w-full border-sky-500 text-sky-700 hover:bg-sky-50 font-semibold shadow-md transition-transform transform hover:scale-105"
                            >
                                Back
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
