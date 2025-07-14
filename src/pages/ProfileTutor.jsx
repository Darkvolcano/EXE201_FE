import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  DollarOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Avatar, Modal, Form, Input, InputNumber, Button, Card, message } from "antd";
import { useProfileUser } from "../hooks/ProfileApi";
import { useCourseApi } from '../hooks/coursesAPIExtend';
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../style/ProfileTutor.css";
import '../style/CourseProfilePage.css';

const { Meta } = Card;
const { TextArea } = Input;

const TutorProfile = () => {
  const { data: userData, isLoading, error } = useProfileUser();
  const { courses, isLoading: coursesLoading, error: coursesError, createCourse, getTutorCourses } = useCourseApi();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("OVERVIEW");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  // Mock account ID - in real app, this would come from auth context
  const accountId = "682953018ebb6ea503ccd14b";

  // Dữ liệu tĩnh cho các phần khác (schedule, support, stats)
  const tutorData = {
    fullName: "Prashant",
    schedule: [
      {
        studentName: "Prashant Kumar Singh",
        date: "25/2/2023",
        subject: "CODING",
        content: "Understanding Concept of React",
      },
      {
        studentName: "John Doe",
        date: "26/2/2023",
        subject: "MATH",
        content: "Algebra Basics",
      },
      {
        studentName: "Jane Smith",
        date: "27/2/2023",
        subject: "CHEMISTRY",
        content: "Chemical Reactions",
      },
      {
        studentName: "Alice Brown",
        date: "28/2/2023",
        subject: "BIOLOGY",
        content: "Cell Structure",
      },
      {
        studentName: "Bob Wilson",
        date: "1/3/2023",
        subject: "LITERATURE",
        content: "Shakespeare Analysis",
      },
      {
        studentName: "Emma Davis",
        date: "2/3/2023",
        subject: "ENGLISH",
        content: "Grammar Rules",
      },
      {
        studentName: "Emma Davis",
        date: "2/3/2023",
        subject: "ENGLISH",
        content: "Grammar Rules",
      },
      {
        studentName: "Emma Davis",
        date: "2/3/2023",
        subject: "ENGLISH",
        content: "Grammar Rules",
      },
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

  useEffect(() => {
    if (location.pathname === "/profile-tutor") {
      setActiveSection("OVERVIEW");
    } else if (location.pathname === "/profile-tutor/tutor-certifications") {
      setActiveSection("Certificate");
    }
  }, [location.pathname]);

  useEffect(() => {
    // Fetch courses when component mounts or when Course section is active
    if (activeSection === "Course") {
      getTutorCourses(accountId);
    }
  }, [activeSection]);

  // Course-related functions
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await createCourse(values);
      message.success('Course created successfully!');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to create course. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading)
    return (
      <div className="profile-container">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="profile-container">
        <ErrorMessage message="Error loading profile" />
      </div>
    );

  return (
    <div className="tutor-profile-wrapper">
      {/* Sidebar (Menu bên trái) */}
      <div className="sidebar-profile-tutor">
        <div className="menu-list-profile-tutor">
          <Link
            to="/profile-tutor"
            className={`menu-item ${
              activeSection === "OVERVIEW" ? "active" : ""
            }`}
            onClick={() => setActiveSection("OVERVIEW")}
          >
            OVERVIEW
          </Link>
          <Link
            to="/profile-tutor"
            className={`menu-item ${
              activeSection === "Dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveSection("Dashboard")}
          >
            Dashboard
          </Link>
          <Link
            to="/forum"
            className={`menu-item ${activeSection === "Forum" ? "active" : ""}`}
            onClick={() => setActiveSection("Forum")}
          >
            Forum
          </Link>
          <Link
            to="/profile-tutor"
            className={`menu-item ${
              activeSection === "Course" ? "active" : ""
            }`}
            onClick={() => setActiveSection("Course")}
          >
            Course
          </Link>
          <Link
            to="tutor-certifications"
            className={`menu-item ${
              activeSection === "Certificate" ? "active" : ""
            }`}
            onClick={() => setActiveSection("Certificate")}
          >
            Certificate
          </Link>
        </div>
        <h2 className="sidebar-title">STUDENTS</h2>
        <div className="student-list">
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
      {activeSection === "Dashboard" && (
        <div className="tutor-profile-container">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h1>TUTOR PAGE {userData?.fullName || tutorData.fullName}</h1>
            <p>
              Welcome {userData?.fullName || tutorData.fullName}, Empower
              Students with Your Knowledge. Manage your schedule, track
              bookings, and grow your tutoring career.
            </p>
            <div className="course-status">
              <span>218 Watched</span>
              <button className="continue-button">Continue Teaching</button>
            </div>
          </div>

          <div className="courses-section">
            <div className="course-card">
              <img
                src="/src/assets/How-to-Become-a-Front-End-Developer-in-2020.png"
                alt="Course 1"
              />
              <h3>
                Beginner's Guide to Becoming a Professional Frontend Developer
              </h3>
              <span>218 Watched</span>
              <button className="continue-button">Continue Teaching</button>
            </div>
            <div className="course-card">
              <img
                src="/src/assets/How-to-Become-a-Front-End-Developer-in-2020.png"
                alt="Course 2"
              />
              <h3>Create Your Course and Rise</h3>
              <span>218 Watched</span>
              <button className="continue-button">Continue Teaching</button>
            </div>
            <div className="course-card">
              <img
                src="/src/assets/How-to-Become-a-Front-End-Developer-in-2020.png"
                alt="Course 3"
              />
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
                  <span className={`subject ${item.subject.toLowerCase()}`}>
                    {item.subject}
                  </span>
                  <span>{item.content}</span>
                  <button className="show-details">Show Details</button>
                </div>
              ))}
            </div>
            <button className="see-all">See All</button>
          </div>
        </div>
      )}

      {/* Course Section */}
      {activeSection === "Course" && (
        <div className="course-page-container">
          <div className="course-header">
            <div className="course-header-content">
              <h1>My Courses</h1>
              <p>Manage your courses and track their performance</p>
            </div>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={showModal}
              size="large"
            >
              Create New Course
            </Button>
          </div>

          <div className="course-stats">
            <div className="stat-card">
              <h3>Total Courses</h3>
              <span className="stat-number">{courses.length}</span>
            </div>
            <div className="stat-card">
              <h3>Active Courses</h3>
              <span className="stat-number">{courses.filter(course => course.isActive).length}</span>
            </div>
            <div className="stat-card">
              <h3>Total Revenue</h3>
              <span className="stat-number">
                {formatPrice(courses.reduce((total, course) => total + course.price, 0))}
              </span>
            </div>
          </div>

          {coursesLoading && courses.length === 0 ? (
            <LoadingSpinner />
          ) : coursesError ? (
            <ErrorMessage message={coursesError} />
          ) : (
            <>
              <div className="courses-grid">
                {courses.map((course) => (
                  <Card
                    key={course.courseId}
                    className="course-card"
                    cover={
                      <img
                        alt={course.name}
                        src={course.image}
                        className="course-image"
                        onError={(e) => {
                          e.target.src = '/src/assets/How-to-Become-a-Front-End-Developer-in-2020.png';
                        }}
                      />
                    }
                    actions={[
                      <EyeOutlined key="view" title="View Course" />,
                      <EditOutlined key="edit" title="Edit Course" />,
                      <DeleteOutlined key="delete" title="Delete Course" />
                    ]}
                  >
                    <Meta
                      title={course.name}
                      description={
                        <div className="course-details">
                          <p className="course-description">{course.description}</p>
                          <div className="course-info">
                            <span className="course-price">{formatPrice(course.price)}</span>
                            <span className={`course-status ${course.isActive ? 'active' : 'inactive'}`}>
                              {course.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <div className="course-dates">
                            <small>Created: {formatDate(course.createdAt)}</small>
                            <small>Updated: {formatDate(course.updatedAt)}</small>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                ))}
              </div>

              {courses.length === 0 && (
                <div className="empty-state">
                  <h3>No courses yet</h3>
                  <p>Create your first course to get started!</p>
                  <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                    Create Course
                  </Button>
                </div>
              )}
            </>
          )}

          <Modal
            title="Create New Course"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            width={600}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              <Form.Item
                name="name"
                label="Course Name"
                rules={[{ required: true, message: 'Please enter course name' }]}
              >
                <Input placeholder="Enter course name" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please enter course description' }]}
              >
                <TextArea 
                  rows={4} 
                  placeholder="Enter course description"
                />
              </Form.Item>

              <Form.Item
                name="image"
                label="Course Image URL"
                rules={[{ required: true, message: 'Please enter image URL' }]}
              >
                <Input placeholder="https://example.com/course.jpg" />
              </Form.Item>

              <Form.Item
                name="price"
                label="Price (VND)"
                rules={[{ required: true, message: 'Please enter course price' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="99000"
                  min={0}
                  step={1000}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>

              <Form.Item className="form-buttons">
                <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  Create Course
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}

      {/* Outlet for child routes at the top level */}
      <Outlet />

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
            <h3>
              <UserOutlined /> Good Morning {userData?.fullName || "User"}
            </h3>
            <p>Continue Your Journey And Achieve Your Target</p>
            <p>
              <MailOutlined /> Email: {userData?.email || "N/A"}
            </p>
            <p>
              <PhoneOutlined /> Phone: {userData?.phone || "N/A"}
            </p>
            <p>
              <DollarOutlined /> Balance: {userData?.balance || 0} VND
            </p>
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
            <span className="stat-value">
              {tutorData.stats.earnings.toLocaleString()} VND
            </span>
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