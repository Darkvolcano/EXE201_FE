import React, { useEffect, useState, useMemo } from "react";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { useProfileUser } from "../hooks/ProfileApi";
import { useOrderApi } from "../hooks/useOrderApi";
import useAuthStore from "../hooks/authenStoreApi";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../style/ProfileTutor.css"; // Giữ lại file CSS gốc cho bố cục chung

const TutorProfile = () => {
  const { user } = useAuthStore();
  const { data: userData, isLoading, error } = useProfileUser();
  const {
    orders,
    isLoading: ordersLoading,
    getTutorOrders,
    getOrderStats,
    getUpcomingSessions,
  } = useOrderApi();

  const location = useLocation();
  const [activeSection, setActiveSection] = useState("OVERVIEW");

  const orderStats = useMemo(
    () => getOrderStats(orders),
    [orders, getOrderStats]
  );
  const upcomingSessions = useMemo(
    () => getUpcomingSessions(orders),
    [orders, getUpcomingSessions]
  );

  // Effect to fetch order data ONCE on component mount
  useEffect(() => {
    getTutorOrders();
  }, [getTutorOrders]); // Thêm getTutorOrders vào dependency array

  // Effect to handle navigation changes and set active menu item
  useEffect(() => {
    const path = location.pathname;
    if (path === "/profile-tutor/tutor-certifications") {
      setActiveSection("Certificate");
    } else if (path === "/profile-tutor/tutor-orders") {
      setActiveSection("Orders");
    } else if (path === "/profile-tutor/courses-management") {
      setActiveSection("Course");
    } else if (path === "/profile-tutor") {
      setActiveSection("OVERVIEW");
    }
  }, [location.pathname]);

  const formatPrice = (price) => {
    if (typeof price !== "number") return "0 VND";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="profile-container">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className="profile-container">
        <ErrorMessage message="Lỗi khi tải hồ sơ" />
      </div>
    );
  }

  return (
    <div className="tutor-profile-wrapper">
      {/* Sidebar Trái */}
      <div className="sidebar-profile-tutor">
        <div className="menu-list-profile-tutor">
          <Link
            to="/profile-tutor"
            className={`menu-item ${
              activeSection === "OVERVIEW" ? "active" : ""
            }`}
          >
            Tổng quan
          </Link>
          <Link
            to="/profile-tutor/courses-management"
            className={`menu-item ${activeSection === "Course" ? "active" : ""}`}
          >
            Khóa học
          </Link>
          <Link
            to="/profile-tutor/tutor-certifications"
            className={`menu-item ${
              activeSection === "Certificate" ? "active" : ""
            }`}
          >
            Chứng chỉ
          </Link>
          <Link
            to="/profile-tutor/tutor-orders"
            className={`menu-item ${activeSection === "Orders" ? "active" : ""}`}
          >
            Đơn hàng
          </Link>
        </div>
        <h2 className="sidebar-title">Học viên sắp tới</h2>
        <div className="student-list">
          {ordersLoading ? (
            <LoadingSpinner />
          ) : upcomingSessions.length > 0 ? (
            upcomingSessions.map((session) => (
              <div key={session.id} className="student-item">
                <Avatar
                  size={40}
                  src={`https://i.pravatar.cc/40?u=${session.email}`}
                />
                <div className="student-info">
                  <span>{session.studentName}</span>
                  <span>Ngày đặt: {session.date}</span>
                  <span>{session.subject}</span>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{ padding: "10px", textAlign: "center", color: "#888" }}
            >
              Không có buổi học nào sắp tới.
            </div>
          )}
        </div>
        <div className="sidebar-footer">
          <button className="logout-button">Đăng xuất</button>
        </div>
      </div>

      {/* Nội dung chính */}
      <main className="main-content-tutor">
        <Outlet />
      </main>

      {/* Sidebar Phải */}
      <div className="right-sidebar">
        <div className="profile-info">
          <Avatar
            size={60}
            src={userData?.avatar || "https://via.placeholder.com/60"}
            className="profile-avatar"
          />
          <div className="profile-details">
            <h3>
              Chào buổi sáng, {userData?.fullName || user?.fullName || "Gia sư"}!
            </h3>
            <p>Tiếp tục hành trình và đạt được mục tiêu của bạn.</p>
            <p>
              <MailOutlined /> {userData?.email || user?.email || "N/A"}
            </p>
            <p>
              <PhoneOutlined /> {userData?.phone || user?.phone || "N/A"}
            </p>
            <p>
              <DollarOutlined /> Số dư: {formatPrice(userData?.balance)}
            </p>
          </div>
        </div>

        <div className="stats-section">
          <h2>Thống kê của bạn</h2>
          <div className="stat-item">
            <div>
              <span>Tổng đặt lịch tháng này</span>
              <div className="stat-value">{orderStats.monthlyBookings}</div>
            </div>
            <button className="see-more">Xem thêm</button>
          </div>
          <div className="stat-item">
            <div>
              <span>Tổng số học viên</span>
              <div className="stat-value">{orderStats.totalStudents}</div>
            </div>
            <button className="see-more">Xem thêm</button>
          </div>
          <div className="stat-item">
            <div>
              <span>Thu nhập tháng này</span>
              <div className="stat-value">{formatPrice(orderStats.monthlyRevenue)}</div>
            </div>
            <button className="see-more">Xem thêm</button>
          </div>
        </div>
        
        {/* *** KHỐI "HỖ TRỢ" ĐÃ BỊ XÓA BỎ *** */}

      </div>
    </div>
  );
};

export default TutorProfile;