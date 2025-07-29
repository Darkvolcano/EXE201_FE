import React, { useState, useEffect } from "react";
import {
  Mail,
  Edit3,
  Save,
  X,
  Shield,
  Award,
  Clock,
  DollarSign,
  TrendingUp,
  Eye,
  Phone,
  Users,
} from "lucide-react";
import SidebarAdmin from "../components/SidebarAdmin";
import { useProfileUser, useEditProfileAdmin } from "../hooks/ProfileApi";
import { useQueryClient } from "@tanstack/react-query";
import "../style/ProfileAdmin.css";

export default function AdminProfile() {
  const queryClient = useQueryClient();
  const { data: userData, isLoading, error } = useProfileUser();
  const { mutate: updateProfile, isLoading: isUpdating } =
    useEditProfileAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (userData && !formData.fullName && !formData.email && !formData.phone) {
      setFormData({
        fullName: userData.fullName || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }
  }, [userData]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && userData) {
      setFormData({
        fullName: userData.fullName || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }
  };

  const handleSave = () => {
    updateProfile(formData, {
      onSuccess: () => {
        setIsEditing(false);
        queryClient.invalidateQueries(["userProfile"]);
      },
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="admin-layout">
        <SidebarAdmin />
        <div className="admin-main-content">
          <div className="loading-spinner">Đang tải...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-layout">
        <SidebarAdmin />
        <div className="admin-main-content">
          <div className="error-message">
            Lỗi tải hồ sơ: {error.response?.data?.message || error.message}
          </div>
        </div>
      </div>
    );
  }

  const adminStats = [
    {
      label: "Tổng số người dùng",
      value: "2,847",
      icon: <Users size={24} />,
      trend: "+12%",
    },
    {
      label: "Gia sư đang hoạt động",
      value: "156",
      icon: <Award size={24} />,
      trend: "+8%",
    },
    {
      label: "Doanh thu tháng",
      value: "$24,593",
      icon: <DollarSign size={24} />,
      trend: "+15%",
    },
  ];

  const recentActivities = [
    {
      action: "Đăng ký người dùng",
      count: "23 người mới",
      time: "2 giờ trước",
    },
    {
      action: "Xác minh gia sư",
      count: "5 người đã xác minh",
      time: "4 giờ trước",
    },
    { action: "Xử lý thanh toán", count: "$1,234", time: "1 ngày trước" },
    {
      action: "Hỗ trợ khách hàng",
      count: "12 yêu cầu đã giải quyết",
      time: "2 ngày trước",
    },
  ];

  return (
    <div className="admin-layout">
      <SidebarAdmin />
      <div className="admin-main-content">
        <div className="admin-header">
          <div className="admin-welcome">
            <h1>Admin Dashboard</h1>
            <p>
              Chào mừng trở lại, {userData?.fullName}! Dưới đây là những gì đang
              diễn ra hôm nay.
            </p>
          </div>
          <div className="admin-actions">
            <button className="view-site-btn">
              <Eye size={18} />
              Xem trang
            </button>
          </div>
        </div>

        <div className="stats-grid">
          {adminStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">{stat.icon}</div>
                <span className="stat-trend">{stat.trend}</span>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="profile-section">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar-section">
                <img
                  src={userData?.avatar || "https://via.placeholder.com/120"}
                  alt="Ảnh đại diện"
                  className="profile-avatar"
                />
                <div className="avatar-badge">
                  <Shield size={16} />
                </div>
              </div>

              <div className="profile-info">
                {isEditing ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="edit-input"
                      placeholder="Họ và tên"
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="edit-input"
                      placeholder="Email"
                    />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="edit-input"
                      placeholder="Số điện thoại"
                    />
                  </div>
                ) : (
                  <div className="profile-details">
                    <h2 className="profile-name">{userData?.fullName}</h2>
                    <p className="profile-role">
                      {userData?.role} • Thành viên từ {userData?.joinDate}
                    </p>
                    <div className="profile-contact">
                      <div className="contact-item">
                        <Mail size={16} />
                        <span>{userData?.email}</span>
                      </div>
                      {userData?.phone && (
                        <div className="contact-item">
                          <Phone size={16} />
                          <span>{userData?.phone}</span>
                        </div>
                      )}
                      <div className="contact-item">
                        <Clock size={16} />
                        <span>
                          Đăng nhập lần cuối:{" "}
                          {userData?.lastLogin || "Không có dữ liệu"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="profile-actions">
                {isEditing ? (
                  <div className="edit-actions">
                    <button
                      onClick={handleSave}
                      className="save-btn"
                      disabled={isUpdating}
                    >
                      <Save size={18} />
                      {isUpdating ? "Đang lưu..." : "Lưu"}
                    </button>
                    <button onClick={handleEditToggle} className="cancel-btn">
                      <X size={18} />
                      Hủy
                    </button>
                  </div>
                ) : (
                  <button onClick={handleEditToggle} className="edit-btn">
                    <Edit3 size={18} />
                    Chỉnh sửa hồ sơ
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="activities-section">
          <h3>Hoạt động gần đây</h3>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-content">
                  <h4>{activity.action}</h4>
                  <p>{activity.count}</p>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
