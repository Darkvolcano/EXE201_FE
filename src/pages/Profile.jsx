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
} from "antd";
import { UserOutlined, HistoryOutlined, EditOutlined } from "@ant-design/icons";
import { useProfileUser, useEditProfile } from "../hooks/ProfileApi";
import { useGetOrderHistory } from "../hooks/ordersApi";
import "../style/Profile.css";
import { useQueryClient } from "@tanstack/react-query";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const Profile = () => {
  const [selectedMenu, setSelectedMenu] = useState("profile");
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

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
      formData.append("avatar", values.avatar.file.originFileObj); // Append the file if uploaded
    } else {
      formData.append("avatar", values.avatar || profile.avatar); // Use existing avatar if no new upload
    }

    editProfileMutation.mutate(formData, {
      onSuccess: (data) => {
        queryClient.setQueryData(["userProfile"], data);
        form.resetFields(); // Reset form after success
        setIsEditing(false); // Return to view mode after successful update
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
    form.resetFields(); // Reset form to initial values
    setIsEditing(false); // Return to view mode
  };

  return (
    <Layout style={{ minHeight: "100vh", padding: "20px 130px" }}>
      <Sider width={250} className="sidebar">
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => setSelectedMenu(key)}
          style={{ height: "100%", borderRight: 0, background: "transparent" }}
        >
          <Menu.Item key="profile" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="orderHistory" icon={<HistoryOutlined />}>
            Order History
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content className="main-content">
          {selectedMenu === "profile" && (
            <Card className="profile-card">
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
                    <Input placeholder="Enter full name" />
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
                    <Input placeholder="Enter email" />
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
                    <Input placeholder="Enter phone number" />
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
                  <div className="profile-content">
                    <Avatar
                      size={120}
                      src={profile.avatar || "https://via.placeholder.com/150"}
                      icon={!profile.avatar && <UserOutlined />}
                      className="profile-avatars"
                    />
                    <Title level={2} className="profile-name">
                      {profile.fullName || "N/A"}
                    </Title>
                    <Text className="profile-detail">
                      Email: {profile.email || "N/A"}
                    </Text>
                    <Text className="profile-detail">
                      Phone: {profile.phone || "N/A"}
                    </Text>
                    <Text className="profile-detail">
                      Balance: {profile.balance?.toLocaleString("vi-VN") || 0}{" "}
                      VNĐ
                    </Text>
                  </div>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => setIsEditing(true)}
                    style={{ marginTop: "20px" }}
                  >
                    Edit Profile
                  </Button>
                </>
              )}
            </Card>
          )}
          {selectedMenu === "orderHistory" && (
            <Card title="Order History" className="order-card">
              {orderLoading ? (
                <div>Loading...</div>
              ) : orderError ? (
                <div>Error: {orderError.message}</div>
              ) : orders.length === 0 ? (
                <div>No orders found.</div>
              ) : (
                <div className="order-list">
                  {orders.map((order) => (
                    <div key={order._id} className="order-item">
                      <Row gutter={16} align="middle">
                        <Col xs={24} sm={6}>
                          <Image
                            src={
                              order.orderDetails[0]?.course?.image ||
                              "https://via.placeholder.com/100"
                            }
                            alt={order.orderDetails[0]?.course?.name}
                            width={100}
                            height={100}
                            className="order-image"
                          />
                        </Col>
                        <Col xs={24} sm={18}>
                          <Title level={5} className="order-title">
                            {order.orderDetails[0]?.course?.name || "N/A"}
                          </Title>
                          <Text className="order-detail">
                            Amount: {order.totalAmount.toLocaleString("vi-VN")}{" "}
                            VNĐ
                          </Text>
                          <Tag
                            color={getStatusColor(order.status)}
                            className="order-status"
                          >
                            {order.status}
                          </Tag>
                          <Text className="order-detail">
                            Date:{" "}
                            {new Date(order.createdAt).toLocaleDateString(
                              "vi-VN"
                            )}
                          </Text>
                          <Text className="order-detail">
                            Completed:{" "}
                            {order.orderDetails[0]?.isFinishCourse
                              ? "Yes"
                              : "No"}
                          </Text>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Profile;
