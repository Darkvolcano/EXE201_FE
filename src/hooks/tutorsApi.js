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

export const useTutorRegisterActive = () => {
  return useMutation({
    mutationFn: async (newAccount) => {
      const response = await axiosInstance.post(
        "certifications/tutor/verify-otp",
        newAccount
      );
      return response.data;
    },
  });
};

export const useTutorRegisterCertificate = () => {
  return useMutation({
    mutationFn: async (newCertificate) => {
      const response = await axiosInstance.post(
        "certifications/register",
        newCertificate
      );
      return response.data;
    },
  });
};
