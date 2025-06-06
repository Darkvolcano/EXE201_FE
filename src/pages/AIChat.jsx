import React, { useState } from "react";
import {
  Button,
  Input,
  Avatar,
  Collapse,
  Tooltip,
  message,
  Tabs,
  Badge,
} from "antd";
import {
  UserOutlined,
  SunOutlined,
  MoonOutlined,
  SettingOutlined,
  PaperClipOutlined,
  SendOutlined,
  DownOutlined,
  FilterOutlined,
  StarOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import "../style/AIChat.css";
import ROBOT_AI from "../assets/robot-ai.png";
import IMAGE from "../assets/avatar-online.png";

const { Panel } = Collapse;
const { Search } = Input;
const { TabPane } = Tabs;

const AIChat = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    message.info(`Switched to ${theme === "light" ? "dark" : "light"} mode`);
  };

  const tutors = [
    {
      id: 1,
      name: "Rizqi Assegaf",
      title: "SD-BMA Mentor",
      experience: "10 years experience",
      image: "https://via.placeholder.com/100?text=Rizqi+Assegaf",
    },
    {
      id: 2,
      name: "Rizqi Assegaf",
      title: "SD-BMA Mentor",
      experience: "10 years experience",
      image: "https://via.placeholder.com/100?text=Rizqi+Assegaf",
    },
    {
      id: 3,
      name: "Rizqi Assegaf",
      title: "SD-BMA Mentor",
      experience: "10 years experience",
      image: "https://via.placeholder.com/100?text=Rizqi+Assegaf",
    },
    {
      id: 4,
      name: "Rizqi Assegaf",
      title: "SD-BMA Mentor",
      experience: "10 years experience",
      image: "https://via.placeholder.com/100?text=Rizqi+Assegaf",
    },
    {
      id: 5,
      name: "Rizqi Assegaf",
      title: "SD-BMA Mentor",
      experience: "10 years experience",
      image: "https://via.placeholder.com/100?text=Rizqi+Assegaf",
    },
    {
      id: 6,
      name: "Rizqi Assegaf",
      title: "SD-BMA Mentor",
      experience: "10 years experience",
      image: "https://via.placeholder.com/100?text=Rizqi+Assegaf",
    },
  ];

  const chatMessages = [
    {
      sender: "user",
      time: "02:22 AM",
      text: "Math tutor in Ho Chi Minh City.",
    },
    {
      sender: "bot",
      time: "02:23 AM",
      text: "Great! I found 3 math tutors in Ho Chi Minh City. Sort by popularity or years of experience?",
    },
    { sender: "user", time: "02:24 AM", text: "Years of experience." },
    { sender: "bot", time: "02:24 AM", text: "" },
  ];

  const recentChats = [
    { title: "How to use Tutorify GPT", time: "2m ago" },
    { title: "Math tutor booking", time: "2m ago", highlight: true },
    { title: "CompSci SICP Tutorial course", time: "2m ago" },
    { title: "Proxy failure troubleshooting", time: "2m ago" },
    { title: "Schedule for top tutors", time: "2m ago" },
    { title: "Best courses for high school...", time: "2m ago" },
    { title: "Fix SSL/TLS Error", time: "2m ago" },
  ];

  const handleSendMessage = (value) => {
    if (value) {
      message.info(`Sent: ${value}`);
    }
  };

  return (
    <div className={`tutorify-container ${theme}`}>
      <div className="course-header-ai">
        <div className="course-content-ai">
          <h1 className="header-title">Hello! I'm your AI Tutor Assistant</h1>
          <h1 className="header-title">Let's find your perfect mentor!</h1>
          <p className="header-subtitle">
            Learn more effectively with professional tutors. Choose a tutor
            based on your needs.
          </p>
        </div>
        <div className="course-image-ai">
          <img src={ROBOT_AI} height={180} />
        </div>
      </div>
      <div className="header">
        <div className="header-left">
          <Badge dot color="green">
            <Avatar size={32} className="profile-icon" src={IMAGE} />
          </Badge>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <span className="profile-name">Tutorify</span>
            <span className="profile-status">Online</span>
          </div>
          <span className="dropdown-arrow">
            <DownOutlined />
          </span>
        </div>
        <div className="header-center">
          <span className="app-title">Tutorify GPT 7.0</span>
        </div>
        <div className="header-right">
          <Tooltip
            title={
              theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
            }
          >
            <Button
              icon={theme === "light" ? <MoonOutlined /> : <SunOutlined />}
              onClick={toggleTheme}
              className="theme-toggle"
            />
          </Tooltip>
          <Button icon={<SettingOutlined />} className="settings-icon" />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="sidebar">
          <div className="sidebar-section">
            <Tabs defaultActiveKey="1" className="header-tabs">
              <TabPane tab="Main" key="1" />
              <TabPane tab="Settings" key="2" />
              <TabPane tab="Payment" key="3" />
            </Tabs>
            <span className="section-title">TutorifyGPT</span>
            <div className="subsection">
              <span>SlothPilot</span>
            </div>
            <div className="subsection">
              <span>Designer</span>
            </div>
            <div className="subsection active">
              <span>Schedule Planner</span>
            </div>
            <div className="subsection">
              <span>Subject Assistant</span>
            </div>
          </div>
          {/* <div className="sidebar-section">
            <span className="section-title">Designer</span>
          </div> */}
          <Collapse defaultActiveKey={["1"]} className="recent-chats">
            <Panel header="Recent Chats" key="1">
              {recentChats.map((chat, index) => (
                <div
                  key={index}
                  className={`chat-item ${chat.highlight ? "highlight" : ""}`}
                >
                  <span className="chat-title">{chat.title}</span>
                  <div className="chat-meta">
                    <span className="chat-time">{chat.time}</span>
                    {chat.highlight && (
                      <span className="chat-ellipsis">...</span>
                    )}
                  </div>
                </div>
              ))}
            </Panel>
          </Collapse>
        </div>
        <div className="chat-area">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <Avatar
                size={32}
                src={
                  msg.sender === "user"
                    ? "https://via.placeholder.com/32?text=You"
                    : "https://via.placeholder.com/32?text=Bot"
                }
                className="message-avatar"
              />
              <div className="message-content">
                <span className="message-time">{msg.time}</span>
                <div className="message-text">
                  {msg.sender === "bot" && index === 3 && (
                    <div className="tutor-grid">
                      {tutors.map((tutor) => (
                        <div key={tutor.id} className="tutor-card">
                          <img
                            src={tutor.image}
                            alt={tutor.name}
                            className="tutor-image"
                          />
                          <div className="tutor-info">
                            <span className="tutor-name">{tutor.name}</span>
                            <span className="tutor-title">{tutor.title}</span>
                            <span className="tutor-experience">
                              {tutor.experience}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {msg.text && <span>{msg.text}</span>}
                </div>
              </div>
            </div>
          ))}
          <div className="message-input">
            <div style={{ display: "flex", width: "-webkit-fill-available" }}>
              <Button icon={<PaperClipOutlined />} className="paperclip-icon" />
              <Search
                placeholder="Message tutorifyGPT..."
                enterButton={<Button icon={<SendOutlined />} />}
                size="large"
                onSearch={handleSendMessage}
                className="message-search"
              />
            </div>
            <div className="disclaimer">
              Message tutorifyGPT. tutorifyGPT can make mistakes. Check our
              Terms & Conditions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
