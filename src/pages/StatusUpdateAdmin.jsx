import React, { useState, useEffect } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useAuth } from "../hooks/useAuth";
import Header from "./Header";

const STATUS_OPTIONS = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
];

export default function StatusUpdateAdmin() {
    const { token } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    // Lưu trạng thái select tạm thời cho từng appointment
    const [statusDraft, setStatusDraft] = useState({});

    // Fetch appointments
    useEffect(() => {
        if (!token) return;
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_API_URL}/appointments`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                // Nếu API trả về {data: [...]}
                const data = res.data.data || res.data;
                setAppointments(data);
                // Khởi tạo statusDraft cho từng appointment
                const draft = {};
                data.forEach((a) => (draft[a._id] = a.status));
                setStatusDraft(draft);
            })
            .catch((err) => {
                setMessage("Failed to fetch appointments");
            })
            .finally(() => setLoading(false));
    }, [token]);

    // Update status
    const handleUpdateStatus = async (id) => {
        const newStatus = statusDraft[id];
        if (!newStatus) return;
        setLoading(true);
        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_API_URL}/appointments/${id}/status`,
                { status: newStatus },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setAppointments((prev) =>
                prev.map((appointment) =>
                    appointment._id === id
                        ? { ...appointment, status: res.data.data.status }
                        : appointment
                )
            );
            setMessage("Status updated successfully!");
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to update status"
            );
        } finally {
            setLoading(false);
        }
    };

    // Khi chọn status mới
    const handleSelectChange = (id, value) => {
        setStatusDraft((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <>
            <Header />
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold text-center mb-8 text-sky-700">
                    Manage Appointments
                </h1>

                {message && (
                    <p
                        className={`text-center mb-4 ${
                            message.includes("successfully")
                                ? "text-green-600"
                                : "text-red-500"
                        }`}
                    >
                        {message}
                    </p>
                )}

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg shadow-md">
                            <thead>
                                <tr className="bg-sky-100 text-sky-800">
                                    <th className="py-3 px-4 text-left">
                                        User
                                    </th>
                                    <th className="py-3 px-4 text-left">
                                        Babysitter
                                    </th>
                                    <th className="py-3 px-4 text-left">
                                        Email
                                    </th>
                                    <th className="py-3 px-4 text-left">
                                        Phone
                                    </th>
                                    <th className="py-3 px-4 text-left">
                                        Address
                                    </th>
                                    <th className="py-3 px-4 text-left">
                                        Time
                                    </th>
                                    <th className="py-3 px-4 text-left">
                                        Cost
                                    </th>
                                    <th className="py-3 px-4 text-left">
                                        Status
                                    </th>
                                    <th className="py-3 px-4 text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="text-center py-6 text-gray-400"
                                        >
                                            Không có lịch hẹn nào.
                                        </td>
                                    </tr>
                                )}
                                {appointments.map((appointment) => (
                                    <tr
                                        key={appointment._id}
                                        className="border-b hover:bg-sky-50"
                                    >
                                        <td className="py-2 px-4">
                                            {appointment.userId?.email}
                                        </td>
                                        <td className="py-2 px-4">
                                            {appointment.babysitterId
                                                ? `${appointment.babysitterId.name} (${appointment.babysitterId.email})`
                                                : ""}
                                        </td>
                                        <td className="py-2 px-4">
                                            {appointment.bookingEmail}
                                        </td>
                                        <td className="py-2 px-4">
                                            {appointment.bookingPhoneNumber}
                                        </td>
                                        <td className="py-2 px-4">
                                            {appointment.address}
                                        </td>
                                        <td className="py-2 px-4">
                                            {appointment.startTime &&
                                            appointment.endTime ? (
                                                // Nếu là lịch theo giờ
                                                <>
                                                    {appointment.startTime} -{" "}
                                                    {appointment.endTime}
                                                </>
                                            ) : appointment.startDate &&
                                              appointment.endDate ? (
                                                // Nếu là lịch theo ngày
                                                <>
                                                    {new Date(
                                                        appointment.startDate
                                                    ).toLocaleDateString()}{" "}
                                                    -{" "}
                                                    {new Date(
                                                        appointment.endDate
                                                    ).toLocaleDateString()}
                                                </>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                        <td className="py-2 px-4 font-semibold text-sky-700">
                                            {appointment.cost?.toLocaleString()}{" "}
                                            VND
                                        </td>
                                        <td className="py-2 px-4">
                                            <Badge
                                                variant="outline"
                                                className={`text-sm px-3 py-1 ${
                                                    appointment.status ===
                                                    "pending"
                                                        ? "text-yellow-600 border-yellow-600"
                                                        : appointment.status ===
                                                          "in_progress"
                                                        ? "text-blue-600 border-blue-600"
                                                        : appointment.status ===
                                                          "completed"
                                                        ? "text-green-600 border-green-600"
                                                        : "text-red-600 border-red-600"
                                                }`}
                                            >
                                                {appointment.status}
                                            </Badge>
                                        </td>
                                        <td className="py-2 px-4">
                                            <div className="flex items-center gap-2">
                                                <Select
                                                    value={
                                                        statusDraft[
                                                            appointment._id
                                                        ]
                                                    }
                                                    onValueChange={(value) =>
                                                        handleSelectChange(
                                                            appointment._id,
                                                            value
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="w-36">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {STATUS_OPTIONS.map(
                                                            (opt) => (
                                                                <SelectItem
                                                                    key={
                                                                        opt.value
                                                                    }
                                                                    value={
                                                                        opt.value
                                                                    }
                                                                >
                                                                    {opt.label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            appointment._id
                                                        )
                                                    }
                                                    disabled={
                                                        loading ||
                                                        statusDraft[
                                                            appointment._id
                                                        ] === appointment.status
                                                    }
                                                    className="bg-sky-600 hover:bg-sky-700"
                                                >
                                                    Update
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}
