import React from "react";
import { useParams } from "react-router-dom";
import { Card, Avatar, Typography, Spin, Button } from "antd";
import { useGetCoursesByAccountId } from "../hooks/coursesApi"; // Sửa đường dẫn
import "../style/TutorDetail.css";

const { Title, Text } = Typography;

const TutorDetail = () => {
  const { accountId } = useParams(); // Lấy accountId từ URL
  const { data, isLoading, isError } = useGetCoursesByAccountId(accountId);

  // Log để kiểm tra dữ liệu
  console.log("Dữ liệu chi tiết gia sư:", data);

  if (isLoading) return <Spin size="large" />;
  if (isError) return <div>Không thể tải chi tiết gia sư.</div>;
  if (!data?.data?.account) return <div>Không tìm thấy gia sư.</div>;

  const { account, certifications, courses } = data.data;

  return (
    <div className="tutor-detail-container">
      <Card className="tutor-detail-card">
        <div className="tutor-detail-header">
          <Avatar
            size={100}
            src={
              certifications[0]?.image[0] ||
              "https://via.placeholder.com/100x100?text=Gia+Sư"
            }
            alt={account.fullName}
          />
          <div className="tutor-info">
            <Title level={2}>{account.fullName || "Không có tên"}</Title>
            <Text strong>{account.role}</Text>
            <br />
            <Text>Email: {account.email}</Text>
            <br />
            <Text>Điện thoại: {account.phone}</Text>
          </div>
        </div>

        <div className="tutor-certifications">
          <Title level={3}>Chứng chỉ</Title>
          {certifications.map((cert) => (
            <Card key={cert._id} className="certification-card">
              <Text strong>{cert.name}</Text>
              <br />
              <Text>{cert.description}</Text>
              <br />
              <Text>Kinh nghiệm: {cert.experience} năm</Text>
              <br />
              <img
                src={
                  cert.image[0] ||
                  "https://via.placeholder.com/100x100?text=Chứng+chỉ"
                }
                alt={cert.name}
                style={{ width: "100px", marginTop: "10px" }}
              />
            </Card>
          ))}
        </div>

        <div className="tutor-courses">
          <Title level={3}>Khóa học</Title>
          {courses.map((course) => (
            <Card key={course._id} className="course-card">
              <Text strong>{course.name}</Text>
              <br />
              <Text>{course.description}</Text>
              <br />
              <Text>Giá: {course.price} VND</Text>
              <br />
              <img
                src={
                  course.image ||
                  "https://via.placeholder.com/100x100?text=Khóa+học"
                }
                alt={course.name}
                style={{ width: "100px", marginTop: "10px" }}
              />
            </Card>
          ))}
        </div>

        <Button type="primary" style={{ marginTop: "20px" }}>
          Liên hệ Gia sư
        </Button>
      </Card>
    </div>
  );
};

export default TutorDetail;
