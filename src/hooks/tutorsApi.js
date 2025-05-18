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

// New hook for fetching tutors from courses API
export const useFetchCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await axiosInstance.get("courses");
      // Extract only tutor (account + certifications) info from each course
      return response.data.data.courses.map((item) => ({
        account: item.account,
        certifications: item.certifications,
      }));
    },
  });
};
