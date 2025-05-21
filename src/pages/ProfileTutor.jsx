import React from "react";
import { UserOutlined, MailOutlined, PhoneOutlined, DollarOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useProfileUser } from "../hooks/ProfileApi";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import "../style/ProfileTutor.css";

const TutorProfile = () => {
  const { data: userData, isLoading, error } = useProfileUser();

  // Dữ liệu tĩnh cho các phần khác (schedule, support, stats)
  const tutorData = {
    fullName: "Prashant",
    schedule: [
      { studentName: "Prashant Kumar Singh", date: "25/2/2023", subject: "CODING", content: "Understanding Concept of React" },
      { studentName: "John Doe", date: "26/2/2023", subject: "MATH", content: "Algebra Basics" },
      { studentName: "Jane Smith", date: "27/2/2023", subject: "CHEMISTRY", content: "Chemical Reactions" },
      { studentName: "Alice Brown", date: "28/2/2023", subject: "BIOLOGY", content: "Cell Structure" },
      { studentName: "Bob Wilson", date: "1/3/2023", subject: "LITERATURE", content: "Shakespeare Analysis" },
      { studentName: "Emma Davis", date: "2/3/2023", subject: "ENGLISH", content: "Grammar Rules" },
      { studentName: "Emma Davis", date: "2/3/2023", subject: "ENGLISH", content: "Grammar Rules" },
      { studentName: "Emma Davis", date: "2/3/2023", subject: "ENGLISH", content: "Grammar Rules" }
    ],
    support: [
      { name: "Prashant Kumar Singh", role: "IT Support" },
      { name: "Michael Lee", role: "Man & English Tutor" },
      { name: "Sarah Johnson", role: "Software Developer" },
    ],
    stats: {
      totalBookings: 25,
      totalStudents: 120,
      earnings: 1500000, // VND
    },
  };

  if (isLoading) return (
    <div className="profile-container">
      <LoadingSpinner />
    </div>
  );
  if (error) return (
    <div className="profile-container">
      <ErrorMessage message="Error loading profile" />
    </div>
  );
  
  return (
    <div className="tutor-profile-wrapper">
      {/* Sidebar (Menu bên trái) */}
      <div className="sidebar">
        <div className="menu-list">
          <div className="menu-item">OVERVIEW</div>
          <div className="menu-item active">Dashboard</div>
          <div className="menu-item">Inbox</div>
          <div className="menu-item">Lesson</div>
          <div className="menu-item">Schedule</div>
          <div className="menu-item">Group</div>
        </div>
                <h2 className="sidebar-title">STUDENTS</h2>
        <div className="student-list">``````````````````````````
          <div className="student-item">
            <Avatar size={40} src="https://via.placeholder.com/40" />
            <div className="student-info">
              <span>Prashant</span>
              <span>Upcoming Session 2/2023</span>
              <span>Math & English</span>
            </div>
          </div>
          <div className="student-item">
            <Avatar size={40} src="https://via.placeholder.com/40" />
            <div className="student-info">
              <span>John Doe</span>
              <span>Upcoming Session 3/2023</span>
              <span>Coding</span>
            </div>
          </div>
        </div>
        <div className="sidebar-footer">
          <button className="profile-settings-button">Profile Settings</button>
          <button className="logout-button">Logout</button>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="tutor-profile-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>TUTOR PAGE {userData?.fullName || tutorData.fullName}</h1>
          <p>
            Welcome {userData?.fullName || tutorData.fullName}, Empower Students with Your Knowledge. Manage your schedule, track bookings, and grow your tutoring career.
          </p>
          <div className="course-status">
            <span>218 Watched</span>
            <button className="continue-button">Continue Teaching</button>
          </div>
        </div>

        {/* Courses Section */}
        <div className="courses-section">
          <div className="course-card">
            <img src="/src/assets/How-to-Become-a-Front-End-Developer-in-2020.png" alt="Course 1" />
            <h3>Beginner's Guide to Becoming a Professional Frontend Developer</h3>
            <span>218 Watched</span>
            <button className="continue-button">Continue Teaching</button>
          </div>
          <div className="course-card">
            <img src="/src/assets/How-to-Become-a-Front-End-Developer-in-2020.png" alt="Course 2" />
            <h3>Create Your Course and Rise</h3>
            <span>218 Watched</span>
            <button className="continue-button">Continue Teaching</button>
          </div>
          <div className="course-card">
            <img src="/src/assets/How-to-Become-a-Front-End-Developer-in-2020.png" alt="Course 3" />
            <h3>Learn Software Development with Us!</h3>
            <span>218 Watched</span>
            <button className="continue-button">Continue Teaching</button>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="schedule-section">
          <h2>Your Schedule</h2>
          <div className="schedule-table">
            <div className="schedule-header">
              <span>Student Name</span>
              <span>Date</span>
              <span>Subject</span>
              <span>Content</span>
              <span>Action</span>
            </div>
            {tutorData.schedule.map((item, index) => (
              <div key={index} className="schedule-row">
                <span>{item.studentName}</span>
                <span>{item.date}</span>
                <span className={`subject ${item.subject.toLowerCase()}`}>{item.subject}</span>
                <span>{item.content}</span>
                <button className="show-details">Show Details</button>
              </div>
            ))}
          </div>
          <button className="see-all">See All</button>
        </div>
      </div>

      {/* Cột phụ bên phải */}
      <div className="right-sidebar">
        {/* Thông tin cá nhân */}
        <div className="profile-info">
          <Avatar
            size={60}
            src={userData?.avatar || "https://via.placeholder.com/60"}
            className="profile-avatar"
          />
          <div className="profile-details">
            <h3><UserOutlined /> Good Morning {userData?.fullName || "User"}</h3>
            <p>Continue Your Journey And Achieve Your Target</p>
            <p><MailOutlined /> Email: {userData?.email || "N/A"}</p>
            <p><PhoneOutlined /> Phone: {userData?.phone || "N/A"}</p>
            <p><DollarOutlined /> Balance: {userData?.balance || 0} VND</p>
          </div>
        </div>

        {/* Your Stats Section */}
        <div className="stats-section">
          <h2>Your Stats</h2>
          <div className="stat-item">
            <span>Total Bookings This Month</span>
            <span className="stat-value">{tutorData.stats.totalBookings}</span>
            <button className="see-more">See More</button>
          </div>
          <div className="stat-item">
            <span>Total Students This Year</span>
            <span className="stat-value">{tutorData.stats.totalStudents}</span>
            <button className="see-more">See More</button>
          </div>
          <div className="stat-item">
            <span>Earnings This Month</span>
            <span className="stat-value">{tutorData.stats.earnings.toLocaleString()} VND</span>
            <button className="see-more">See More</button>
          </div>
        </div>

        {/* Support Section - Đặt ở cuối */}
        <div className="support-section">
          <h2>Support</h2>
          <div className="support-table">
            <div className="support-header">
              <span>Name</span>
              <span>Role</span>
              <span>Action</span>
            </div>
            {tutorData.support.map((item, index) => (
              <div key={index} className="support-row">
                <span>{item.name}</span>
                <span>{item.role}</span>
                <button className="follow-button">Follow</button>
              </div>
            ))}
          </div>
          <button className="see-all">See All</button>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;