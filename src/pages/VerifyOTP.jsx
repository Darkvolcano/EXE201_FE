import React from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useTutorRegisterActive } from "../hooks/tutorsApi";
import "../style/Auth.css";

const { Title, Text } = Typography;

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: verifyOTP, isPending } = useTutorRegisterActive();

  const email = location.state?.email || "";

  if (!email) {
    navigate("/register");
    return null;
  }

  const onFinish = (values) => {
    verifyOTP(
      {
        email: email,
        otp: values.otp,
      },
      {
        onSuccess: (data) => {
          if (data.status === 200) {
            message.success(data.message || "Account verified successfully!");
            navigate("/login");
          } else {
            message.error(data.message || "OTP verification failed");
          }
        },
        onError: (error) => {
          message.error(
            error.response?.data?.message ||
              "OTP verification failed: " + error.message
          );
        },
      }
    );
  };

  const handleOtpChange = (otp) => {
    const numericOtp = otp.replace(/[^0-9]/g, "");
    return numericOtp;
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-decoration"></div>
        <Title level={2} className="auth-title">
          Verify Your Account
        </Title>
        <Text className="auth-subtitle">
          Enter the OTP sent to <strong>{email}</strong> to verify your account.
        </Text>
        <Form
          name="verify-otp"
          layout="vertical"
          onFinish={onFinish}
          className="auth-form"
        >
          <Form.Item
            label="OTP"
            name="otp"
            rules={[
              { required: true, message: "Please input the OTP!" },
              {
                pattern: /^[0-9]{6}$/,
                message: "OTP must be a 6-digit number!",
              },
            ]}
            style={{ marginBottom: 20 }}
          >
            <Input.OTP
              length={6}
              formatter={handleOtpChange}
              placeholder="Enter 6-digit OTP"
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
              Verify OTP
            </Button>
          </Form.Item>
        </Form>
        <Text className="auth-link">
          Didn’t receive the OTP?{" "}
          <a onClick={() => navigate("/register")}>Resend OTP</a>
        </Text>
      </div>
    </div>
  );
};

export default VerifyOTP;
