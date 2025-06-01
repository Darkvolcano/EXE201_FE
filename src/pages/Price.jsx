import React from "react";
import { Card, Button, Typography, Row, Col } from "antd";
import { ClockCircleOutlined, VideoCameraOutlined } from "@ant-design/icons";
import "../style/Pricing.css";

const { Title, Text } = Typography;

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const Pricing = () => {
  const courses = [
    {
      name: "Complete ASP.NET Core Razor Pages Web Development [.NET 8 Updated]",
      price: 2500000,
      duration: 1177,
      lectures: 202,
    },
    {
      name: "Secret of Good Design",
      price: 1250000,
      duration: 349,
      lectures: 52,
    },
    {
      name: "Practice Design Like a Pro",
      price: 1500000,
      duration: 301,
      lectures: 43,
    },
    {
      name: "Web Development (workflow)",
      price: 2000000,
      duration: 606,
      lectures: 137,
    },
    {
      name: "Secrets of Making Money Freelancing",
      price: 1000000,
      duration: 188,
      lectures: 21,
    },
    {
      name: "Advanced",
      price: 1750000,
      duration: 91,
      lectures: 39,
    },
    {
      name: "What's Next",
      price: 750000,
      duration: 17,
      lectures: 7,
    },
  ];

  return (
    <div className="pricing-page-container">
      <Title level={2} className="pricing-title">
        Pricing Plans for All Courses
      </Title>
      <Row gutter={[16, 16]} className="pricing-row">
        {courses.map((course, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card className="pricing-card" hoverable>
              <Title level={4} className="course-name">
                {course.name}
              </Title>
              <Text className="course-price">
                {course.price.toLocaleString("vi-VN")} VNĐ
              </Text>
              <div className="course-details">
                <Text>
                  <ClockCircleOutlined /> {formatDuration(course.duration)}
                </Text>
                <Text>
                  <VideoCameraOutlined /> {course.lectures} Lectures
                </Text>
              </div>
              <Button type="primary" className="buy-button">
                Buy Now
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Pricing;
