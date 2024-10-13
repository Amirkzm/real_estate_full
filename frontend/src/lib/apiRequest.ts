import axios from "axios";

const baseUrl =
  import.meta.env.VITE_BACKEND_BASE_URL ||
  "https://amirkzm-showcase.online/api";

const apiRequest = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default apiRequest;
