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
          error.response?.data?.message || "Cập nhật tài khoản thất bại"
        );
      },
    });
  };

  // Handle avatar upload change
  const handleAvatarUpload = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} tải lên thành công`);
      form.setFieldsValue({ avatar: info.file });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} tải lên thất bại`);
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

  const handleChangePassword = () => {
    message.success("Đổi mật khẩu thành công!");
    setShowChangePassword(false);
  };

  // MOCK DATA (replace with real data from your API)
  const totalMoneySpent = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );
  const totalCourses = orders.reduce(
    (sum, order) => sum + (order.orderDetails?.length || 0),
    0
  );
  // Example: count unique tutors from all orders
  const tutorSet = new Set();
  orders.forEach((order) => {
    order.orderDetails?.forEach((detail) => {
      if (detail.course?.createdBy) tutorSet.add(detail.course.createdBy);
    });
  });
  const totalTutors = tutorSet.size;
  // Example: mock friend count (replace with real data)
  const totalFriends = 5;

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <Sider
        width={270}
        className="sidebar"
        style={{
          background: "#fff",
          borderRadius: 12,
          margin: "32px 0 32px 32px",
          minHeight: 600,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <Avatar
          size={110}
          src={profile.avatar || "https://placehold.co/150x150"}
          icon={!profile.avatar && <UserOutlined />}
          style={{
            border: "4px solid #e6f7ff",
            marginBottom: 12,
          }}
        />
        <Title level={4} style={{ margin: 0 }}>
          {profile.fullName || "Chưa cập nhật tên"}
        </Title>
        <Text type="secondary" style={{ fontSize: 15 }}>
          {profile.email || "Chưa cập nhật email"}
        </Text>
        <Divider style={{ margin: "18px 0" }} />
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => setSelectedMenu(key)}
          style={{
            borderRight: 0,
            background: "transparent",
            fontSize: 16,
            width: "100%",
          }}
        >
          <Menu.Item key="profile" icon={<UserOutlined />}>
            Thông tin cá nhân
          </Menu.Item>
          <Menu.Item key="orderHistory" icon={<HistoryOutlined />}>
            Lịch sử đơn hàng
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            Cài đặt tài khoản
          </Menu.Item>
        </Menu>
        <Divider style={{ margin: "18px 0" }} />
        <Button
          icon={<LogoutOutlined />}
          danger
          block
          onClick={() => setShowLogout(true)}
          style={{ width: "80%" }}
        >
          Đăng xuất
        </Button>
      </Sider>
      <Layout>
        <Content
          className="main-content"
          style={{
            background: "#f5f7fa",
            minHeight: 600,
            padding: "40px",
            width: "100%",
            maxWidth: "100vw",
            display: "flex",
            alignItems: selectedMenu === "settings" ? "center" : "flex-start",
          }}
        >
          <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}>
            {selectedMenu === "profile" && (
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 32,
                    alignItems: "flex-start",
                    marginBottom: 32,
                  }}
                >
                  {/* User Info Card */}
                  <Card
                    className="profile-card"
                    style={{
                      flex: 2,
                      minWidth: 320,
                      borderRadius: 12,
                      marginBottom: 0,
                    }}
                  >
                    {profileLoading ? (
                      <div>Đang tải...</div>
                    ) : profileError ? (
                      <div>Lỗi: {profileError.message}</div>
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
                                src={
                                  profile.avatar ||
                                  "https://placehold.co/150x150"
                                }
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
                                {profile.fullName || "Chưa cập nhật tên"}
                              </Title>
                              <Text
                                className="profile-detail"
                                style={{
                                  display: "block",
                                  marginBottom: 4,
                                }}
                              >
                                <MailOutlined /> {profile.email || "Chưa cập nhật email"}
                              </Text>
                              <Text
                                className="profile-detail"
                                style={{
                                  display: "block",
                                  marginBottom: 4,
                                }}
                              >
                                <PhoneOutlined /> {profile.phone || "Chưa cập nhật số điện thoại"}
                              </Text>
                              <Text
                                className="profile-detail"
                                style={{
                                  display: "block",
                                  marginBottom: 4,
                                }}
                              >
                                <DollarOutlined /> Số dư:{" "}
                                {profile.balance?.toLocaleString("vi-VN") || 0}{" "}
                                VNĐ
                              </Text>
                            </Col>
                          </Row>
                        </div>
                      </>
                    )}
                  </Card>
                  {/* Statistics Card */}
                  <Card
                    style={{
                      flex: 1,
                      minWidth: 220,
                      borderRadius: 12,
                      textAlign: "center",
                      background: "#e6f7ff",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 18,
                        color: "#1890ff",
                        marginBottom: 8,
                      }}
                    >
                      Số ngày đăng nhập
                    </div>
                    <div
                      style={{
                        fontSize: 48,
                        fontWeight: 700,
                        color: "#1a73e8",
                      }}
                    >
                      42
                    </div>
                    <div style={{ color: "#888" }}>ngày hoạt động trên Tutorify</div>
                  </Card>
                </div>
                {/* --- Stats Section --- */}
                <Row gutter={24} style={{ marginBottom: 32 }}>
                  <Col xs={24} sm={8}>
                    <Card
                      style={{
                        borderRadius: 12,
                        textAlign: "center",
                        background: "#fffbe6",
                      }}
                    >
                      <Title
                        level={4}
                        style={{ color: "#faad14", marginBottom: 0 }}
                      >
                        Đã chi
                      </Title>
                      <div
                        style={{
                          fontSize: 32,
                          fontWeight: 700,
                          color: "#faad14",
                        }}
                      >
                        {totalMoneySpent.toLocaleString("vi-VN")} VNĐ
                      </div>
                      <div style={{ color: "#888" }}>
                        Tổng tiền mua khóa học
                      </div>
                    </Card>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Card
                      style={{
                        borderRadius: 12,
                        textAlign: "center",
                        background: "#e6fffb",
                      }}
                    >
                      <Title
                        level={4}
                        style={{ color: "#13c2c2", marginBottom: 0 }}
                      >
                        Giáo dục
                      </Title>
                      <div
                        style={{
                          fontSize: 32,
                          fontWeight: 700,
                          color: "#13c2c2",
                        }}
                      >
                        {totalCourses} khoá học
                        <br />
                        {totalTutors} gia sư
                      </div>
                      <div style={{ color: "#888" }}>Bạn đã học cùng</div>
                    </Card>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Card
                      style={{
                        borderRadius: 12,
                        textAlign: "center",
                        background: "#f9f0ff",
                      }}
                    >
                      <Title
                        level={4}
                        style={{ color: "#722ed1", marginBottom: 0 }}
                      >
                        Bạn bè
                      </Title>
                      <div
                        style={{
                          fontSize: 32,
                          fontWeight: 700,
                          color: "#722ed1",
                        }}
                      >
                        {totalFriends}
                      </div>
                      <div style={{ color: "#888" }}>Bạn bè đã thêm</div>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
            {selectedMenu === "orderHistory" && (
              <Card
                title="Lịch sử đơn hàng"
                className="order-card"
                style={{
                  maxWidth: 900,
                  margin: "32px auto",
                  borderRadius: 12,
                }}
              >
                {orderLoading ? (
                  <div>Đang tải...</div>
                ) : orderError ? (
                  <div>Lỗi: {orderError.message}</div>
                ) : orders.length === 0 ? (
                  <div>Chưa có đơn hàng nào.</div>
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
                                "https://placehold.co/100x100"
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
                              {order.orderDetails[0]?.course?.name || "Không xác định"}
                            </Title>
                            <Text
                              className="order-detail"
                              style={{ display: "block" }}
                            >
                              Số tiền:{" "}
                              {order.totalAmount.toLocaleString("vi-VN")} VNĐ
                            </Text>
                            <Tag
                              color={getStatusColor(order.status)}
                              className="order-status"
                            >
                              {order.status === "Completed"
                                ? "Hoàn thành"
                                : order.status === "Pending"
                                ? "Đang xử lý"
                                : order.status}
                            </Tag>
                            <Text
                              className="order-detail"
                              style={{ display: "block" }}
                            >
                              Ngày đặt:{" "}
                              {new Date(order.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                            </Text>
                            <Text
                              className="order-detail"
                              style={{ display: "block" }}
                            >
                              Đã hoàn thành:{" "}
                              {order.orderDetails[0]?.isFinishCourse
                                ? "Có"
                                : "Chưa"}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "60vh",
                }}
              >
                <Card
                  title="Cài đặt tài khoản"
                  style={{
                    width: 420,
                    borderRadius: 16,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ marginBottom: 24 }}>
                    <Button
                      icon={<EditOutlined />}
                      type="primary"
                      onClick={() => setIsEditing(true)}
                      style={{ marginRight: 12, width: 150 }}
                    >
                      Sửa thông tin
                    </Button>
                    <Button
                      icon={<LockOutlined />}
                      onClick={() => setShowChangePassword(true)}
                      style={{ width: 180 }}
                    >
                      Đổi mật khẩu
                    </Button>
                  </div>
                  <Divider />
                  <div>
                    <Text type="secondary">
                      Cập nhật thông tin tài khoản hoặc đổi mật khẩu tại đây.
                    </Text>
                  </div>
                  {/* Show edit form if editing */}
                  {isEditing && (
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
                        label="Họ và tên"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập họ tên!",
                          },
                        ]}
                      >
                        <Input
                          prefix={<UserOutlined />}
                          placeholder="Nhập họ tên"
                        />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "Vui lòng nhập đúng email!",
                          },
                        ]}
                      >
                        <Input
                          prefix={<MailOutlined />}
                          placeholder="Nhập email"
                        />
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập số điện thoại!",
                          },
                        ]}
                      >
                        <Input
                          prefix={<PhoneOutlined />}
                          placeholder="Nhập số điện thoại"
                        />
                      </Form.Item>
                      <Form.Item name="avatar" label="Ảnh đại diện">
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
                              <div style={{ marginTop: 8 }}>Tải lên</div>
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
                          Lưu lại
                        </Button>
                        <Button onClick={handleCancelEdit}>Hủy</Button>
                      </Form.Item>
                    </Form>
                  )}
                </Card>
              </div>
            )}
          </div>
        </Content>
      </Layout>

      {/* Modal: Xác nhận đăng xuất */}
      <Modal
        title="Xác nhận đăng xuất"
        open={showLogout}
        onOk={handleLogout}
        onCancel={() => setShowLogout(false)}
        okText="Đăng xuất"
        okButtonProps={{ danger: true }}
      >
        <p>Bạn chắc chắn muốn đăng xuất?</p>
      </Modal>

      {/* Modal: Đổi mật khẩu */}
      <Modal
        title="Đổi mật khẩu"
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
            label="Mật khẩu cũ"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu cũ" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu cũ"
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu mới"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Xác nhận mật khẩu mới"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Profile;
