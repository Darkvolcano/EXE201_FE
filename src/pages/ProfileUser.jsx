import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons'; // Fixed: Added missing import
import { useProfileUser } from "../hooks/ProfileApi";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import "../style/ProfileUser.css";

const Profile = () => {
  const { data, isLoading, error } = useProfileUser();
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile-user");
  };

  if (isLoading) return (
    <div className="user-profile-wrapper">
      <LoadingSpinner />
    </div>
  );
  
  if (error) return (
    <div className="user-profile-wrapper">
      <ErrorMessage message="Error loading profile" />
    </div>
  );

  return (
    <div className="user-profile-wrapper">
      <div className="user-profile-box">
        <div className="user-profile-top">
          <Avatar
            size={200}
            src={data?.avatar}
            icon={<UserOutlined />} // Fixed: Proper way to use default icon
            className="user-avatar"
          />
          <h2 className="user-fullname">{data?.fullName || "User Name"}</h2>
          <p className="user-email-text">{data?.email || "email@example.com"}</p>
        </div>
        
        <div className="user-details-section">
          <div className="user-detail-item">
            <strong>Phone Number:</strong>
            <span>{data?.phone || "N/A"}</span>
          </div>
          <div className="user-detail-item">
            <strong>Balance:</strong>
            <span>{data?.balance || 0} VND</span>
          </div>
        </div>
        
        <button
          className="user-edit-btn"
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;