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
              "Tài khoản đã được tạo thành công! Vui lòng kiểm tra email để nhận OTP."
          );
          navigate("/verify-otp-user", { state: { email: values.email } });
        },
        onError: (error) => {
          message.error(error.response?.data?.message || "Đăng ký thất bại");
        },
      }
    );
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-decoration"></div>
        <Title level={2} className="auth-title">
          Tham gia cùng chúng tôi ngay hôm nay!
        </Title>
        <Text className="auth-subtitle">
          Tạo tài khoản để bắt đầu hành trình học tập của bạn với chúng tôi.
        </Text>
        <Form
          name="register-user"
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
              loading={registerUserMutation.isPending}
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
            onClick={() => navigate("/register")}
            style={{ marginTop: 10 }}
          >
            Đăng ký với tư cách Gia sư
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
