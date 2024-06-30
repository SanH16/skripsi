import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axiosInstance";

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
};
