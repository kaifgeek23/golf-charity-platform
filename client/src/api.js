import axios from "axios";

const api = axios.create({
  baseURL: "https://your-backend-url.onrender.com"
});

export default api;