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
import { NavItem } from "./NavItemAdmin";
import useAuthStore from "../hooks/authenStoreApi";
import { Outlet, useNavigate } from "react-router-dom";
import { message } from "antd";

export default function Sidebar({ title = "Tutorify" }) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const mainNavItems = [
    { icon: <Home size={18} />, label: "Dashboard", active: true },
    {
      icon: <Layers size={18} />,
      label: "Certificate",
      onClick: () => {
        navigate("/certificate");
      },
    },
    {
      icon: <NotebookText size={18} />,
      label: "Course",
      onClick: () => {
        navigate("/course-management");
      },
    },
  ];

  const pagesNavItems = [
    { icon: <FileText size={18} />, label: "Pricing" },
    { icon: <Calendar size={18} />, label: "Calendar" },
    { icon: <Phone size={18} />, label: "Contact" },
    { icon: <File size={18} />, label: "Invoice" },
    { icon: <Users size={18} />, label: "Team" },
  ];

  const settingsLogoutItems = [
    { icon: <Settings size={18} />, label: "Settings" },
    {
      icon: <LogOut size={18} />,
      label: "Logout",
      onClick: () => {
        logout();
        navigate("/login");
        message.success("Logout successfully");
      },
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      <div className="sidebar">
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

          <div className="pages-nav-section">
            <div className="sidebar-nav-section">
              <p className="sidebar-nav-section-title">Pages</p>
            </div>
            {pagesNavItems.map((item, index) => (
              <NavItem key={index} icon={item.icon} label={item.label} />
            ))}
          </div>

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
