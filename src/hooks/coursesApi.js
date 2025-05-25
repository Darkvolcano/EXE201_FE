import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../configs/axios";

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: async (newCourse) => {
      const response = await axiosInstance.post("courses", newCourse);
      return response.data;
    },
  });
};

export const useGetCourse = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await axiosInstance.get("courses");
      return response.data;
    },
  });
};

export const useGetCourseFeedback = (courseId) => {
  return useQuery({
    queryKey: ["course-feedback", courseId],
    queryFn: async () => {
      const response = await axiosInstance.get(`feedback/course/${courseId}`);
      return response.data;
    },
    enabled: !!courseId,
  });
};
