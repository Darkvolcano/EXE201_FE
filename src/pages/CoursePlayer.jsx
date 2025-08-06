import React, { useState } from "react";
import { Card, Tabs, Button, Collapse, Avatar, message, Modal } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  CommentOutlined,
  FolderOutlined,
  VideoCameraOutlined,
  ClockCircleTwoTone,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCourseFeedback,
  useGetCourseChapters,
  useGetChapterContents,
  useGetCourse,
} from "../hooks/coursesApi";
import { useQueries } from "@tanstack/react-query";
import "../style/CoursePlayer.css";
import { useCreateOrder } from "../hooks/ordersApi";
import dayjs from "dayjs";

const { TabPane } = Tabs;
const { Panel } = Collapse;

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch courses, feedback, chapters
  const {
    data: allCoursesData,
    isLoading: isLoadingCourses,
    isError: isErrorCourses,
  } = useGetCourse();

  const {
    data: feedbackData,
    isLoading: isLoadingFeedback,
    isError: isErrorFeedback,
  } = useGetCourseFeedback(id);

  const {
    data: chaptersData,
    isLoading: isLoadingChapters,
    isError: isErrorChapters,
  } = useGetCourseChapters(id);

  // Find current course & metadata
  const courseResult = allCoursesData?.data?.courses?.find(
    (item) => item.course._id === id
  );
  const courseObj = courseResult?.course;
  const tutor = courseResult?.account;
  const certifications = courseResult?.certifications || [];

  // Fetch chapter contents for each chapter with useQueries
  useGetChapterContents._fn = async (chapterId) => {
    const { default: axiosInstance } = await import("../configs/axios");
    const response = await axiosInstance.get(`contents/chapter/${chapterId}`);
    return response.data;
  };
  const chapterContentQueries = useQueries({
    queries:
      chaptersData?.map((chapter) => ({
        queryKey: ["chapter-contents", chapter._id],
        queryFn: () => useGetChapterContents._fn(chapter._id),
        enabled: !!chaptersData,
      })) || [],
  });

  // Map: chapterId → content array
  const chapterContentsMap = {};
  chaptersData?.forEach((chapter, idx) => {
    chapterContentsMap[chapter._id] = chapterContentQueries[idx]?.data || [];
  });

  const [activeChapterKey, setActiveChapterKey] = useState(null);

  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const { mutate: createOrder, isLoading: isCreatingOrder } = useCreateOrder();

  // Handle loading and error
  if (isLoadingCourses)
    return <div style={{ padding: 32 }}>Đang tải khóa học...</div>;
  if (isErrorCourses || !courseObj)
    return (
      <div style={{ padding: 32, color: "red" }}>
        Không tìm thấy khóa học.
        <Button style={{ marginLeft: 16 }} onClick={() => navigate("/courses")}>
          Quay lại Khóa học
        </Button>
      </div>
    );

  // Compile course metadata
  const totalSections = chaptersData?.length || 0;
  const totalLectures = chaptersData
    ? chaptersData.reduce(
        (sum, chapter) => sum + (chapterContentsMap[chapter._id]?.length || 0),
        0
      )
    : 0;
  const lastUpdated = courseObj.updatedAt || courseObj.createdAt;
  // const progressPercent = 15;

  const showPaymentModal = () => {
    setIsPaymentModalVisible(true);
  };

  const handlePayment = () => {
    createOrder(
      { courseId: id },
      {
        onSuccess: (response) => {
          message.success(response.message);
          if (response.data?.url) {
            window.location.href = response.data.url; // Chuyển hướng sang URL trong response
          }
        },
        onError: (error) => {
          message.error("Thanh toán thất bại: " + error.message);
        },
      }
    );
  };

  const handleCancelPayment = () => {
    setIsPaymentModalVisible(false);
  };

  return (
    <div className="course-player-container">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="course-title">
          <span className="back-arrow" onClick={() => navigate("/courses")}>
            ←
          </span>
          <span>{courseObj.name}</span>
          <div className="metadata">
            <span>
              <FolderOutlined /> {totalSections} Phần
            </span>
            <span>
              <VideoCameraOutlined /> {totalLectures} Nội dung
            </span>
            {courseObj.duration && (
              <span>
                <ClockCircleTwoTone /> {courseObj.duration}
              </span>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        {/* Left: Video & Tabs */}
        <div className="video-section">
          <Card className="video-card">
            <div className="video-placeholder">
              <img src={courseObj.image} alt={courseObj.name} />
            </div>
            <h2 className="lecture-title">{courseObj.name}</h2>
            <div className="metadata">
              {courseObj.students && (
                <span>
                  <UserOutlined /> {courseObj.students} Học sinh đã tham gia
                </span>
              )}
              {lastUpdated && (
                <span>
                  <ClockCircleOutlined /> Cập nhật lần cuối:{" "}
                  {dayjs(lastUpdated).format("DD/MM/YYYY")}
                </span>
              )}
              {courseObj.comments && (
                <span>
                  <CommentOutlined /> {courseObj.comments} Bình luận
                </span>
              )}
            </div>
            <Tabs defaultActiveKey="1" className="content-tabs">
              <TabPane tab="Mô tả" key="1">
                <div className="description-content">
                  <p>{courseObj.description}</p>
                </div>
                {/* Tutor and certifications */}
                <div style={{ margin: "16px 0" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
                    <Avatar src={tutor?.avatar} size={40} />
                    <div>
                      <b>{tutor?.fullName}</b>
                      <div style={{ color: "#888", fontSize: 13 }}>
                        {tutor?.email}
                      </div>
                    </div>
                  </div>
                  {certifications.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                      <span style={{ fontSize: 15, fontWeight: 500 }}>
                        Chứng chỉ giảng viên:
                      </span>
                      <div
                        style={{
                          display: "flex",
                          gap: 12,
                          flexWrap: "wrap",
                          marginTop: 6,
                        }}
                      >
                        {certifications.map((cert) => (
                          <div
                            key={cert._id}
                            style={{
                              background: "#f6f6f6",
                              padding: 8,
                              borderRadius: 6,
                              minWidth: 110,
                              textAlign: "center",
                            }}
                          >
                            {cert.image?.[0] && (
                              <img
                                src={cert.image[0]}
                                style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: "50%",
                                }}
                                alt={cert.name}
                              />
                            )}
                            <div style={{ fontSize: 12 }}>{cert.name}</div>
                            <div style={{ color: "#888", fontSize: 11 }}>
                              {cert.experience} năm
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabPane>
              <TabPane tab="Bình luận" key="2">
                <div className="comments">
                  <div className="comment-count">
                    {feedbackData?.data?.length || 0} Bình luận
                  </div>
                  {isLoadingFeedback && <div>Đang tải phản hồi...</div>}
                  {isErrorFeedback && <div>Tải phản hồi thất bại.</div>}
                  {feedbackData?.data?.length === 0 && (
                    <div>Chưa có phản hồi.</div>
                  )}
                  {feedbackData?.data?.length > 0 &&
                    feedbackData.data.map((fb) => (
                      <div
                        key={fb._id}
                        style={{
                          marginBottom: 18,
                          borderBottom: "1px solid #eee",
                          paddingBottom: 12,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          <img
                            src={fb.accountId.avatar}
                            alt={fb.accountId.fullName}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                            }}
                          />
                          <div>
                            <b>{fb.accountId.fullName}</b>
                            <div
                              style={{
                                fontSize: 13,
                                color: "#888",
                              }}
                            >
                              {dayjs(fb.createdAt).format("DD/MM/YYYY")}
                            </div>
                          </div>
                        </div>
                        <div style={{ margin: "8px 0" }}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              style={{
                                color: i < fb.rating ? "#FFB400" : "#e0e0e0",
                                fontSize: 18,
                              }}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <div>{fb.comment}</div>
                      </div>
                    ))}
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </div>
        {/* Right: Sidebar Course Content */}
        <div className="sidebar-course">
          <Card className="content-card">
            <div className="header-course">
              <div className="progress">
                <h3>Nội dung Khóa học</h3>
                {/* <span className="progress-text">
                  {progressPercent}% Hoàn thành
                </span> */}
              </div>
              {/* <Progress
                percent={progressPercent}
                showInfo={false}
                strokeColor="#52c41a"
                className="progress-bar"
              /> */}
            </div>
            {isLoadingChapters ? (
              <div style={{ padding: 16 }}>Đang tải chương...</div>
            ) : isErrorChapters ? (
              <div style={{ padding: 16, color: "red" }}>
                Tải chương thất bại.
              </div>
            ) : (
              <Collapse
                accordion
                className="section-collapse"
                onChange={(key) => setActiveChapterKey(key)}
                activeKey={activeChapterKey}
              >
                {chaptersData?.length > 0 &&
                  chaptersData.map((chapter) => (
                    <Panel
                      header={chapter.title}
                      key={chapter._id}
                      extra={
                        <span>
                          <span className="lecture-count">
                            {chapterContentsMap[chapter._id]?.length || 0} bài
                            giảng
                          </span>
                          {/* <span className="duration">
                            <ClockCircleOutlined /> N/A
                          </span> */}
                        </span>
                      }
                    >
                      {chapterContentQueries.length === 0 ||
                      chapterContentQueries.some((q) => q.isLoading) ? (
                        <div style={{ color: "#888" }}>
                          Đang tải nội dung...
                        </div>
                      ) : chapterContentsMap[chapter._id]?.length > 0 ? (
                        <ul style={{ paddingLeft: 20, margin: 0 }}>
                          {chapterContentsMap[chapter._id].map((content) => (
                            <li
                              key={content._id}
                              style={{ marginBottom: 8, marginTop: 8 }}
                            >
                              {content.contentDescription}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div style={{ color: "#888" }}>
                          Không có nội dung trong chương này.
                        </div>
                      )}
                    </Panel>
                  ))}
              </Collapse>
            )}
            <Button
              type="primary"
              block
              style={{ marginTop: 16 }}
              onClick={showPaymentModal}
            >
              Thanh toán
            </Button>
          </Card>
        </div>
      </div>

      <Modal
        title="Xác nhận Thanh toán"
        visible={isPaymentModalVisible}
        onOk={handlePayment}
        onCancel={handleCancelPayment}
        okText={`Thanh toán ${courseObj.price?.toLocaleString() || "0"}đ`}
        okButtonProps={{ loading: isCreatingOrder }}
        cancelText="Hủy"
        width={700}
        style={{ top: 50 }}
        footer={[
          <Button
            key="cancel"
            onClick={handleCancelPayment}
            style={{ marginRight: 8 }}
          >
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isCreatingOrder}
            onClick={handlePayment}
            style={{
              background: "#52c41a",
              borderColor: "#52c41a",
              color: "#fff",
            }}
          >
            Thanh toán {courseObj.price?.toLocaleString() || "0"}đ
          </Button>,
        ]}
      >
        <div
          style={{
            padding: 24,
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            textAlign: "left",
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <h3
              style={{
                color: "#1890ff",
                margin: 0,
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              Chi tiết Thanh toán
            </h3>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
          >
            {courseObj.image && (
              <Avatar
                src={courseObj.image}
                size={72}
                style={{ marginRight: 16, border: "3px solid #1890ff" }}
              />
            )}
            <div>
              <p style={{ fontSize: 18, fontWeight: 600, color: "#333" }}>
                {courseObj.name || "Khóa học không xác định"}
              </p>
              <p style={{ color: "#595959", fontSize: 16 }}>
                <strong>Giá:</strong> {courseObj.price?.toLocaleString() || "0"}
                đ
              </p>
            </div>
          </div>
          <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6 }}>
            Bạn có chắc chắn muốn thanh toán khóa học này? Vui lòng kiểm tra kỹ
            thông tin trước khi xác nhận. Sau khi thanh toán, bạn sẽ được chuyển
            hướng đến trang thanh toán.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CoursePlayer;
