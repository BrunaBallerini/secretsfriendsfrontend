import axios from "axios";
import store from "../store";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const token = store.getState().token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    console.log(token);
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
