import React, { useEffect } from "react";
import { Card, Button, Avatar, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCourse } from "../hooks/coursesApi";
import { useCreateOrder } from "../hooks/ordersApi";
import "../style/Payment.css";

const Payment = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const { data: allCoursesData, isLoading, isError } = useGetCourse();
  const { mutate: createOrder, isLoading: isCreatingOrder } = useCreateOrder();

  const courseResult = allCoursesData?.data?.courses?.find(
    (item) => item.course._id === courseId
  );
  const courseObj = courseResult?.course;

  useEffect(() => {
    if (isError || !courseObj) {
      message.error("Không tìm thấy khóa học.");
      navigate("/courses");
    }
  }, [isError, courseObj, navigate]);

  const handlePayment = () => {
    createOrder(
      { courseId },
      {
        onSuccess: (response) => {
          message.success(response.message);
          const paymentUrl = response.data?.url;
          if (paymentUrl) {
            window.location.href = paymentUrl;
          } else {
            const orderId = response.data?.orderId || response.data?._id;
            if (orderId) {
              navigate(`/payment-success/${orderId}`);
            } else {
              message.error("Không nhận được URL thanh toán.");
            }
          }
        },
        onError: (error) => {
          message.error(
            "Thanh toán thất bại: " +
              (error.response?.data?.message || error.message)
          );
          const orderId =
            error.response?.data?.orderId || error.response?.data?._id;
          if (orderId) {
            navigate(`/payment-success/${orderId}`);
          }
        },
      }
    );
  };

  if (isLoading) return <div style={{ padding: 32 }}>Đang tải...</div>;

  return (
    <div className="payment-page-container">
      <Card className="payment-card">
        <div style={{ marginBottom: 20 }}>
          <h3
            style={{
              color: "#1890ff",
              margin: 0,
              fontSize: 30,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Trang Thanh toán
          </h3>
        </div>
        <div className="payment-content">
          <div className="payment-image">
            {courseObj?.image ? (
              <Avatar
                src={courseObj.image}
                size={200}
                style={{
                  width: "100%",
                  height: "-webkit-fill-available",
                  border: "3px solid #1890ff",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: 200,
                  background: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#888",
                }}
              >
                Không có hình ảnh
              </div>
            )}
          </div>
          <div className="payment-info">
            <p style={{ fontSize: 20, fontWeight: 600, color: "#333" }}>
              {courseObj?.name || "Khóa học không xác định"}
            </p>
            <p style={{ color: "#595959", fontSize: 18 }}>
              <strong>Giá:</strong> {courseObj?.price?.toLocaleString() || "0"}đ
            </p>
            <p
              style={{
                color: "#666",
                fontSize: 16,
                lineHeight: 1.6,
                marginBottom: 24,
              }}
            >
              Vui lòng xác nhận thanh toán khóa học này. Sau khi nhấn nút "Thanh
              toán", bạn sẽ được chuyển hướng đến trang thanh toán an toàn. Kiểm
              tra kỹ thông tin trước khi tiếp tục.
            </p>
            <Button
              type="primary"
              block
              size="large"
              loading={isCreatingOrder}
              onClick={handlePayment}
              style={{
                marginTop: 24,
                background: "#52c41a",
                borderColor: "#52c41a",
                color: "#fff",
                fontSize: 16,
                height: 50,
              }}
            >
              Thanh toán {courseObj?.price?.toLocaleString() || "0"}đ
            </Button>
            <Button
              type="default"
              block
              size="large"
              style={{ marginTop: 12, height: 50 }}
              onClick={() => navigate(-1)}
            >
              Quay lại
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Payment;
