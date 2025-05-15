import { create } from "zustand";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/configs/axios";

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
        const response = await axiosInstance.post(
          "authentication/login",
          values,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = response.data;
        if (data.data?.accessToken) {
          const decoded = jwtDecode(data.data.accessToken);

          const user = {
            accountId: decoded.sub,
            username: decoded.accountName,
            role: decoded.role,
          };

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", data.data.accessToken);

          set({ user, token: data.data.accessToken, error: null });
          return { success: true, message: data.message, role: decoded.role };
        } else {
          set({ error: "Login failed" });
          return { success: false, message: "Login failed", role: "" };
        }
      } catch (error) {
        let errorMessage =
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : error.message;

        if (errorMessage === "Incorrect account name or password!") {
          errorMessage = "Tài khoản hoặc mật khẩu không đúng";
        }

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
