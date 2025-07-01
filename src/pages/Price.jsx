import React from "react";
import { Card, Typography, Row, Col, Image, Avatar } from "antd";
import { useGetCourse } from "../hooks/coursesApi"; // Adjust the import path as needed
import "../style/Pricing.css";

const { Title, Text } = Typography;

const Pricing = () => {
  const { data, isLoading, error } = useGetCourse();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading courses: {error.message}</div>;

  const courses = data?.data?.courses || [];

  return (
    <div className="pricing-page-container">
      <Title level={2} className="pricing-title">
        Pricing Plans for All Courses
      </Title>
      <Row gutter={[16, 16]} className="pricing-row">
        {courses.map((courseData, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card className="pricing-card" hoverable>
              <Image
                src={courseData.course.image}
                alt={courseData.course.name}
                className="course-image"
                style={{ height: 200 }}
              />
              <Title level={4} className="course-name-price">
                {courseData.course.name}
              </Title>
              <Text className="course-price">
                {courseData.course.price.toLocaleString("vi-VN")} VNĐ
              </Text>
              <div className="course-details">
                <Avatar src={courseData.account.avatar}></Avatar>
                <Text>Tutor: {courseData.account.fullName}</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Pricing;
