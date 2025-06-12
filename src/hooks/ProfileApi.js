import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../configs/axios";
import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useProfileUser = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () =>
      axiosInstance.get("/account/profile").then((response) => response.data),
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to load profile");
    },
  });
};

export const useEditProfileUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (updatedData) =>
      axiosInstance
        .put("/account/profile", updatedData)
        .then((response) => response.data),
    onSuccess: (data) => {
      message.success(data.message || "Profile updated successfully!");
      navigate("/profile-user");
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || "Failed to update profile"
      );
    },
  });
};

export const useEditProfile = () => {
  return useMutation({
    mutationFn: (updatedData) =>
      axiosInstance
        .put("/account/profile", updatedData)
        .then((response) => response.data),
    onSuccess: (data) => {
      message.success(data.message || "Profile updated successfully!");
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || "Failed to update profile"
      );
    },
  });
};
export const useEditProfileTutor = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (updatedData) => axiosInstance.put("/account/profile", updatedData).then((response) => response.data),
    onSuccess: (data) => {
      message.success(data.message || "Profile updated successfully!");
      navigate("/profile-tutor");
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to update profile");
    },
  });
};

export const useEditProfileAdmin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (updatedData) => axiosInstance.put("/account/profile", updatedData).then((response) => response.data),
    onSuccess: (data) => {
      message.success(data.message || "Profile updated successfully!");
      navigate("/profile-admin");
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to update profile");
    },
  });
};
