import { useQuery, useMutation } from "@tanstack/react-query";
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

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (order) => {
      const response = await axiosInstance.post("orders", order);
      return response.data;
    },
  });
};

export const usePayOrder = () => {
  return useMutation({
    mutationFn: async (orderId) => {
      const response = await axiosInstance.patch(`orders/${orderId}/pay`);
      return response.data;
    },
  });
};

