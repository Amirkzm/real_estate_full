import axios from "axios";

const baseUrl =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000/api";

const apiRequest = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default apiRequest;
