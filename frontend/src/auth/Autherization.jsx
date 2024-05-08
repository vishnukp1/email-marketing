import axios from "axios";

const token = localStorage.getItem("token");
const api = axios.create({
  baseURL: "https://email-marketing-1.onrender.com",
  headers: {
    Authorization: `${token}`,
    "Content-Type": "application/json",
  },
});

export default api;
