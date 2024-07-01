import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";
import { showSuccessToast } from "@/components/shared-components/Toast";

export const APIuser = {
  getAllUsers: async () => {
    try {
      const result = await axiosInstance.get("/users");
      console.log("get all account", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  getUserById: async (id) => {
    try {
      const result = await axiosInstance.get(`/users/${id}`);
      console.log("get detail users", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  updateUser: async (id, data) => {
    try {
      const result = await axiosInstance.patch(`/users/${id}`, data);
      console.log("update user", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  createUser: async (data) => {
    try {
      const result = await axiosInstance.post("/users", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("user dibuat", result);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  deleteUser: async (id) => {
    try {
      const result = await axiosInstance.delete(`/users/${id}`);
      showSuccessToast("Akun User berhasil dihapus", "top-center", "large");
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
