import axios from "axios";

const token = localStorage.getItem("token");
const api = axios.create({
  baseURL: "https://ems-server-side.onrender.com",
  headers: {
    Authorization: `${token}`,
    "Content-Type": "application/json",
  },
});

export default api;
