import React from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useGetAllTutorOrder } from "../hooks/tutorsApi";
import "../style/TutorOrderDetail.css";

const TutorOrder = () => {
  const { data, isLoading, error } = useGetAllTutorOrder();

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="tutor-order-container">
      <h2 className="tutor-order-title">Your Orders</h2>
      {data &&
        data.map((orders) => (
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
                {orders.order?.status || "N/A"}
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
                  <strong>Student:</strong>{" "}
                  {orders.order?.account?.fullName || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {orders.order?.account?.email || "N/A"}
                </p>
                <p>
                  <strong>Price:</strong>{" "}
                  {orders.price?.toLocaleString() || "0"} VND
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {orders.createdAt
                    ? new Date(orders.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Status:</strong> {orders.order?.status || "N/A"}
                </p>
                <p>
                  <strong>Completed:</strong>{" "}
                  {orders.isFinishCourse ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default TutorOrder;
