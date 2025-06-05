import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../configs/axios";
import { message } from "antd";

// Hook for fetching revenue data by year
export const useRevenueData = (year) => {
  return useQuery({
    queryKey: ["revenueData", year],
    queryFn: () => axiosInstance.get(`/dashboard/revenue/${year}`).then((response) => response.data),
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to load revenue data");
    },
  });
};

// Hook for fetching accounts status
export const useAccountsStatus = () => {
  return useQuery({
    queryKey: ["accountsStatus"],
    queryFn: () => axiosInstance.get("/dashboard/accounts/status").then((response) => response.data),
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to load accounts status");
    },
  });
};

// Hook for fetching courses status
export const useCoursesStatus = () => {
  return useQuery({
    queryKey: ["coursesStatus"],
    queryFn: () => axiosInstance.get("/dashboard/courses/status").then((response) => response.data),
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to load courses status");
    },
  });
};

// Hook for fetching top account
export const useTopAccount = () => {
  return useQuery({
    queryKey: ["topAccount"],
    queryFn: () => axiosInstance.get("/dashboard/top-account").then((response) => response.data),
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to load top account data");
    },
  });
};

// Combined dashboard data hook
export const useDashboardData = (year) => {
  const revenue = useRevenueData(year);
  const accounts = useAccountsStatus();
  const courses = useCoursesStatus();
  const topAccount = useTopAccount();
  
  return {
    revenueData: revenue.data || [],
    accountsStatus: accounts.data || { Active: 0, Inactive: 0 },
    coursesStatus: courses.data || { Active: 0, Inactive: 0 },
    topAccount: topAccount.data || {},
    isLoading: revenue.isLoading || accounts.isLoading || courses.isLoading || topAccount.isLoading,
    isError: revenue.isError || accounts.isError || courses.isError || topAccount.isError,
    error: revenue.error || accounts.error || courses.error || topAccount.error
  };
};