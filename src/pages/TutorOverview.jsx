import React from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Statistic,
  Timeline,
} from "antd";
import {
  PlusOutlined,
  CheckCircleOutlined,
  RocketOutlined,
  VideoCameraAddOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../style/TutorOverview.css";

const { Title, Paragraph } = Typography;

const TutorOverview = () => {
  return (
    <div className="tutor-overview-page">
      {/* Welcome Banner */}
      <Card className="welcome-banner-overview">
        <Row align="middle" justify="space-between">
          <Col>
            <Title level={2} style={{ color: "white", margin: 0 }}>
              Chào mừng trở lại, Gia sư!
            </Title>
            <Paragraph style={{ color: "rgba(255, 255, 255, 0.85)", marginTop: 8 }}>
              Hãy cùng truyền cảm hứng và kiến thức đến các học viên hôm nay.
            </Paragraph>
          </Col>
          <Col>
            <Link to="/profile-tutor/courses-management">
                <Button type="primary" size="large" icon={<PlusOutlined />} ghost>
                Tạo khóa học mới
                </Button>
            </Link>
          </Col>
        </Row>
      </Card>

      {/* Quick Stats */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={8}>
          <Card className="overview-card" hoverable>
            <Statistic
              title="Tổng số khóa học"
              value={5} // Dữ liệu cứng
              prefix={<SolutionOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="overview-card" hoverable>
            <Statistic
              title="Học viên tháng này"
              value={12} // Dữ liệu cứng
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} lg={8}>
          <Card className="overview-card" hoverable>
            <Statistic
              title="Doanh thu tháng này"
              value={5500000} // Dữ liệu cứng
              precision={0}
              prefix="₫"
            />
          </Card>
        </Col>
      </Row>

      {/* Main Action & Tips */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={14}>
          <Card className="overview-card tips-card">
            <Title level={4}><RocketOutlined style={{ marginRight: 8, color: '#1a73e8' }} /> Mẹo để thành công trên TUTORIFY</Title>
            <Timeline style={{marginTop: 24}}>
              <Timeline.Item color="green" dot={<CheckCircleOutlined />}>
                Hoàn thiện 100% hồ sơ của bạn để tăng độ tin cậy.
              </Timeline.Item>
              <Timeline.Item color="blue" dot={<VideoCameraAddOutlined />}>
                Tạo khóa học đầu tiên với video giới thiệu hấp dẫn.
              </Timeline.Item>
              <Timeline.Item>
                Chia sẻ khóa học của bạn lên mạng xã hội để thu hút học viên.
              </Timeline.Item>
              <Timeline.Item>
                Tương tác tích cực với học viên trong các buổi học.
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
        <Col xs={24} md={10}>
          <Card className="overview-card call-to-action-card">
              <Title level={4}>Sẵn sàng bứt phá?</Title>
              <Paragraph>
                Hồ sơ của bạn là ấn tượng đầu tiên. Hãy đảm bảo nó thật chuyên nghiệp.
              </Paragraph>
              <Button type="primary" size="large" block>Cập nhật hồ sơ ngay</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TutorOverview;