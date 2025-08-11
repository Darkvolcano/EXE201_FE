import React, { useState } from "react";
import { Card, Avatar, Pagination, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useGetAllTutorOrder } from "../hooks/tutorsApi";
import "../style/TutorOrderDetail.css";

const TutorOrder = () => {
  const { data, isLoading, error } = useGetAllTutorOrder();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalItems = data ? data.length : 0;
  const paginatedData = data
    ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Completed":
        return "green";
      default:
        return "default";
    }
  };

  // Helper function to get status text
  const getStatusText = (status) => {
    switch (status) {
      case "Pending":
        return "Đang xử lý";
      case "Completed":
        return "Hoàn thành";
      default:
        return status || "Không xác định";
    }
  };

  // Helper function to get completion status color
  const getCompletionStatusColor = (isFinished) => {
    return isFinished ? "green" : "red";
  };

  // Helper function to get completion status text
  const getCompletionStatusText = (isFinished) => {
    return isFinished ? "Đã hoàn thành" : "Chưa hoàn thành";
  };

  if (isLoading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">Lỗi: {error.message}</div>;

  return (
    <div className="tutor-order-container">
      <h2 className="tutor-order-title">Khóa học đã được đặt</h2>
      {paginatedData.map((orders) => (
        <Card
          key={orders.orderDetailId}
          title={orders.courseName}
          className="tutor-order-card"
          extra={
            <Tag color={getStatusColor(orders.order?.status)}>
              {getStatusText(orders.order?.status)}
            </Tag>
          }
        >
          <div className="tutor-order-details">
            <Avatar
              size={64}
              icon={<UserOutlined />}
              className="tutor-order-avatar"
            />
            <div className="tutor-order-info">
              <p>
                <strong>Học viên:</strong>{" "}
                {orders.order?.account?.fullName || "Không xác định"}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {orders.order?.account?.email || "Không xác định"}
              </p>
              <p>
                <strong>Số điện thoại:</strong>{" "}
                {orders.order?.account?.phone || "Không xác định"}
              </p>
              <p>
                <strong>Giá:</strong> {orders.price?.toLocaleString() || "0"}{" "}
                VND
              </p>
              <p>
                <strong>Ngày tạo:</strong>{" "}
                {orders.createdAt
                  ? new Date(orders.createdAt).toLocaleDateString("vi-VN")
                  : "Không xác định"}
              </p>
              {/* <p>
                <strong>Trạng thái đơn hàng:</strong>{" "}
                <Tag color={getStatusColor(orders.order?.status)}>
                  {getStatusText(orders.order?.status)}
                </Tag>
              </p> */}
              <p>
                <strong>Trạng thái học tập:</strong>{" "}
                <Tag color={getCompletionStatusColor(orders.isFinishCourse)}>
                  {getCompletionStatusText(orders.isFinishCourse)}
                </Tag>
              </p>
              {/* Show completion time if finished */}
              {orders.isFinishCourse && orders.timeFinishCourse && (
                <p>
                  <strong>Thời gian hoàn thành:</strong>{" "}
                  {new Date(orders.timeFinishCourse).toLocaleDateString(
                    "vi-VN"
                  )}
                </p>
              )}
              {/* Show certificate link if available */}
              {orders.isFinishCourse && orders.certificateOfCompletion && (
                <p>
                  <strong>Chứng chỉ:</strong>{" "}
                  <a
                    href={orders.certificateOfCompletion}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1890ff" }}
                  >
                    Xem chứng chỉ hoàn thành
                  </a>
                </p>
              )}
            </div>
          </div>
        </Card>
      ))}
      {totalItems > pageSize && (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItems}
          onChange={setCurrentPage}
          style={{ marginTop: 16, textAlign: "center" }}
        />
      )}
    </div>
  );
};

export default TutorOrder;
