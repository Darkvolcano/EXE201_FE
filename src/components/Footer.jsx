import React from "react";
import { Button } from "antd";
import "../style/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-left">
        <h2 className="footer-title">Ready to get started?</h2>
        <p className="footer-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>
        <Button type="primary" className="footer-button">
          Get started
        </Button>
      </div>
      <div className="footer-right">
        <ul className="footer-links">
          <li>Product</li>
          <li>Course</li>
          <li>Help/FAQ</li>
          <li>Mobile</li>
          <li>Career</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
