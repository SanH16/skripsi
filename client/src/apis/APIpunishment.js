import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";
import { showSuccessToast } from "@/components/shared-components/Toast";

export const APIpunishment = {
  getDataPunishment: async () => {
    try {
      const result = await axiosInstance.get("/punishment");
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  getPunishmentById: async (id) => {
    try {
      const result = await axiosInstance.get(`/punishment/${id}`);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  createPunishment: async (data) => {
    try {
      const result = await axiosInstance.post("/create-punishment", data, {
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

  deletePunishment: async (id) => {
    try {
      const result = await axiosInstance.delete(`/punishment/${id}`);
      showSuccessToast(
        "Data Punishment berhasil dihapus",
        "top-center",
        "large",
      );
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
