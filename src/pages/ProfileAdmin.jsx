import React, { useState } from 'react';
import { 
  Mail, Edit3, Save, X, Shield, Award, Clock, DollarSign, 
  TrendingUp, Eye, Phone, Users
} from 'lucide-react';
import SidebarAdmin from '../components/SidebarAdmin';
import { useProfileUser, useEditProfileAdmin} from '../hooks/ProfileApi'; // Import actual hooks
import { useQueryClient } from '@tanstack/react-query';
import '../style/ProfileAdmin.css';


const useEditProfileUser = () => ({
  mutate: (data) => {
    console.log("Updating profile:", data);
    // Your actual API call logic here
  },
  isLoading: false,
});

export default function AdminProfile() {
  const queryClient = useQueryClient();
  const { data: userData, isLoading, error } = useProfileUser();
  const { mutate: updateProfile, isLoading: isUpdating } = useEditProfileAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // Initialize form data only once on mount or when userData is available
  useEffect(() => {
    if (userData && !formData.fullName && !formData.email && !formData.phone) {
      setFormData({
        fullName: userData.fullName || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }
  }, [userData]); // Keep userData as dependency, but add a guard to prevent re-run

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
        // Invalidate and refetch the profile data
        queryClient.invalidateQueries(['userProfile']);
      }
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
          <div className="loading-spinner">Loading...</div>
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
            Error loading profile: {error.response?.data?.message || error.message}
          </div>
        </div>
      </div>
    );
  }

  // Mock admin stats - these would typically come from separate API calls
  const adminStats = [
    {
      label: "Total Users",
      value: "2,847",
      icon: <Users size={24} />,
      trend: "+12%",
    },
    {
      label: "Active Tutors",
      value: "156",
      icon: <Award size={24} />,
      trend: "+8%",
    },
    {
      label: "Monthly Revenue",
      value: "$24,593",
      icon: <DollarSign size={24} />,
      trend: "+15%",
    },
  ];

  // Mock recent activities - these would typically come from separate API calls
  const recentActivities = [
    { action: "User Registration", count: "23 new users", time: "2 hours ago" },
    { action: "Tutor Verification", count: "5 verified", time: "4 hours ago" },
    { action: "Payment Processed", count: "$1,234", time: "1 day ago" },
    { action: "Support Tickets", count: "12 resolved", time: "2 days ago" },
  ];

  return (
    <div className="admin-layout">
      <SidebarAdmin />
      <div className="admin-main-content">
        {/* Header Section */}
        <div className="admin-header">
          <div className="admin-welcome">
            <h1>Admin Dashboard</h1>
            <p>
              Welcome back, {userData?.fullName}! Here's what's happening today.
            </p>
          </div>
          <div className="admin-actions">
            <button className="view-site-btn">
              <Eye size={18} />
              View Site
            </button>
          </div>
        </div>

        {/* Stats Cards */}
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

        {/* Main Profile Section */}
        <div className="profile-section">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar-section">
                <img
                  src={userData?.avatar || "https://via.placeholder.com/120"}
                  alt="Profile"
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
                      placeholder="Full Name"
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
                      placeholder="Phone"
                    />
                  </div>
                ) : (
                  <div className="profile-details">
                    <h2 className="profile-name">{userData?.fullName}</h2>
                    <p className="profile-role">
                      {userData?.role} • Member since {userData?.joinDate}
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
                        <span>Last login: {userData?.lastLogin || 'N/A'}</span>
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
                      {isUpdating ? "Saving..." : "Save"}
                    </button>
                    <button onClick={handleEditToggle} className="cancel-btn">
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button onClick={handleEditToggle} className="edit-btn">
                    <Edit3 size={18} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="activities-section">
          <h3>Recent Activities</h3>
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
