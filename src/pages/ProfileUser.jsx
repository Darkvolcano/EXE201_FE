import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";
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
    <div className="profile-container">
      <LoadingSpinner />
    </div>
  );
  if (error) return (
    <div className="profile-container">
      <ErrorMessage message="Error loading profile" />
    </div>
  );

  return (
    <>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
          <Avatar
              size={200}
              src={data?.avatar || <UserOutlined />}
              style={{ marginBottom: 20 }}
            />
            <h2 className="name">{data?.fullName || "User Name"}</h2>
            <p className="email">{data?.email || "email@example.com"}</p>
          </div>
          <div className="info">
            <strong>Phone Number:</strong>
            <span>{data?.phone || "N/A"}</span>
          </div>
          <div className="info">
            <strong>Balance:</strong>
            <span>{data?.balance || 0} VND</span>
          </div>
          <button
            className="editButton"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;