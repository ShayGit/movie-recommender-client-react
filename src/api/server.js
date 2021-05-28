import axios from "axios";

const  BASE_URL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  async (config) => {
    
    const token = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).token
      : null;
    token && !config.headers.Authorization && (config.headers.Authorization = `Bearer ${token}`);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
