import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";

export const APIpenugasan = {
  getAllPenugasan: async () => {
    try {
      const result = await axiosInstance.get("/penugasan");
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
