import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";
// import { showSuccessToast } from "@/components/shared-components/Toast";

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
};
