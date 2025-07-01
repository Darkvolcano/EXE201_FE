import React from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../configs/axios";
import "../style/Auth.css";

const { Title, Text } = Typography;

const RegisterUser = () => {
  const navigate = useNavigate();

  const registerUserMutation = useMutation({
    mutationFn: async (newAccount) => {
      const response = await axiosInstance.post("auth/register", newAccount);
      return response.data;
    },
  });

  const onFinish = (values) => {
    registerUserMutation.mutate(
      {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          message.success(
            data.message ||
              "Account created successfully! Please check your email for OTP."
          );
          navigate("/verify-otp-user", { state: { email: values.email } });
        },
        onError: (error) => {
          message.error(error.response?.data?.message || "Registration failed");
        },
      }
    );
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-decoration"></div>
        <Title level={2} className="auth-title">
          Join Us Today !
        </Title>
        <Text className="auth-subtitle">
          Create your account to start your learning journey with us.
        </Text>
        <Form
          name="register-user"
          layout="vertical"
          onFinish={onFinish}
          className="auth-form"
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input
              placeholder="Enter your full name"
              className="auth-input"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input
              placeholder="Enter your email"
              className="auth-input"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^[0-9]{10,15}$/,
                message: "Please enter a valid phone number!",
              },
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input
              placeholder="Enter your phone number"
              className="auth-input"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input.Password
              placeholder="Enter your password"
              className="auth-input"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
            style={{ marginBottom: 20 }}
          >
            <Input.Password
              placeholder="Confirm your password"
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
              loading={registerUserMutation.isPending}
              block
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div className="auth-footer">
          <Text className="auth-link">
            Already have an account?{" "}
            <a onClick={() => navigate("/login")}>Login here</a>
          </Text>
          <Button
            type="primary"
            size="large"
            className="auth-button"
            onClick={() => navigate("/register")}
            style={{ marginTop: 10 }}
          >
            Register as a Tutor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
