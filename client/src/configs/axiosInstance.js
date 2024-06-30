import axios from "axios";
import { CONST } from "@/utils/constant";
import { authService } from "./auth";

export const axiosInstance = axios.create({
  baseURL: CONST.BASE_URL_API,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await authService.getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error),
);
