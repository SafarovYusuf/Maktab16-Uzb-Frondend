import axios from "axios";

// const baseURL = import.meta.env.VITE_API_URL || "https://maktab16.uz/api";
const baseURL = import.meta.env.VITE_API_URL || "https://16.maktab16.uz/api";

const api = axios.create({ baseURL });

export default api;
