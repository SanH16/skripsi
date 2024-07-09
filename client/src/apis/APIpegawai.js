import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";
import { showSuccessToast } from "@/components/shared-components/Toast";

export const APIpegawai = {
  getDataPegawai: async () => {
    try {
      const result = await axiosInstance.get("/pegawai");
      console.log("data pegawai", result.data);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  getPegawaiById: async (id) => {
    try {
      const result = await axiosInstance.get(`/pegawai/${id}`);
      console.log("pegawai by id", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  updatePegawai: async (id, data) => {
    try {
      const result = await axiosInstance.patch(`/pegawai/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("update pegawai", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  createPegawai: async (data) => {
    try {
      const result = await axiosInstance.post("/create-pegawai", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("pegawai dibuat dari api", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  deletePegawai: async (id) => {
    try {
      const result = await axiosInstance.delete(`/pegawai/${id}`);
      showSuccessToast("Data Pegawai berhasil dihapus", "top-center", "large");
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
