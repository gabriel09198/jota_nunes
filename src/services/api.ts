import axios from "axios";

const api = axios.create({
  baseURL: "https://obraspecapi.onrender.com",
  timeout: 1000,
});
export default api;
