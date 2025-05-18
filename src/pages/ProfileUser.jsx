import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, Avatar, Typography, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axiosInstance from "../configs/axios";
import "../style/Auth.css";

const { Title, Text } = Typography;

const Profile = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await axiosInstance.get("/account/profile");
      return response.data;
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to load profile");
    },
  });

  const handleEditProfile = () => {
    navigate("/edit-profile"); // Có thể tạo trang edit sau
  };

  if (isLoading) return <div className="auth-container"><Text>Loading...</Text></div>;
  if (error) return <div className="auth-container"><Text>Error loading profile</Text></div>;

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <Card className="auth-card" style={{ maxWidth: 500, margin: "20px auto" }}>
          <div style={{ textAlign: "center" }}>
            <Avatar
              size={120}
              src={data?.avatar || <UserOutlined />}
              style={{ marginBottom: 20 }}
            />
            <Title level={2} style={{ margin: 0 }}>
              {data?.fullName || "User Name"}
            </Title>
            <Text type="secondary">{data?.email || "email@example.com"}</Text>
          </div>
          <div style={{ marginTop: 20 }}>
            <Text strong>Phone Number:</Text>
            <Text style={{ marginLeft: 10 }}>{data?.phone || "N/A"}</Text>
          </div>
          <div style={{ marginTop: 10 }}>
            <Text strong>Balance:</Text>
            <Text style={{ marginLeft: 10 }}>{data?.balance || 0} VND</Text>
          </div>
          <Button
            type="primary"
            size="large"
            className="auth-button"
            onClick={handleEditProfile}
            style={{ marginTop: 20, width: "100%" }}
          >
            Edit Profile
          </Button>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default Profile;