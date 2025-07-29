import React from "react";
import { Button } from "antd";
import "../style/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-left">
        <h2 className="footer-title">Sẵn sàng để bắt đầu?</h2>
        {/* <p className="footer-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p> */}
        <Button type="primary" className="footer-button">
          Bắt đầu ngay
        </Button>
      </div>
      <div className="footer-right">
        <ul className="footer-links">
          <li>Sản phẩm</li>
          <li>Khóa học</li>
          <li>Trợ giúp/Câu hỏi thường gặp</li>
          <li>Di động</li>
          <li>Cơ hội nghề nghiệp</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
