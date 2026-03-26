import axios from "axios";

const api = axios.create({
  baseURL: "https://golf-charity-platform-esvx.onrender.com"
});

export default api;