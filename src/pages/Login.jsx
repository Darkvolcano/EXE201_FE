import React from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/authenStoreApi";
import "../style/Auth.css";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (response.success) {
        if (response.role === "Admin") {
          navigate("/");
        } else if (response.role === "Tutor") {
          navigate("/");
        } else if (response.role === "User") {
          navigate("/");
        } else {
          navigate("/home-page");
        }
        message.success("Đăng nhập thành công");
      } else {
        message.error(response.message);
      }
    },
    onError: (error) => {
      message.error("Đăng nhập thất bại: " + error.message);
    },
  });

  const onFinish = (values) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-decoration"></div>
        <Title level={2} className="auth-title">
          Chào mừng trở lại
        </Title>
        <Text className="auth-subtitle">
          Đăng nhập để tìm gia sư hoàn hảo cho hành trình học tập của bạn.
        </Text>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          className="auth-form"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
              { type: "email", message: "Vui lòng nhập email hợp lệ!" },
            ]}
          >
            <Input
              placeholder="Nhập email của bạn"
              className="auth-input"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
            ]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu của bạn"
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
              loading={loginMutation.isPending}
              block
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <Text className="auth-link">
          Chưa có tài khoản?{" "}
          <a onClick={() => navigate("/register")}>Đăng ký tại đây</a>
        </Text>
      </div>
    </div>
  );
};

export default Login;
