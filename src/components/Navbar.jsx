import React from "react";
import { Menu, Button } from "antd";
import { Link } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = () => {
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
          <Link to="/course">Course</Link>
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
      </Menu>

      <div>
        <span className="navbar-signin">Sign In</span>
        <Button type="primary" className="navbar-login-button">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
