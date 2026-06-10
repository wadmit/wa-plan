import axios from "axios";

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
    // Add auth token if needed
    return config;
});

apiClient.interceptors.response.use(
    (res) => res.data,
    (err) => Promise.reject(err.response?.data ?? err)
);