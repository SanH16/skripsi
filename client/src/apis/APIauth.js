import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";
import { authService } from "../configs/auth";

export const APIauth = {
  login: async (data) => {
    try {
      const result = await axiosInstance.post("/login", data);
      console.log("Login response:", result);

      const loginResponse = {
        data: {
          sessionId: "your_session_id",
        },
      };

      // Simpan session ID ke dalam cookie menggunakan AuthService
      authService.storeSessionIdToCookie(loginResponse.data.sessionId);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err.response.data.msg;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  getUserLogin: async () => {
    try {
      const result = await axiosInstance.get("/get-user-login");
      console.log(result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err.response.data.msg;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },
  logout: async () => {
    try {
      const result = await axiosInstance.delete("/logout");
      console.log("Logout response:", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err.response.data.msg;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },
};
