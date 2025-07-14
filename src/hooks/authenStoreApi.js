import { create } from "zustand";
import axios from "axios";
import axiosInstance from "../configs/axios";

const useAuthStore = create((set) => {
  const loadStoredAuth = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken || null,
      error: null,
    };
  };

  return {
    ...loadStoredAuth(),

    login: async (values) => {
      try {
        const response = await axiosInstance.post("auth/login", values, {
          headers: { "Content-Type": "application/json" },
        });

        const data = response.data;
        if (data.token && data.user) {
          const user = {
            accountId: data.user.accountId, //account id
            fullName: data.user.fullName,
            email: data.user.email,
            phone: data.user.phone,
            role: data.user.role,
          };

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", data.token);

          set({ user, token: data.token, error: null });
          return { success: true, message: data.message, role: user.role };
        } else {
          set({ error: "Login failed" });
          return { success: false, message: "Login failed", role: "" };
        }
      } catch (error) {
        let errorMessage =
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : error.message;

        set({ error: errorMessage });
        return { success: false, message: errorMessage, role: "" };
      }
    },

    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      set({ user: null, token: null, error: null });
    },

    setUser: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      set({ user });
    },

    setToken: (token) => {
      localStorage.setItem("token", token);
      set({ token });
    },
  };
});

export default useAuthStore;
