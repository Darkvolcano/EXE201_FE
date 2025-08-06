import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Result, Button, Spin, message } from "antd";
import { CheckCircleTwoTone, FrownTwoTone } from "@ant-design/icons";
import { usePayOrder } from "../hooks/ordersApi";

const PaymentSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { mutate: payOrder, isLoading } = usePayOrder();
  const [paymentStatus, setPaymentStatus] = useState("pending"); // 'pending' | 'success' | 'error'
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (!orderId) {
      setPaymentStatus("error");
      setErrorText("Mã đơn hàng không hợp lệ.");
      return;
    }

    const confirmPayment = async () => {
      payOrder(orderId, {
        onSuccess: (res) => {
          // Consider onSuccess means success; avoid relying strictly on res.status
          setPaymentStatus("success");
        },
        onError: (error) => {
          console.error("Payment confirmation error:", error);
          setErrorText(
            error?.response?.data?.message || "Có lỗi khi xác nhận thanh toán."
          );
          setPaymentStatus("error");
        },
      });
    };
    confirmPayment();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        background: "#f5f7fa",
        padding: 20,
      }}
    >
      <Card
        style={{
          maxWidth: 430,
          width: "100%",
          borderRadius: 18,
          boxShadow: "0 6px 24px rgba(0, 0, 0, 0.1)",
        }}
        bordered={false}
      >
        {paymentStatus === "pending" || isLoading ? (
          <Spin tip="Đang xác nhận thanh toán..." size="large" style={{ width: "100%" }} />
        ) : paymentStatus === "success" ? (
          <Result
            status="success"
            icon={<CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 72 }} />}
            title="Thanh toán thành công!"
            subTitle="Cảm ơn bạn đã mua khóa học tại Tutorify. Chúc bạn học hiệu quả!"
            extra={[
              <Button
                type="primary"
                size="large"
                key="courses"
                onClick={() => navigate("/courses")}
              >
                Quay về danh sách khóa học
              </Button>,
              <Button
                size="large"
                key="my-courses"
                style={{ marginLeft: 8 }}
                onClick={() => navigate("/my-courses")}
              >
                Xem khóa học của tôi
              </Button>,
            ]}
          />
        ) : (
          <Result
            status="error"
            icon={<FrownTwoTone twoToneColor="#faad14" style={{ fontSize: 72 }} />}
            title="Thanh toán thất bại!"
            subTitle={errorText || "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại."}
            extra={[
              <Button
                key="back"
                type="primary"
                onClick={() => navigate("/courses")}
              >
                Quay lại danh sách khóa học
              </Button>,
            ]}
          />
        )}
      </Card>
    </div>
  );
};

export default PaymentSuccess;
