import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";
import { showSuccessToast } from "@/components/shared-components/Toast";

export const APIphk = {
  getDataPHK: async () => {
    try {
      const result = await axiosInstance.get("/phk");
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  getPhkById: async (id) => {
    try {
      const result = await axiosInstance.get(`/phk/${id}`);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  createPhk: async (data) => {
    try {
      const result = await axiosInstance.post("/create-phk", data, {
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

  deletePhk: async (id) => {
    try {
      const result = await axiosInstance.delete(`/phk/${id}`);
      showSuccessToast("Data PHK berhasil dihapus", "top-center", "large");
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
