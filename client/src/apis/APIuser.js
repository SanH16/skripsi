import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";

export const APIuser = {
  getAllUsers: async () => {
    try {
      const result = await axiosInstance.get("/users");
      console.log("User account", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },
};
