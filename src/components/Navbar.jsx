import React from "react";
import { Menu, Button, Badge, Dropdown } from "antd";
import { Link } from "react-router-dom";
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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="profile"
        onClick={() => {
          navigate("/profile");
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
        <Menu.Item key="home" className="navbar-menu-item">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="course" className="navbar-menu-item">
          <Link to="/courses">Course</Link>
        </Menu.Item>
        <Menu.Item key="tutor" className="navbar-menu-item tutor">
          <Link to="/tutor">Tutor</Link>
        </Menu.Item>
        <Menu.Item key="pricing" className="navbar-menu-item">
          <Link to="/pricing">Pricing</Link>
        </Menu.Item>
        <Menu.Item key="about" className="navbar-menu-item">
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="ai-chat" className="navbar-menu-item">
          <Link to="/ai-chat">AI Chat</Link>
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
            {/* <div className="user-profile">
              <Badge size="small">
                <img
                  src={
                    user.image ||
                    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
                  }
                  className="user-avatar"
                  alt="User Avatar"
                />
              </Badge>
            </div> */}
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
                    className="user-avatar"
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
