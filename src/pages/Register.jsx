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
    register(
      {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          if (data.status === 201) {
            message.success(data.message);
            navigate("/login");
          } else {
            message.error(data.message || "Registration failed");
          }
        },
        onError: (error) => {
          message.error(
            error.response?.data?.message ||
              "Registration failed: " + error.message
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
          Join Tutorify
        </Title>
        <Text className="auth-subtitle">
          Create an account to start your learning or teaching journey.
        </Text>
        <Form
          name="register"
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
              loading={isPending}
              block
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <Text className="auth-link">
          Already have an account?{" "}
          <a onClick={() => navigate("/login")}>Log in here</a>
        </Text>
      </div>
    </div>
  );
};

export default Register;
