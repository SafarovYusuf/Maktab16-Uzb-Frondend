import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://baza2.maktab16.uz/api";

const api = axios.create({ baseURL });

export default api;
