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
            message.success(
              data.message || "Tài khoản đã được xác minh thành công!"
            );
            navigate("/login");
          } else {
            message.error(data.message || "Xác minh OTP thất bại");
          }
        },
        onError: (error) => {
          message.error(
            error.response?.data?.message ||
              "Xác minh OTP thất bại: " + error.message
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
          Xác minh Tài khoản của bạn
        </Title>
        <Text className="auth-subtitle">
          Nhập OTP đã được gửi đến <strong>{email}</strong> để xác minh tài
          khoản của bạn.
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
              { required: true, message: "Vui lòng nhập OTP!" },
              {
                pattern: /^[0-9]{6}$/,
                message: "OTP phải là số gồm 6 chữ số!",
              },
            ]}
            style={{ marginBottom: 20 }}
          >
            <Input.OTP
              length={6}
              formatter={handleOtpChange}
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
              loading={isPending}
              block
            >
              Xác minh OTP
            </Button>
          </Form.Item>
        </Form>
        <Text className="auth-link">
          Chưa nhận được OTP?{" "}
          <a onClick={() => navigate("/register")}>Gửi lại OTP</a>
        </Text>
      </div>
    </div>
  );
};

export default VerifyOTP;
