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
    console.log("User:", user);
    console.log("Token:", token);
    if (!user || !token) {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      console.log("Stored User:", storedUser);
      console.log("Stored Token:", storedToken);

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
          message.warning("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          logout();
          return;
        }
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
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
      "/courses/:id",
      "/tutors/:accountId",
    ];

    const matchDynamicRoute = (route, path) => {
      const dynamicRoutePattern = route.replace(/:[^/]+/, "[^/]+");
      const regex = new RegExp(`^${dynamicRoutePattern}$`);
      console.log(`Matching route: ${route} against ${path} -> ${regex.test(path)}`);
      return regex.test(path);
    };

    const isPublicPage = publicPages.some((route) => {
      if (route.includes(":")) {
        return matchDynamicRoute(route, location.pathname);
      }
      return route === location.pathname;
    });

    console.log("Is public page:", isPublicPage, "Path:", location.pathname);

    if (!user || !user.role) {
      if (!isPublicPage) {
        navigate("/login", { replace: true });
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
      Tutor: ["/profile-tutor", "/upload-certificate", "tutor-certifications"],
      Admin: [
        "/profile-admin",
        "/dashboard",
        "/certificate",
        "/course-management",
      ],
    };

    const userRole = user.role;
    const allowedPages = restrictedPages[userRole] || [];
    const isAllowed = isPublicPage ||
      allowedPages.some((route) => {
        if (route.includes(":id")) {
          return matchDynamicRoute(route, location.pathname);
        }
        return (
          location.pathname.startsWith(route) || route === location.pathname
        );
      });

    console.log("Is allowed:", isAllowed);

    if (!isAllowed) {
      navigate("/forbidden", { replace: true });
    }
  }, [user, location.pathname, navigate]);

  return (
    <AuthGuardContext.Provider value={{}}>{children}</AuthGuardContext.Provider>
  );
}

export default AuthGuardContext;