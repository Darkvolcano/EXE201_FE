import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../configs/axios";

export const useGetAccount = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await axiosInstance.get("accounts");
      return response.data;
    },
  });
};

export const useGetAccountById = (accountId) => {
  return useQuery({
    queryKey: ["accounts", accountId],
    queryFn: async () => {
      const res = await axiosInstance.get(`accounts/${accountId}`);
      return res.data;
    },
    enabled: !!accountId,
  });
};
