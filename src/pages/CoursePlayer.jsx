import React, { useState } from "react";
import {
  Card,
  Tabs,
  Button,
  Progress,
  Collapse,
  Avatar,
  Checkbox,
  Form,
  Input,
} from "antd";
import {
  PlayCircleOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CommentOutlined,
  DownloadOutlined,
  FolderOutlined,
  VideoCameraOutlined,
  ClockCircleTwoTone,
} from "@ant-design/icons";
import PaperIcon from "../components/paper";
import ReplyIcon from "../components/reply";
import "../style/CoursePlayer.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCourseFeedback,
  useGetCourseChapters,
  useGetChapterContents,
  useGetCourse,
} from "../hooks/coursesApi";
import { useQueries } from "@tanstack/react-query";

const { TabPane } = Tabs;
const { Panel } = Collapse;

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Lấy danh sách khóa học từ API
  const {
    data: allCoursesData,
    isLoading: isLoadingCourses,
    isError: isErrorCourses,
  } = useGetCourse();

  // Tìm khóa học theo id
  const courseObj = allCoursesData?.data?.courses?.find(
    (item) => item.course._id === id
  )?.course;

  // Các hook khác giữ nguyên
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

  // Fetch all contents for all chapters
  const chapterContentQueries = useQueries({
    queries:
      chaptersData?.map((chapter) => ({
        queryKey: ["chapter-contents", chapter._id],
        queryFn: () => useGetChapterContents._fn(chapter._id),
        enabled: !!chaptersData,
      })) || [],
  });

  // Helper to expose the axiosInstance-based fetcher for useQueries
  useGetChapterContents._fn = async (chapterId) => {
    // This uses the same axiosInstance as your hooks/coursesApi.js
    const { default: axiosInstance } = await import("../configs/axios");
    const response = await axiosInstance.get(`contents/chapter/${chapterId}`);
    return response.data;
  };

  // Map chapterId to its contents
  const chapterContentsMap = {};
  chaptersData?.forEach((chapter, idx) => {
    chapterContentsMap[chapter._id] = chapterContentQueries[idx]?.data || [];
  });

  const [activeChapterKey, setActiveChapterKey] = useState(null);

  // Loading & error UI cho khóa học
  if (isLoadingCourses) {
    return <div style={{ padding: 32 }}>Đang tải khóa học...</div>;
  }
  if (isErrorCourses || !courseObj) {
    return (
      <div style={{ padding: 32, color: "red" }}>
        Không tìm thấy khóa học.
        <Button style={{ marginLeft: 16 }} onClick={() => navigate("/courses")}>
          Quay lại Khóa học
        </Button>
      </div>
    );
  }

  // Các dữ liệu khác giữ nguyên, chỉ thay title và description
  const courseData = {
    ...courseObj,
    // Các trường khác nếu cần giữ lại
    sections: 6,
    lectures: 202,
    duration: "19h 37m",
    students: 512,
    lastUpdated: "26/10/2024",
    comments: 154,
    progress: 15,
    currentLecture: "2. Đăng ký trong Visual Studio Code",
    videoUrl:
      courseObj.image ||
      "https://via.placeholder.com/800x400?text=Trình+phát+Video",
    lectureNotes: [
      "• Cài đặt & Thiết lập Visual Studio Code",
      "• Cấu trúc cơ bản HTML & CSS",
      "• Công cụ gỡ lỗi & cách làm tốt nhất",
      "• Mẹo cải thiện năng suất",
    ],
    attachedFile: {
      name: "Tạo tài khoản trên webflow.pdf",
      size: "12.6 MB",
    },
    commentsData: [
      {
        user: "Rizqi Assegaf",
        role: "Giảng viên",
        time: "3 tháng trước",
        text: "Câu hỏi tuyệt vời! Để tôi giải thích cách bạn có thể thiết lập tài khoản trong Visual Studio Code.",
        subtext:
          "Trước tiên, hãy tải trình cài đặt từ trang web chính thức. Sau đó làm theo hướng dẫn thiết lập.",
        subsubtext: "Hãy cho tôi biết nếu bạn cần làm rõ thêm!",
        replies: [
          {
            user: "Jane Smith",
            time: "2 tháng trước",
            text: "Cảm ơn vì giải thích chi tiết! Tôi đã thiết lập mà không gặp vấn đề gì.",
          },
          {
            user: "Rizqi Assegaf",
            role: "Giảng viên",
            time: "1 tháng trước",
            text: "Rất vui vì nó hoạt động với bạn, Jane! Hãy cho tôi biết nếu bạn có thêm câu hỏi nào.",
          },
        ],
      },
      {
        user: "John Doe",
        role: "",
        time: "2 tháng trước",
        text: "Cảm ơn vì giải thích! Nó hoạt động hoàn hảo.",
        replies: [
          {
            user: "Emily Brown",
            time: "1 tháng trước",
            text: "Tôi đồng ý, điều này rất hữu ích!",
          },
        ],
      },
    ],
  };

  // Thay courseSections bằng chapters từ API nếu có sẵn

  return (
    <div className="course-player-container">
      <div className="top-bar">
        <div className="course-title">
          <span className="back-arrow" onClick={() => navigate("/courses")}>
            ←
          </span>
          <span>{courseData.name}</span>
          <div className="metadata">
            <span>
              <FolderOutlined /> {courseData.sections} Phần
            </span>
            <span>
              <VideoCameraOutlined /> {courseData.lectures} Bài giảng
            </span>
            <span>
              <ClockCircleTwoTone /> {courseData.duration}
            </span>
          </div>
        </div>
        <div className="top-actions">
          <Button type="default" className="review-button">
            Viết Đánh giá
          </Button>
          <Button type="primary" className="next-button">
            Bài giảng Tiếp theo
          </Button>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="video-section">
          <Card className="video-card">
            <div className="video-placeholder">
              <img src={courseData.videoUrl} alt="Hình thu nhỏ Video" />
              <div className="play-overlay">
                <PlayCircleOutlined className="play-icon" />
              </div>
            </div>
            <h2 className="lecture-title">{courseData.currentLecture}</h2>
            <div className="metadata">
              <span>
                <UserOutlined /> {courseData.students} Học sinh đã tham gia
              </span>
              <span>
                <ClockCircleOutlined /> Cập nhật lần cuối:{" "}
                {courseData.lastUpdated}
              </span>
              <span>
                <CommentOutlined /> {courseData.comments} Bình luận
              </span>
            </div>
            <Tabs defaultActiveKey="1" className="content-tabs">
              <TabPane tab="Mô tả" key="1">
                <div className="description-content">
                  <p>{courseData.description}</p>
                </div>
              </TabPane>
              <TabPane tab="Ghi chú Bài giảng" key="2">
                <div className="lecture-notes">
                  <ul>
                    {courseData.lectureNotes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                  <Button type="primary" className="download-notes">
                    <DownloadOutlined />
                    Tải Ghi chú
                  </Button>
                </div>
              </TabPane>
              <TabPane tab="Tệp Đính kèm" key="3">
                <div className="attach-file">
                  <div className="file-item">
                    <div className="file-icon">
                      <PaperIcon />
                      <div className="attach">
                        <span>{courseData.attachedFile.name}</span>
                        <span className="file-size">
                          {courseData.attachedFile.size}
                        </span>
                      </div>
                    </div>
                    <Button type="primary" className="download-file">
                      <DownloadOutlined />
                      Tải Tệp
                    </Button>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Bình luận" key="4">
                <div className="comments">
                  <div className="comment-count">
                    {courseData.comments} Bình luận
                  </div>
                  {courseData.commentsData.map((comment, index) => (
                    <div key={index} className="comment-item">
                      <Avatar icon={<UserOutlined />} />
                      <div className="comment-content">
                        <div className="comment-header">
                          <span>
                            <span className="comment-user">{comment.user}</span>
                            {comment.role && (
                              <span className="comment-role">
                                {comment.role}
                              </span>
                            )}
                          </span>
                          <span className="comment-time">{comment.time}</span>
                        </div>
                        <div className="comment-text">{comment.text}</div>
                        {comment.subtext && (
                          <div className="comment-subtext">
                            {comment.subtext}
                          </div>
                        )}
                        {comment.subsubtext && (
                          <div className="comment-subsubtext">
                            {comment.subsubtext}
                          </div>
                        )}
                        <Button
                          type="link"
                          className="reply-button"
                          icon={<ReplyIcon />}
                        >
                          TRẢ LỜI
                        </Button>
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="replies">
                            {comment.replies.map((reply, replyIndex) => (
                              <div key={replyIndex} className="reply-item">
                                <Avatar icon={<UserOutlined />} size={32} />
                                <div className="reply-content">
                                  <div className="reply-header">
                                    <span>
                                      <span className="reply-user">
                                        {reply.user}
                                      </span>
                                      {reply.role && (
                                        <span className="reply-role">
                                          {reply.role}
                                        </span>
                                      )}
                                    </span>
                                    <span className="reply-time">
                                      {reply.time}
                                    </span>
                                  </div>
                                  <div className="reply-text">{reply.text}</div>
                                  <Button
                                    type="link"
                                    className="reply-button"
                                    icon={<ReplyIcon />}
                                  >
                                    TRẢ LỜI
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabPane>
            </Tabs>
            <div className="feedback-section" style={{ marginTop: 32 }}>
              <h2 style={{ marginBottom: 12 }}>Phản hồi</h2>
              {isLoadingFeedback && <div>Đang tải phản hồi...</div>}
              {isErrorFeedback && <div>Tải phản hồi thất bại.</div>}
              {!isLoadingFeedback &&
                !isErrorFeedback &&
                feedbackData?.data?.length === 0 && (
                  <div>Chưa có phản hồi.</div>
                )}
              {!isLoadingFeedback &&
                !isErrorFeedback &&
                feedbackData?.data?.length > 0 && (
                  <div>
                    {feedbackData.data.map((fb) => (
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
                              {new Date(fb.createdAt).toLocaleDateString()}
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
                )}
            </div>
          </Card>
        </div>
        <div className="sidebar-course">
          <Card className="content-card">
            <div className="header-course">
              <div className="progress">
                <h3>Nội dung Khóa học</h3>
                <span className="progress-text">15% Hoàn thành</span>
              </div>
              <Progress
                percent={15}
                showInfo={false}
                strokeColor="#52c41a"
                className="progress-bar"
              />
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
                          <span className="lecture-count">0 bài giảng</span>
                          <span className="duration">
                            <ClockCircleOutlined /> N/A
                          </span>
                        </span>
                      }
                    >
                      {/* Luôn hiển thị contentDescription(s) */}
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
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
