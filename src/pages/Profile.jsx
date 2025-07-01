import React, { useState } from "react";
import {
  Layout,
  Menu,
  Card,
  Avatar,
  Row,
  Col,
  Tag,
  Typography,
  Form,
  message,
  Input,
  Button,
  Upload,
  Modal,
  Divider,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  HistoryOutlined,
  EditOutlined,
  UploadOutlined,
  LogoutOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  DollarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useProfileUser, useEditProfile } from "../hooks/ProfileApi";
import { useGetOrderHistory } from "../hooks/ordersApi";
import "../style/Profile.css";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const Profile = () => {
  const [selectedMenu, setSelectedMenu] = useState("profile");
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useProfileUser();
  const {
    data: orderData,
    isLoading: orderLoading,
    error: orderError,
  } = useGetOrderHistory();

  const editProfileMutation = useEditProfile();

  const profile = profileData || {};
  const orders = orderData?.data || [];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Completed":
        return "green";
      default:
        return "default";
    }
  };

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    if (values.avatar?.file) {
      formData.append("avatar", values.avatar.file.originFileObj);
    } else {
      formData.append("avatar", values.avatar || profile.avatar);
    }

    editProfileMutation.mutate(formData, {
      onSuccess: (data) => {
        queryClient.setQueryData(["userProfile"], data);
        form.resetFields();
        setIsEditing(false);
      },
      onError: (error) => {
        message.error(
          error.response?.data?.message || "Failed to update profile"
        );
      },
    });
  };

  // Handle avatar upload change
  const handleAvatarUpload = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} uploaded successfully`);
      form.setFieldsValue({ avatar: info.file });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed`);
    }
  };

  const handleCancelEdit = () => {
    form.resetFields();
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setShowLogout(false);
    navigate("/login");
  };

  const handleChangePassword = (values) => {
    message.success("Password changed successfully!");
    setShowChangePassword(false);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        padding: "24px 0",
        background: "#f5f7fa",
      }}
    >
      <Sider
        width={270}
        className="sidebar"
        style={{
          background: "#fff",
          borderRadius: 12,
          marginLeft: 32,
          marginRight: 32,
          minHeight: 600,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ textAlign: "center", margin: "32px 0 16px 0" }}>
          <Avatar
            size={110}
            src={profile.avatar || "https://via.placeholder.com/150"}
            icon={!profile.avatar && <UserOutlined />}
            style={{
              border: "4px solid #e6f7ff",
              marginBottom: 12,
            }}
          />
          <Title level={4} style={{ margin: 0 }}>
            {profile.fullName || "N/A"}
          </Title>
          <Text type="secondary" style={{ fontSize: 15 }}>
            {profile.email || "N/A"}
          </Text>
        </div>
        <Divider style={{ margin: "18px 0" }} />
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => setSelectedMenu(key)}
          style={{
            borderRight: 0,
            background: "transparent",
            fontSize: 16,
          }}
        >
          <Menu.Item key="profile" icon={<UserOutlined />}>
            Profile Overview
          </Menu.Item>
          <Menu.Item key="orderHistory" icon={<HistoryOutlined />}>
            Order History
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            Account Settings
          </Menu.Item>
        </Menu>
        <Divider style={{ margin: "18px 0" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: "0 16px",
          }}
        >
          <Button
            icon={<EditOutlined />}
            type="primary"
            block
            onClick={() => setIsEditing(true)}
            style={{
              background: "#1890ff",
              borderColor: "#1890ff",
            }}
          >
            Edit Profile
          </Button>
          <Button
            icon={<LockOutlined />}
            block
            onClick={() => setShowChangePassword(true)}
          >
            Change Password
          </Button>
          <Button
            icon={<LogoutOutlined />}
            danger
            block
            onClick={() => setShowLogout(true)}
          >
            Logout
          </Button>
        </div>
      </Sider>
      <Layout>
        <Content
          className="main-content"
          style={{
            background: "#f5f7fa",
            minHeight: 600,
          }}
        >
          {selectedMenu === "profile" && (
            <Card
              className="profile-card"
              style={{
                maxWidth: 700,
                margin: "32px auto",
                borderRadius: 12,
              }}
            >
              {profileLoading ? (
                <div>Loading...</div>
              ) : profileError ? (
                <div>Error: {profileError.message}</div>
              ) : isEditing ? (
                <Form
                  form={form}
                  name="editProfile"
                  onFinish={onFinish}
                  initialValues={{
                    fullName: profile.fullName,
                    email: profile.email,
                    phone: profile.phone,
                    avatar: profile.avatar,
                  }}
                  layout="vertical"
                  style={{ marginTop: "20px" }}
                  encType="multipart/form-data"
                >
                  <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your full name!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Enter full name"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please input a valid email!",
                      },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="Enter email" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="Enter phone number"
                    />
                  </Form.Item>
                  <Form.Item name="avatar" label="Avatar">
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      showUploadList={false}
                      beforeUpload={() => false}
                      onChange={handleAvatarUpload}
                    >
                      {profile.avatar ? (
                        <img
                          src={profile.avatar}
                          alt="avatar"
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <div>
                          <UploadOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={editProfileMutation.isLoading}
                      style={{ marginRight: "10px" }}
                    >
                      Save
                    </Button>
                    <Button onClick={handleCancelEdit}>Cancel</Button>
                  </Form.Item>
                </Form>
              ) : (
                <>
                  <div
                    className="profile-content"
                    style={{
                      alignItems: "flex-start",
                      gap: 16,
                    }}
                  >
                    <Row gutter={24}>
                      <Col xs={24} sm={8} style={{ textAlign: "center" }}>
                        <Avatar
                          size={100}
                          src={profile.avatar || "https://via.placeholder.com/150"}
                          icon={!profile.avatar && <UserOutlined />}
                          className="profile-avatars"
                          style={{ border: "3px solid #e6f7ff" }}
                        />
                      </Col>
                      <Col xs={24} sm={16}>
                        <Title
                          level={3}
                          className="profile-name"
                          style={{ marginBottom: 8 }}
                        >
                          {profile.fullName || "N/A"}
                        </Title>
                        <Text
                          className="profile-detail"
                          style={{
                            display: "block",
                            marginBottom: 4,
                          }}
                        >
                          <MailOutlined /> {profile.email || "N/A"}
                        </Text>
                        <Text
                          className="profile-detail"
                          style={{
                            display: "block",
                            marginBottom: 4,
                          }}
                        >
                          <PhoneOutlined /> {profile.phone || "N/A"}
                        </Text>
                        <Text
                          className="profile-detail"
                          style={{
                            display: "block",
                            marginBottom: 4,
                          }}
                        >
                          <DollarOutlined /> Balance:{" "}
                          {profile.balance?.toLocaleString("vi-VN") || 0} VNĐ
                        </Text>
                      </Col>
                    </Row>
                  </div>
                  <Divider />
                  <div style={{ display: "flex", gap: 12 }}>
                    <Button
                      icon={<EditOutlined />}
                      type="primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                    <Button
                      icon={<LockOutlined />}
                      onClick={() => setShowChangePassword(true)}
                    >
                      Change Password
                    </Button>
                  </div>
                </>
              )}
            </Card>
          )}
          {selectedMenu === "orderHistory" && (
            <Card
              title="Order History"
              className="order-card"
              style={{
                maxWidth: 900,
                margin: "32px auto",
                borderRadius: 12,
              }}
            >
              {orderLoading ? (
                <div>Loading...</div>
              ) : orderError ? (
                <div>Error: {orderError.message}</div>
              ) : orders.length === 0 ? (
                <div>No orders found.</div>
              ) : (
                <div className="order-list">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="order-item"
                      style={{
                        marginBottom: 18,
                        padding: 16,
                        borderRadius: 8,
                        background: "#fafdff",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                      }}
                    >
                      <Row gutter={16} align="middle">
                        <Col xs={24} sm={6}>
                          <img
                            src={
                              order.orderDetails[0]?.course?.image ||
                              "https://via.placeholder.com/100"
                            }
                            alt={order.orderDetails[0]?.course?.name}
                            width={100}
                            height={100}
                            className="order-image"
                            style={{
                              borderRadius: 8,
                              objectFit: "cover",
                            }}
                          />
                        </Col>
                        <Col xs={24} sm={18}>
                          <Title
                            level={5}
                            className="order-title"
                            style={{ marginBottom: 4 }}
                          >
                            {order.orderDetails[0]?.course?.name || "N/A"}
                          </Title>
                          <Text
                            className="order-detail"
                            style={{ display: "block" }}
                          >
                            Amount: {order.totalAmount.toLocaleString("vi-VN")} VNĐ
                          </Text>
                          <Tag
                            color={getStatusColor(order.status)}
                            className="order-status"
                          >
                            {order.status}
                          </Tag>
                          <Text
                            className="order-detail"
                            style={{ display: "block" }}
                          >
                            Date:{" "}
                            {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                          </Text>
                          <Text
                            className="order-detail"
                            style={{ display: "block" }}
                          >
                            Completed:{" "}
                            {order.orderDetails[0]?.isFinishCourse ? "Yes" : "No"}
                          </Text>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
          {selectedMenu === "settings" && (
            <Card
              title="Account Settings"
              style={{
                maxWidth: 700,
                margin: "32px auto",
                borderRadius: 12,
              }}
            >
              <div style={{ marginBottom: 24 }}>
                <Button
                  icon={<LockOutlined />}
                  onClick={() => setShowChangePassword(true)}
                  style={{ marginRight: 12 }}
                >
                  Change Password
                </Button>
                <Button
                  icon={<LogoutOutlined />}
                  danger
                  onClick={() => setShowLogout(true)}
                >
                  Logout
                </Button>
              </div>
              <Divider />
              <div>
                <Text type="secondary">More settings coming soon...</Text>
              </div>
            </Card>
          )}
        </Content>
      </Layout>

      {/* Modal: Logout confirmation */}
      <Modal
        title="Confirm Logout"
        open={showLogout}
        onOk={handleLogout}
        onCancel={() => setShowLogout(false)}
        okText="Logout"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>

      {/* Modal: Change Password */}
      <Modal
        title="Change Password"
        open={showChangePassword}
        onOk={() => form.submit()}
        onCancel={() => setShowChangePassword(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleChangePassword}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[
              { required: true, message: "Please enter your old password" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Old password"
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter your new password" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="New password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm new password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Profile;
