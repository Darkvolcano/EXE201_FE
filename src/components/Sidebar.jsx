import React from "react";
import "../style/Sidebar.css";

const Sidebar = ({ activeMenu }) => {
  return (
    <div className="sidebar">
      <div className="menu-list">
        <div className={`menu-item ${activeMenu === "Dashboard" ? "active" : ""}`}>
          Dashboard
        </div>
        <div className="menu-item">Products</div>
        <div className="menu-sub-item">Favorites</div>
        <div className="menu-sub-item">Order Lists</div>
        <div className="menu-sub-item">Product Stock</div>
        <div className="menu-item">Pages</div>
        <div className="menu-sub-item">Pricing</div>
        <div className="menu-sub-item">Builder</div>
        <div className="menu-sub-item">To-Do</div>
        <div className="menu-sub-item">Contact</div>
        <div className="menu-sub-item">Invoice</div>
        <div className="menu-sub-item">UI Elements</div>
        <div className="menu-sub-item">Team</div>
        <div className="menu-sub-item">Table</div>
        <div className="menu-item">Settings</div>
        <div className="menu-item">Logout</div>
      </div>
    </div>
  );
};

export default Sidebar;