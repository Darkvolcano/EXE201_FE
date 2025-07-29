import React, { useState } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../configs/axios";
import "../style/Auth.css";

const { Title, Text } = Typography;

const VerifyOTPUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [hasShownError, setHasShownError] = useState(false);

  const verifyOtpMutation = useMutation({
    mutationFn: async (otpData) => {
      const response = await axiosInstance.post("auth/verify-otp", otpData);
      return response.data;
    },
    onSuccess: (data) => {
      message.success(data.message || "Tài khoản đã được xác minh thành công!");
      navigate("/login");
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Xác minh OTP thất bại");
    },
  });

  const onFinish = (values) => {
    verifyOtpMutation.mutate({ email, otp: values.otp });
  };

  if (!email && !hasShownError) {
    setHasShownError(true);
    message.error("Không có email được cung cấp. Vui lòng đăng ký trước.");
    navigate("/register-user");
    return null;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-decoration"></div>
        <Title level={2} className="auth-title">
          Xác minh Tài khoản của bạn
        </Title>
        <Text className="auth-subtitle">
          Nhập OTP đã được gửi đến <strong>{email}</strong> để xác minh tài
          khoản của bạn.
        </Text>
        <Form
          name="verify-otp-user"
          layout="vertical"
          onFinish={onFinish}
          className="auth-form"
        >
          <Form.Item
            label="OTP"
            name="otp"
            rules={[
              { required: true, message: "Vui lòng nhập OTP!" },
              {
                pattern: /^[0-9]{6}$/,
                message: "OTP phải là số gồm 6 chữ số!",
              },
            ]}
            style={{ marginBottom: 20 }}
          >
            <Input
              placeholder="Nhập OTP 6 chữ số"
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
              loading={verifyOtpMutation.isPending}
              block
            >
              Xác minh OTP
            </Button>
          </Form.Item>
        </Form>
        <Text className="auth-link">
          Chưa nhận được OTP?{" "}
          <a onClick={() => navigate("/register-user")}>Gửi lại OTP</a>
        </Text>
      </div>
    </div>
  );
};

export default VerifyOTPUser;
