import React from "react";
import { Card, Tabs, Button, Progress, Collapse, Avatar, Checkbox, Form, Input } from "antd";
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
import { useGetCourseFeedback } from "../hooks/coursesApi";

const { TabPane } = Tabs;
const { Panel } = Collapse;

const CoursePlayer = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetCourseFeedback(id);
  const navigate = useNavigate();

  const courseData = {
    title: "Complete ASP.NET Core Razor Pages Web Development [.NET 8 Updated]",
    sections: 6,
    lectures: 202,
    duration: "19h 37m",
    students: 512,
    lastUpdated: "Oct 26, 2024",
    comments: 154,
    progress: 15,
    currentLecture: "2. Sign up in Visual Studio Code",
    videoUrl: "https://via.placeholder.com/800x400?text=Video+Player",
    description: `Learn everything you need to build your first website! From structuring your first page to uploading your website online. We'll use the world's most popular text editor, Visual Studio Code.
This course includes hands-on exercises for you to practice and download. By the end of the course, you'll have your own custom web project. We'll also cover debugging, troubleshooting, and adding cool features like Bootstrap, JavaScript, and jQuery.
This course is beginner-friendly and perfect for those who have never coded before. Start from scratch and progress step by step.`,
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

  const courseSections = [
    {
      title: "Getting Started",
      lectures: [
        { id: 1, title: "1. What is C#?", duration: "07:31" },
        { id: 2, title: "2. Sign up in Visual Studio Code", duration: "07:31" },
        { id: 3, title: "3. Teaser of Razor Page", duration: "07:31" },
        { id: 4, title: "4. Razor Page Introduction", duration: "07:31" },
      ],
      lectureCount: 4,
      totalDuration: "25m",
      completed: 1,
    },
    {
      title: "Secret of Good Design",
      lectures: 52,
      totalDuration: "5h 49m",
    },
    {
      title: "Practice Design Like a Pro",
      lectures: 43,
      totalDuration: "5h 1m",
    },
    {
      title: "Web Development (workflow)",
      lectures: 137,
      totalDuration: "10h 6m",
    },
    {
      title: "Secrets of Making Money Freelancing",
      lectures: 21,
      totalDuration: "3h 8m",
    },
    {
      title: "Advanced",
      lectures: 39,
      totalDuration: "1h 31m",
    },
    {
      title: "What's Next",
      lectures: 7,
      totalDuration: "17m",
    },
  ];

  return (
    <div className="course-player-container">
      <div className="top-bar">
        <div className="course-title">
          <span className="back-arrow">←</span>
          <span>{courseData.title}</span>
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
      <div className="main-content">
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
              {isLoading && <div>Loading feedback...</div>}
              {isError && <div>Failed to load feedback.</div>}
              {!isLoading && !isError && data?.data?.length === 0 && (
                <div>No feedback yet.</div>
              )}
              {!isLoading && !isError && data?.data?.length > 0 && (
                <div>
                  {data.data.map((fb) => (
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
                percent={courseData.progress}
                showInfo={false}
                strokeColor="#52c41a"
                className="progress-bar"
              />
            </div>
            <Collapse accordion className="section-collapse">
              {courseSections.map((section, index) => (
                <Panel
                  header={section.title}
                  key={index + 1}
                  extra={
                    <span>
                      <span className="lecture-count">
                        {typeof section.lectures === "number"
                          ? section.lectures
                          : section.lectureCount}{" "}
                        lectures
                      </span>
                      <span className="duration">
                        <ClockCircleOutlined /> {section.totalDuration || "N/A"}
                      </span>
                    </span>
                  }
                >
                  {typeof section.lectures !== "number" &&
                    section.lectures.map((lecture) => (
                      <div key={lecture.id} className="lecture-item">
                        <span className="lecture-title">
                          <Checkbox></Checkbox> {lecture.id}. {lecture.title}
                        </span>
                        <span className="lecture-duration">
                          {lecture.duration}
                        </span>
                        <Button
                          type="link"
                          icon={<PlayCircleOutlined />}
                          className="play-button"
                        />
                      </div>
                    ))}
                </Panel>
              ))}
            </Collapse>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
