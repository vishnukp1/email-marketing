import axios from "axios";

const token = localStorage.getItem("token");
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `${token}`,
    "Content-Type": "application/json",
  },
});

export default api;
