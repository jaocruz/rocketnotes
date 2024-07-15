import axios from "axios";

export const api = axios.create({
  baseURL: "https://rocketnotes-back-qh12.onrender.com"
});

api.get("/users/:id")