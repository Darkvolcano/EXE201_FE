import { createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "../hooks/authenStoreApi";

const AuthGuardContext = createContext({});

export function AuthGuardProvider(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { children } = props;
  const { user, logout, token, setUser, setToken } = useAuthStore();

  useEffect(() => {
    if (!user || !token) {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    }

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime) {
          message.warning("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
          logout();
          return;
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        logout();
      }
    }
  }, [token, user, setUser, setToken, logout]);

  useEffect(() => {
    const publicPages = [
      "/",
      "/login",
      "/register",
      "/verify-otp",
      "/register-user",
      "/verify-otp-user",
      "/courses",
      "/about",
      "/pricing",
    ];

    if (!user || !user.role) {
      if (!publicPages.includes(location.pathname)) {
        navigate("/login", { replace: true });
        // message.error("Bạn phải đăng nhập để chuyển tới trang này");
      }
      return;
    }

    const roleRedirects = {
      User: "/",
      Tutor: "/",
      Admin: "/dashboard",
    };

    if (location.pathname === "/") {
      navigate(roleRedirects[user.role], { replace: true });
      return;
    }

    const restrictedPages = {
      User: ["/profile", "/courses/:id", "/tutor", "/ai-chat"],
      Tutor: ["/profile-tutor", "/upload-certificate"],
      Admin: ["/profile-admin", "/dashboard", "/certificate"],
    };

    const matchDynamicRoute = (route, path) => {
      const dynamicRoutePattern = route.replace(/:id/, "[0-9]+");
      const regex = new RegExp(`^${dynamicRoutePattern}$`);
      return regex.test(path);
    };

    const userRole = user.role;
    const allowedPages = restrictedPages[userRole] || [];
    const isAllowed =
      publicPages.includes(location.pathname) ||
      allowedPages.some((route) => {
        if (route.includes(":id")) {
          return matchDynamicRoute(route, location.pathname);
        }
        return route === location.pathname;
      });

    if (!isAllowed) {
      navigate("/forbidden", { replace: true });
    }
  }, [user, location, navigate]);

  return (
    <AuthGuardContext.Provider value={{}}>{children}</AuthGuardContext.Provider>
  );
}

export default AuthGuardContext;
