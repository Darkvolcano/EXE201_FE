import React from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useTutorRegister } from "../hooks/tutorsApi";
import "../style/Auth.css";

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useTutorRegister();

  const onFinish = (values) => {
    const email = values.email;
    register(
      {
        fullName: values.fullName,
        email: email,
        phone: values.phone,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          if (data.status === 201) {
            message.success(data.message);
            navigate("/verify-otp", { state: { email } });
          } else {
            message.error(data.message || "Đăng ký thất bại");
          }
        },
        onError: (error) => {
          message.error(
            error.response?.data?.message ||
              "Đăng ký thất bại: " + error.message
          );
        },
      }
    );
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-decoration"></div>
        <Title level={2} className="auth-title">
          Tham gia Tutorify
        </Title>
        <Text className="auth-subtitle">
          Tạo tài khoản để bắt đầu hành trình học tập hoặc giảng dạy của bạn.
        </Text>
        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          className="auth-form"
        >
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên của bạn!" },
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input
              placeholder="Nhập họ và tên của bạn"
              className="auth-input"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
              { type: "email", message: "Vui lòng nhập email hợp lệ!" },
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input
              placeholder="Nhập email của bạn"
              className="auth-input"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại của bạn!",
              },
              {
                pattern: /^[0-9]{10,15}$/,
                message: "Vui lòng nhập số điện thoại hợp lệ!",
              },
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input
              placeholder="Nhập số điện thoại của bạn"
              className="auth-input"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
              { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input.Password
              placeholder="Nhập mật khẩu của bạn"
              className="auth-input"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu của bạn!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu không khớp!");
                },
              }),
            ]}
            style={{ marginBottom: 20 }}
          >
            <Input.Password
              placeholder="Xác nhận mật khẩu của bạn"
              className="auth-input"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="auth-button"
              loading={isPending}
              block
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <div className="auth-footer">
          <Text className="auth-link">
            Đã có tài khoản?{" "}
            <a onClick={() => navigate("/login")}>Đăng nhập tại đây</a>
          </Text>
          <Button
            type="primary"
            size="large"
            className="auth-button"
            onClick={() => navigate("/register-user")}
            style={{ marginTop: 10 }}
          >
            Đăng ký với tư cách Người dùng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
