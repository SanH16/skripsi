import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";
import { showSuccessToast } from "@/components/shared-components/Toast";

export const APIcuti = {
  getAllCuti: async () => {
    try {
      const result = await axiosInstance.get("/cuti");
      console.log("data cuti", result.data);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  getCutiById: async (id) => {
    try {
      const result = await axiosInstance.get(`/cuti/${id}`);
      console.log("cuti by id rekrutmen", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  updateCuti: async (id, data) => {
    try {
      const result = await axiosInstance.patch(`/cuti/${id}`, data);
      console.log("update cuti", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  createCuti: async (data) => {
    try {
      const result = await axiosInstance.post("/create-cuti", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("cuti dibuat dari api", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  deleteCuti: async (id) => {
    try {
      const result = await axiosInstance.delete(`/cuti/${id}`);
      showSuccessToast("Data Cuti berhasil dihapus", "top-center", "large");
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
