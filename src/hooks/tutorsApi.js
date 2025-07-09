import { useMutation, useQuery } from "@tanstack/react-query";
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

export const useGetAllTutors = () => {
  return useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const response = await axiosInstance.get("certifications/all-tutors");
      return response.data;
    },
  });
};

export const useUpdateIsChecked = () => {
  return useMutation({
    mutationFn: async ({ certificationId }) => {
      const response = await axiosInstance.patch(
        `certifications/${certificationId}/is-checked`,
        { isChecked: true }
      );
      return response.data;
    },
  });
};

export const useUpdateIsCanTeach = () => {
  return useMutation({
    mutationFn: async ({ certificationId }) => {
      const response = await axiosInstance.patch(
        `certifications/${certificationId}/is-can-teach`,
        { isCanTeach: true }
      );
      return response.data;
    },
  });
};

export const useGetAllTutorCertifications = () => {
  return useQuery({
    queryKey: ["tutor"],
    queryFn: async () => {
      const response = await axiosInstance.get("tutor/certifications");
      return response.data;
    },
  });
};

export const useGetAllTutorOrder = () => {
  return useQuery({
    queryKey: ["tutor"],
    queryFn: async () => {
      const response = await axiosInstance.get("tutor/order-details");
      return response.data;
    },
  });
};
