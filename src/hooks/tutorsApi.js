import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../configs/axios";

export const useTutorRegister = () => {
  return useMutation({
    mutationFn: async (newAccount) => {
      const response = await axiosInstance.post(
        "certifications/tutor/register",
        newAccount
      );
      return response.data;
    },
  });
};
