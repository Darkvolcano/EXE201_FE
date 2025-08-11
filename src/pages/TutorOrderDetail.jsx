import React, { useState } from "react";
import { Card, Avatar, Pagination } from "antd";
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
            <span
              className={`tutor-order-status ${
                orders.order?.status === "Pending" ? "pending" : ""
              }`}
            >
              {orders.order?.status || "Không xác định"}
            </span>
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
                <strong>Giá:</strong> {orders.price?.toLocaleString() || "0"}{" "}
                VND
              </p>
              <p>
                <strong>Ngày tạo:</strong>{" "}
                {orders.createdAt
                  ? new Date(orders.createdAt).toLocaleDateString("vi-VN")
                  : "Không xác định"}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                {orders.order?.status || "Không xác định"}
              </p>
              <p>
                <strong>Hoàn thành:</strong>{" "}
                {orders.isFinishCourse ? "Đã hoàn thành" : "Chưa hoàn thành"}
              </p>
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
