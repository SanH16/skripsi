import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";
import { showSuccessToast } from "@/components/shared-components/Toast";

export const APIpromosi = {
  getDataPromosi: async () => {
    try {
      const result = await axiosInstance.get("/promosi");
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  createPromosi: async (data) => {
    try {
      const result = await axiosInstance.post("/create-promosi", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  deletePromosi: async (id) => {
    try {
      const result = await axiosInstance.delete(`/promosi/${id}`);
      showSuccessToast("Data Promosi berhasil dihapus", "top-center", "large");
      return result.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        throw new AxiosError(response);
      }
      throw new Error(error);
    }
  },
};
