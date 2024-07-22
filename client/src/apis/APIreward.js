import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";
import { showSuccessToast } from "@/components/shared-components/Toast";

export const APIreward = {
  getAllReward: async () => {
    try {
      const result = await axiosInstance.get("/rewards");
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err;
        throw new AxiosError(message);
      }
      throw new Error(err);
    }
  },

  createReward: async (data) => {
    try {
      const result = await axiosInstance.post("/create-rewards", data, {
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

  deleteReward: async (id) => {
    try {
      const result = await axiosInstance.delete(`/rewards/${id}`);
      showSuccessToast("Data Reward berhasil dihapus", "top-center", "large");
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
