import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export default function BookingForm() {
    const { token } = useAuth();
    const [babysitters, setBabysitters] = useState([]);
    const [form, setForm] = useState({
        babysitterId: "",
        startTime: "",
        endTime: "",
        bookingEmail: "",
        bookingPhoneNumber: "",
        bookingName: "",
        additionalRequest: "",
        address: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch danh sách bà vú
    useEffect(() => {
        if (!token) return;
        axios
            .get(`${import.meta.env.VITE_API_URL}/babysitters`)
            .then((res) => setBabysitters(res.data))
            .catch((err) => console.error(err));
    }, [token]);

    // Xử lý thay đổi form
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Xử lý gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            setMessage("Bạn cần đăng nhập để đặt lịch");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/appointments`,
                form,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessage("Đặt lịch thành công!");
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                    "Có lỗi xảy ra, vui lòng thử lại"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto mt-6 space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Đặt lịch bà vú
            </h2>

            {/* Thông báo */}
            {message && (
                <p
                    className={`text-center text-sm ${
                        message.includes("thành công")
                            ? "text-green-600"
                            : "text-red-500"
                    } font-medium`}
                >
                    {message}
                </p>
            )}

            {/* Chọn bà vú */}
            <div>
                <label
                    htmlFor="babysitterId"
                    className="block text-sm font-medium text-gray-700"
                >
                    Chọn bà vú
                </label>
                <select
                    id="babysitterId"
                    name="babysitterId"
                    onChange={handleChange}
                    value={form.babysitterId}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                >
                    <option value="">Chọn bà vú</option>
                    {babysitters.map((bs) => (
                        <option key={bs._id} value={bs._id}>
                            {bs.name} - {bs.phoneNumber}
                        </option>
                    ))}
                </select>
            </div>

            {/* Thời gian */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="startTime"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Thời gian bắt đầu
                    </label>
                    <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={form.startTime}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="endTime"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Thời gian kết thúc
                    </label>
                    <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={form.endTime}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
            </div>

            {/* Thông tin liên hệ */}
            <div>
                <label
                    htmlFor="bookingEmail"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="bookingEmail"
                    name="bookingEmail"
                    placeholder="Email"
                    value={form.bookingEmail}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div>
                <label
                    htmlFor="bookingPhoneNumber"
                    className="block text-sm font-medium text-gray-700"
                >
                    Số điện thoại
                </label>
                <input
                    type="text"
                    id="bookingPhoneNumber"
                    name="bookingPhoneNumber"
                    placeholder="Số điện thoại"
                    value={form.bookingPhoneNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div>
                <label
                    htmlFor="bookingName"
                    className="block text-sm font-medium text-gray-700"
                >
                    Tên người đặt
                </label>
                <input
                    type="text"
                    id="bookingName"
                    name="bookingName"
                    placeholder="Tên người đặt"
                    value={form.bookingName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                />
            </div>

            {/* Địa chỉ */}
            <div>
                <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                >
                    Địa chỉ
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Địa chỉ"
                    value={form.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                />
            </div>

            {/* Yêu cầu thêm */}
            <div>
                <label
                    htmlFor="additionalRequest"
                    className="block text-sm font-medium text-gray-700"
                >
                    Yêu cầu thêm
                </label>
                <textarea
                    id="additionalRequest"
                    name="additionalRequest"
                    placeholder="Yêu cầu thêm"
                    value={form.additionalRequest}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            {/* Nút gửi */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                {loading ? "Đang gửi..." : "Đặt lịch"}
            </button>
        </form>
    );
}
