import React from "react";
import { Menu, Button, Badge, Dropdown } from "antd";
import { Link, useLocation } from "react-router-dom";
import "../style/Navbar.css";
import {
  BellOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/authenStoreApi";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="profile"
        onClick={() => {
          navigate(user?.role === "Tutor" ? "/profile-tutor" : "/profile");
        }}
      >
        Hồ sơ
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar-container">
      <div className="navbar-logo">TUTORIFY</div>

      <Menu
        mode="horizontal"
        className="navbar-menu"
        overflowedIndicator={null}
      >
        <Menu.Item
          key="home"
          className={`navbar-menu-item ${
            location.pathname === "/" &&
            !location.pathname.startsWith("/profile")
              ? "active"
              : ""
          }`}
        >
          <Link to="/">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item
          key="course"
          className={`navbar-menu-item ${
            location.pathname === "/courses" &&
            !location.pathname.startsWith("/profile")
              ? "active"
              : ""
          }`}
        >
          <Link to="/courses">Khóa học</Link>
        </Menu.Item>
        <Menu.Item
          key="tutor"
          className={`navbar-menu-item ${
            location.pathname === "/tutor" &&
            !location.pathname.startsWith("/profile")
              ? "active"
              : ""
          }`}
        >
          <Link to="/tutor">Gia sư</Link>
        </Menu.Item>
        <Menu.Item
          key="pricing"
          className={`navbar-menu-item ${
            location.pathname === "/pricing" &&
            !location.pathname.startsWith("/profile")
              ? "active"
              : ""
          }`}
        >
          <Link to="/pricing">Bảng giá</Link>
        </Menu.Item>
        <Menu.Item
          key="about"
          className={`navbar-menu-item ${
            location.pathname === "/about" &&
            !location.pathname.startsWith("/profile")
              ? "active"
              : ""
          }`}
        >
          <Link to="/about">Về chúng tôi</Link>
        </Menu.Item>
        <Menu.Item
          key="forum"
          className={`navbar-menu-item ${
            location.pathname === "/forum" &&
            !location.pathname.startsWith("/profile")
              ? "active"
              : ""
          }`}
        >
          <Link to="/forum">Diễn đàn</Link>
        </Menu.Item>
      </Menu>

      <div className="navbar-user-section">
        {!user ? (
          <>
            <span
              className="navbar-signin"
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </span>
            <Button
              type="primary"
              className="navbar-login-button"
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </Button>
          </>
        ) : (
          <>
            <div className="navbar-icons"></div>
            <div className="user-profile">
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Badge size="small">
                  <img
                    src={
                      user.image ||
                      "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
                    }
                    className="user-avatar-nav"
                    alt="Ảnh đại diện người dùng"
                  />
                </Badge>
              </Dropdown>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
