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

  // Lấy danh sách courses từ API
  const { data: allCoursesData, isLoading: isLoadingCourses, isError: isErrorCourses } = useGetCourse();

  // Tìm course theo id
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

  // Loading & error UI cho course
  if (isLoadingCourses) {
    return <div style={{ padding: 32 }}>Loading course...</div>;
  }
  if (isErrorCourses || !courseObj) {
    return (
      <div style={{ padding: 32, color: "red" }}>
        Course not found.
        <Button style={{ marginLeft: 16 }} onClick={() => navigate("/courses")}>
          Back to Courses
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
    lastUpdated: "Oct 26, 2024",
    comments: 154,
    progress: 15,
    currentLecture: "2. Sign up in Visual Studio Code",
    videoUrl: courseObj.image || "https://via.placeholder.com/800x400?text=Video+Player",
    lectureNotes: [
      "• Install & Set up Visual Studio Code",
      "• Basic HTML & CSS structure",
      "• Debugging tools & best practices",
      "• Tips for improving productivity",
    ],
    attachedFile: {
      name: "Create account on webflow.pdf",
      size: "12.6 MB",
    },
    commentsData: [
      {
        user: "Rizqi Assegaf",
        role: "Instructor",
        time: "3 months ago",
        text: "Great question! Let me explain how you can set up your account in Visual Studio Code.",
        subtext:
          "First, download the installer from the official website. Then follow the setup wizard.",
        subsubtext: "Let me know if you need further clarification!",
        replies: [
          {
            user: "Jane Smith",
            time: "2 months ago",
            text: "Thanks for the detailed explanation! I was able to set it up without any issues.",
          },
          {
            user: "Rizqi Assegaf",
            role: "Instructor",
            time: "1 month ago",
            text: "Glad it worked for you, Jane! Let me know if you have any other questions.",
          },
        ],
      },
      {
        user: "John Doe",
        role: "",
        time: "2 months ago",
        text: "Thanks for the explanation! It worked perfectly.",
        replies: [
          {
            user: "Emily Brown",
            time: "1 month ago",
            text: "I agree, this was really helpful!",
          },
        ],
      },
    ],
  };

  // Replace courseSections with chapters from API if available
  const courseSections =
    chaptersData?.length > 0
      ? chaptersData.map((chapter, idx) => ({
          title: chapter.title,
          lectures: [],
          lectureCount: 0,
          totalDuration: "",
          completed: 0,
        }))
      : [
          // fallback to old static data if no chapters
          {
            title: "Getting Started",
            lectures: [
              { id: 1, title: "1. What is C#?", duration: "07:31" },
              {
                id: 2,
                title: "2. Sign up in Visual Studio Code",
                duration: "07:31",
              },
              { id: 3, title: "3. Teaser of Razor Page", duration: "07:31" },
              { id: 4, title: "4. Razor Page Introduction", duration: "07:31" },
            ],
            lectureCount: 4,
            totalDuration: "25m",
            completed: 1,
          },
        ];

  return (
    <div className="course-player-container">
      <div className="top-bar">
        <div className="course-title">
          <span className="back-arrow" onClick={() => navigate("/courses")}>←</span>
          <span>{courseData.name}</span>
          <div className="metadata">
            <span>
              <FolderOutlined /> {courseData.sections} Sections
            </span>
            <span>
              <VideoCameraOutlined /> {courseData.lectures} Lectures
            </span>
            <span>
              <ClockCircleTwoTone /> {courseData.duration}
            </span>
          </div>
        </div>
        <div className="top-actions">
          <Button type="default" className="review-button">
            Write A Review
          </Button>
          <Button type="primary" className="next-button">
            Next Lecture
          </Button>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="video-section">
          <Card className="video-card">
            <div className="video-placeholder">
              <img src={courseData.videoUrl} alt="Video Thumbnail" />
              <div className="play-overlay">
                <PlayCircleOutlined className="play-icon" />
              </div>
            </div>
            <h2 className="lecture-title">{courseData.currentLecture}</h2>
            <div className="metadata">
              <span>
                <UserOutlined /> {courseData.students} Students Have Joined
              </span>
              <span>
                <ClockCircleOutlined /> Last updated: {courseData.lastUpdated}
              </span>
              <span>
                <CommentOutlined /> {courseData.comments} Comments
              </span>
            </div>
            <Tabs defaultActiveKey="1" className="content-tabs">
              <TabPane tab="Description" key="1">
                <div className="description-content">
                  <p>{courseData.description}</p>
                </div>
              </TabPane>
              <TabPane tab="Lecture Notes" key="2">
                <div className="lecture-notes">
                  <ul>
                    {courseData.lectureNotes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                  <Button type="primary" className="download-notes">
                    <DownloadOutlined />
                    Download Notes
                  </Button>
                </div>
              </TabPane>
              <TabPane tab="Attach File" key="3">
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
                      Download File
                    </Button>
                  </div>
                </div>
              </TabPane>
              {/* <TabPane tab="Comments" key="4">
              <div className="comments">
                <div className="comment-count">
                  {courseData.comments} Comments
                </div>
                {courseData.commentsData.map((comment, index) => (
                  <div key={index} className="comment-item">
                    <Avatar icon={<UserOutlined />} />
                    <div className="comment-content">
                      <div className="comment-header">
                        <span>
                          <span className="comment-user">{comment.user}</span>
                          {comment.role && (
                            <span className="comment-role">{comment.role}</span>
                          )}
                        </span>
                        <span className="comment-time">{comment.time}</span>
                      </div>
                      <div className="comment-text">{comment.text}</div>
                      {comment.subtext && (
                        <div className="comment-subtext">{comment.subtext}</div>
                      )}
                      {comment.subsubtext && (
                        <div className="comment-subsubtext">
                          {comment.subsubtext}
                        </div>
                      )}
                      <Button type="link" className="reply-button">
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabPane> */}
              <TabPane tab="Comments" key="4">
                <div className="comments">
                  <div className="comment-count">
                    {courseData.comments} Comments
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
                          REPLY
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
                                    REPLY
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
              <h2 style={{ marginBottom: 12 }}>Feedback</h2>
              {isLoadingFeedback && <div>Loading feedback...</div>}
              {isErrorFeedback && <div>Failed to load feedback.</div>}
              {!isLoadingFeedback &&
                !isErrorFeedback &&
                feedbackData?.data?.length === 0 && <div>No feedback yet.</div>}
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
                <h3>Course Contents</h3>
                <span className="progress-text">15% Completed</span>
              </div>
              <Progress
                percent={15}
                showInfo={false}
                strokeColor="#52c41a"
                className="progress-bar"
              />
            </div>
            {isLoadingChapters ? (
              <div style={{ padding: 16 }}>Loading chapters...</div>
            ) : isErrorChapters ? (
              <div style={{ padding: 16, color: "red" }}>
                Failed to load chapters.
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
                          <span className="lecture-count">0 lectures</span>
                          <span className="duration">
                            <ClockCircleOutlined /> N/A
                          </span>
                        </span>
                      }
                    >
                      {/* Always show contentDescription(s) */}
                      {chapterContentQueries.length === 0 ||
                      chapterContentQueries.some((q) => q.isLoading) ? (
                        <div style={{ color: "#888" }}>Loading contents...</div>
                      ) : chapterContentsMap[chapter._id]?.length > 0 ? (
                        <ul style={{ paddingLeft: 20, margin: 0 }}>
                          {chapterContentsMap[chapter._id].map((content) => (
                            <li key={content._id} style={{ marginBottom: 8 }}>
                              {content.contentDescription}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div style={{ color: "#888" }}>
                          No contents in this chapter.
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
