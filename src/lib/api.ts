import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string || "http://localhost:3000",
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers
            ? (config.headers.Authorization = `Bearer ${token}`)
            : (config.headers = config.headers || { Authorization: `Bearer ${token}` });
    }
    return config;
}
);

export default api;