import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";
import { showSuccessToast } from "@/components/shared-components/Toast";

export const APIabsensi = {
  getDataAbsensi: async () => {
    try {
      const result = await axiosInstance.get("/absensi");
      console.log("data absensi", result.data);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  getAbsensiById: async (id) => {
    try {
      const result = await axiosInstance.get(`/absensi/${id}`);
      console.log("data absensi by id", result.data);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  updateAbsensi: async (id, data) => {
    try {
      const result = await axiosInstance.patch(`/absensi/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("update absensi", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  createAbsensi: async (data) => {
    try {
      const result = await axiosInstance.post("/create-absensi", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("absensi dibuat apis", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  deleteAbsensi: async (id) => {
    try {
      const result = await axiosInstance.delete(`/absensi/${id}`);
      showSuccessToast("Absensi berhasil dihapus", "top-center", "large");
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
