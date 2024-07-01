import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";
import { showSuccessToast } from "../components/shared-components/Toast";

export const APIrekrutmen = {
  getAllRekrutmens: async () => {
    try {
      const result = await axiosInstance.get("/rekrutmens");
      console.log("data rekrutmen", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  getRekrutmenById: async (id) => {
    try {
      const result = await axiosInstance.get(`/rekrutmens/${id}`);
      console.log("detail rekrutmen", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  createRekrutmen: async (data) => {
    try {
      const result = await axiosInstance.post("/rekrutmens", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("rekrutmen dibuat", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  deleteRekrutmen: async (id) => {
    try {
      const result = await axiosInstance.delete(`/rekrutmens/${id}`);
      showSuccessToast("Lowongan berhasil dihapus", "top-center", "large");
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
