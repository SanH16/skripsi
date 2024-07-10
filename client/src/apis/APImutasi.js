import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";
import { showSuccessToast } from "@/components/shared-components/Toast";

export const APImutasi = {
  getAllMutasi: async () => {
    try {
      const result = await axiosInstance.get("/mutasi");
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  getMutasiById: async (id) => {
    try {
      const result = await axiosInstance.get(`/mutasi/${id}`);
      //   console.log("mutasi by id :", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  updateMutasi: async (id, data) => {
    try {
      const result = await axiosInstance.patch(`/mutasi/${id}`, data);
      //   console.log("update mutasi", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  createMutasi: async (data) => {
    try {
      const result = await axiosInstance.post("/create-mutasi", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      //   console.log("Mutasi dibuat dari api", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  deleteMutasi: async (id) => {
    try {
      const result = await axiosInstance.delete(`/mutasi/${id}`);
      showSuccessToast("Data Mutasi berhasil dihapus", "top-center", "large");
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
