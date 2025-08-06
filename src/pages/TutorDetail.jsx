import React from "react";
import { useParams } from "react-router-dom";
import { Card, Avatar, Typography, Spin, Button, Row, Col } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useGetCoursesByAccountId } from "../hooks/coursesApi";
import "../style/TutorDetail.css";

const { Title, Text } = Typography;

const TutorDetail = () => {
  const { accountId } = useParams();
  const { data, isLoading, isError } = useGetCoursesByAccountId(accountId);

  if (isLoading)
    return <Spin size="large" style={{ marginTop: 100, display: "block" }} />;
  if (isError) return <div>Không thể tải chi tiết gia sư.</div>;
  if (!data?.data?.account) return <div>Không tìm thấy gia sư.</div>;

  const { account, certifications, courses } = data.data;

  return (
    <div className="tutor-detail-container">
      <Card className="tutor-header-card" bordered={false}>
        <div className="tutor-info-header">
          <Avatar
            size={128}
            src={certifications[0]?.image?.[0] || ""}
            icon={<UserOutlined />}
          />
          <div className="tutor-main-info">
            <Title level={2}>{account.fullName || "Không có tên"}</Title>
            <Text className="tutor-role">{account.role}</Text>
            <div className="contact-info">
              <MailOutlined /> <Text>{account.email}</Text>
            </div>
            <div className="contact-info">
              <PhoneOutlined /> <Text>{account.phone}</Text>
            </div>
          </div>
        </div>
      </Card>

      <section className="tutor-certifications-section">
        <Title level={3}>Chứng chỉ</Title>
        <Row gutter={[24, 24]}>
          {certifications.map((cert) => (
            <Col xs={24} sm={12} md={8} key={cert._id}>
              <Card
                className="tutor-certification-card"
                bordered={false}
                hoverable
              >
                <img
                  src={cert.image?.[0] || ""}
                  alt={cert.name}
                  className="certification-image"
                />
                <Title level={4} className="certification-name">
                  {cert.name}
                </Title>
                <Text className="certification-desc">{cert.description}</Text>
                <Text className="certification-exp">
                  Kinh nghiệm: {cert.experience} năm
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="tutor-courses-section">
        <Title level={3}>Khóa học</Title>
        <Row gutter={[24, 24]} className="tutor-courses-list">
          {courses.map((course) => (
            <Col xs={24} sm={12} md={8} key={course._id}>
              <Card
                className="tutor-course-card"
                hoverable
                cover={
                  <img
                    alt={course.name}
                    src={course.image || ""}
                    className="course-cover-image"
                  />
                }
              >
                <Title level={4} className="course-title">
                  {course.name}
                </Title>
                <Text className="course-desc">{course.description}</Text>
                <Text strong className="course-price">
                  {course.price.toLocaleString()} VND
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <div className="contact-tutor-btn-container">
        <Button type="primary" size="large">
          Liên hệ gia sư
        </Button>
      </div>
    </div>
  );
};

export default TutorDetail;
