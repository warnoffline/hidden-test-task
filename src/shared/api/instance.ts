import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const ACCESS_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;
export const apiClient = axios.create({
    baseURL: API_URL,
})


apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_KEY);
    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
  