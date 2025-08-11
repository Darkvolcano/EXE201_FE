import {
  Home,
  Package,
  NotebookText,
  List,
  Layers,
  FileText,
  Calendar,
  CheckSquare,
  Phone,
  File,
  Grid,
  Users,
  Table,
  Settings,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavItem } from "./NavItemAdmin";
import useAuthStore from "../hooks/authenStoreApi";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function Sidebar({ title = "Tutorify" }) {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [mainNavItems, setMainNavItems] = useState([
    {
      icon: <Home size={18} />,
      label: "Dashboard",
      active: true,
      path: "/dashboard",
      onClick: () => {
        navigate("/dashboard");
      },
    },
    {
      icon: <Layers size={18} />,
      label: "Quản lý chứng chỉ",
      onClick: () => {
        navigate("/certificate");
      },
      path: "/certificate",
    },
    {
      icon: <NotebookText size={18} />,
      label: "Quản lý khóa học",
      onClick: () => {
        navigate("/course-managements");
      },
      path: "/course-managements",
    },
    {
      icon: <UserOutlined size={18} />,
      label: "Quản lý tài khoản",
      onClick: () => {
        navigate("/account-management");
      },
      path: "/account-management",
    },
  ]);

  // const pagesNavItems = [
  //   { icon: <FileText size={18} />, label: "Pricing" },
  //   { icon: <Calendar size={18} />, label: "Calendar" },
  //   { icon: <Phone size={18} />, label: "Contact" },
  //   { icon: <File size={18} />, label: "Invoice" },
  //   { icon: <Users size={18} />, label: "Team" },
  // ];

  const settingsLogoutItems = [
    {
      icon: <Settings size={18} />,
      label: "Cài đặt",
      onClick: () => {
        navigate("/profile-admin");
      },
    },
    {
      icon: <LogOut size={18} />,
      label: "Đăng xuất",
      onClick: () => {
        logout();
        navigate("/login");
        message.success("Đăng xuất thành công");
      },
    },
  ];

  useEffect(() => {
    setMainNavItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        active: item.path === location.pathname,
      }))
    );

    if (!user) {
      setMainNavItems((prevItems) =>
        prevItems.map((item) =>
          item.label === "Bảng điều khiển"
            ? { ...item, active: true }
            : { ...item, active: false }
        )
      );
    }
  }, [location.pathname, user]);

  return (
    <div style={{ display: "flex" }}>
      <div className="sidebar-admin">
        <div className="sidebar-header">
          <h1 className="sidebar-title">{title}</h1>
        </div>

        <div className="sidebar-nav">
          <div className="main-nav-section">
            {mainNavItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </div>

          {/* <div className="pages-nav-section">
            <div className="sidebar-nav-section">
              <p className="sidebar-nav-section-title">Pages</p>
            </div>
            {pagesNavItems.map((item, index) => (
              <NavItem key={index} icon={item.icon} label={item.label} />
            ))}
          </div> */}

          <div className="settings-logout-section">
            {settingsLogoutItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
                onClick={item.onClick}
              />
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
