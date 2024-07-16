import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";
import { showSuccessToast } from "@/components/shared-components/Toast";

export const APIlamaran = {
  getDataLamaran: async () => {
    try {
      const result = await axiosInstance.get("/lamaran");
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  createLamaran: async (data) => {
    try {
      const result = await axiosInstance.post("/create-lamaran", data, {
        headers: {
          "Content-Type": "multipart/form-data",
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

  deleteLamaran: async (id) => {
    try {
      const result = await axiosInstance.delete(`/lamaran/${id}`);
      showSuccessToast("Data Lamaran berhasil dihapus", "top-center", "large");
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
