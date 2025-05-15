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
        } else {
          navigate("/home-page");
        }
        message.success("Login successfully");
      } else {
        message.error(response.message);
      }
    },
    onError: (error) => {
      message.error("Login failed: " + error.message);
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
          Welcome Back
        </Title>
        <Text className="auth-subtitle">
          Log in to find the perfect tutor for your learning journey.
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
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              placeholder="Enter your email"
              className="auth-input"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Enter your password"
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
              Log In
            </Button>
          </Form.Item>
        </Form>
        <Text className="auth-link">
          Don't have an account?{" "}
          <a onClick={() => navigate("/register")}>Sign up here</a>
        </Text>
      </div>
    </div>
  );
};

export default Login;
