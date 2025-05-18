import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../configs/axios";
import "../style/Auth.css";

const { Title, Text } = Typography;

const VerifyOTPUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [isManual, setIsManual] = useState(!location.state?.email);

  useEffect(() => {
    if (!email) {
      message.error("No email provided. Please register first.");
      navigate("/register-user");
    }
  }, [email, navigate]);

  const verifyOtpMutation = useMutation({
    mutationFn: async (otpData) => {
      const response = await axiosInstance.post("auth/verify-otp", otpData);
      return response.data;
    },
    onSuccess: (data) => {
      message.success(data.message || "Account verified successfully!");
      navigate("/login");
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "OTP verification failed");
    },
  });

  const onFinish = (values) => {
    if (!email) {
      message.error("Please enter a valid email associated with your registration.");
      return;
    }
    verifyOtpMutation.mutate({ email, otp: values.otp });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsManual(true);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-decoration"></div>
        <Title level={2} className="auth-title">
          Verify Your Account
        </Title>
        <Text className="auth-subtitle">
          {isManual ? (
            <>
              Please enter your email and the OTP sent to it to verify your account.
              <br />
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }, { type: "email", message: "Please enter a valid email!" }]}
                style={{ marginBottom: 10 }}
              >
                <Input value={email} onChange={handleEmailChange} placeholder="Enter your email" className="auth-input" size="large" />
              </Form.Item>
            </>
          ) : (
            <>Enter the OTP sent to <strong>{email}</strong> to verify your account.</>
          )}
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
              { required: true, message: "Please input the OTP!" },
              { pattern: /^[0-9]{6}$/, message: "OTP must be a 6-digit number!" },
            ]}
            style={{ marginBottom: 20 }}
          >
            <Input placeholder="Enter 6-digit OTP" className="auth-input" size="large" />
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
              Verify OTP
            </Button>
          </Form.Item>
        </Form>
        <Text className="auth-link">
          Didn’t receive the OTP? <a onClick={() => navigate("/register-user")}>Resend OTP</a>
        </Text>
      </div>
    </div>
  );
};

export default VerifyOTPUser;