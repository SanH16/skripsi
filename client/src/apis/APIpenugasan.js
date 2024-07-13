import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";
import { showSuccessToast } from "@/components/shared-components/Toast";

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

  updatePenugasan: async (id, data) => {
    try {
      const result = await axiosInstance.patch(`/penugasan/${id}`, data, {
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

  createPenugasan: async (data) => {
    try {
      const result = await axiosInstance.post("/create-penugasan", data, {
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

  deletePenugasan: async (id) => {
    try {
      const result = await axiosInstance.delete(`/penugasan/${id}`);
      showSuccessToast("Penugasan berhasil dihapus", "top-center", "large");
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
