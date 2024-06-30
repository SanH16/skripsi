import axios from "axios";
import { CONST } from "@/utils/constant";

export const axiosInstance = axios.create({
  baseURL: CONST.BASE_URL_API,
  withCredentials: true,
});
