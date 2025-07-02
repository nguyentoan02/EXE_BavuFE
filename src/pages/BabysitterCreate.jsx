import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
    User,
    Phone,
    Mail,
    MapPin,
    Award,
    Star,
    MessageCircle,
    FileText,
    Calendar,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function BabysitterCreate() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        certificate: "",
        location: "",
        forte: "",
        feedback: "",
        age: "",
        experience: "",
    });
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            const previewUrl = URL.createObjectURL(file);
            setPhotoPreview(previewUrl);
        }
    };

    const handleCreate = async () => {
        try {
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
            formData.append("age", form.age ? Number(form.age) : "");
            formData.append("experience", form.experience);

            if (photo) {
                formData.append("photo", photo);
            }

            await axios.post(`${API_URL}/babysitters`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/babysitters/admin");
        } catch (error) {
            console.error("Failed to create babysitter:", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <Card className="max-w-2xl mx-auto shadow-lg rounded-xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100">
                <CardContent className="p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-center text-sky-700">
                        Create New Babysitter
                    </h2>

                    {/* Photo Upload */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-sky-500" />
                            Photo
                        </label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="w-full"
                        />
                        {photoPreview && (
                            <div className="mt-2 flex justify-center">
                                <img
                                    src={photoPreview}
                                    alt="Preview"
                                    className="w-40 h-40 object-cover rounded-lg shadow-md border border-gray-300"
                                />
                            </div>
                        )}
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                <User className="w-4 h-4 text-sky-500" />
                                Name
                            </label>
                            <Input
                                placeholder="Name"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                <Phone className="w-4 h-4 text-sky-500" />
                                Phone Number
                            </label>
                            <Input
                                placeholder="Phone Number"
                                value={form.phoneNumber}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        phoneNumber: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                <Mail className="w-4 h-4 text-sky-500" />
                                Email
                            </label>
                            <Input
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                <Calendar className="w-4 h-4 text-sky-500" />
                                Age
                            </label>
                            <Input
                                placeholder="Age"
                                type="number"
                                value={form.age}
                                onChange={(e) =>
                                    setForm({ ...form, age: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                <Award className="w-4 h-4 text-sky-500" />
                                Certificate
                            </label>
                            <Input
                                placeholder="Certificate (comma separated)"
                                value={form.certificate}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        certificate: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                <Star className="w-4 h-4 text-sky-500" />
                                Forte
                            </label>
                            <Input
                                placeholder="Forte (comma separated)"
                                value={form.forte}
                                onChange={(e) =>
                                    setForm({ ...form, forte: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                <MessageCircle className="w-4 h-4 text-sky-500" />
                                Feedback
                            </label>
                            <Input
                                placeholder="Feedback (comma separated)"
                                value={form.feedback}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        feedback: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                <MapPin className="w-4 h-4 text-sky-500" />
                                Location
                            </label>
                            <Input
                                placeholder="Location"
                                value={form.location}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        location: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-500" />
                            Experience
                        </label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={form.experience}
                            onChange={(_, editor) => {
                                setForm({
                                    ...form,
                                    experience: editor.getData(),
                                });
                            }}
                            config={{
                                height: 1000,
                                toolbar: [
                                    "heading",
                                    "|",
                                    "bold",
                                    "italic",
                                    "link",
                                    "bulletedList",
                                    "numberedList",
                                    "|",
                                    "insertTable",
                                    "undo",
                                    "redo",
                                ],
                            }}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between">
                        <Button
                            onClick={handleCreate}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
                        >
                            Create
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate("/babysitters/admin")}
                            className="px-4 py-2 rounded-lg shadow-md"
                        >
                            Cancel
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
