import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../configs/axios";

export const useGetOrderHistory = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axiosInstance.get("orders");
      return response.data;
    },
  });
};
