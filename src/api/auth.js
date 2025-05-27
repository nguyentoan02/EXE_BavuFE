import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const login = async ({ email, password }) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    console.log("API login response:", res.data);
    return res.data;
};
