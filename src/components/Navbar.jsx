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
        Profile
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
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
          <Link to="/">Home</Link>
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
          <Link to="/courses">Course</Link>
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
          <Link to="/tutor">Tutor</Link>
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
          <Link to="/pricing">Pricing</Link>
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
          <Link to="/about">About</Link>
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
          <Link to="/forum">Forum</Link>
        </Menu.Item>
      </Menu>

      <div className="navbar-user-section">
        {!user ? (
          <>
            <span
              className="navbar-signin"
              onClick={() => navigate("/register")}
            >
              Sign In
            </span>
            <Button
              type="primary"
              className="navbar-login-button"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </>
        ) : (
          <>
            <div className="navbar-icons">
              <Badge dot color="blue" className="navbar-badge">
                <BellOutlined className="navbar-icon" />
              </Badge>
              <Badge className="navbar-badge">
                <HeartOutlined className="navbar-icon" />
              </Badge>
              <Badge
                count={user.cartItems || 2}
                color="blue"
                className="navbar-badge"
              >
                <ShoppingCartOutlined className="navbar-icon" />
              </Badge>
            </div>
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
                    alt="User Avatar"
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
