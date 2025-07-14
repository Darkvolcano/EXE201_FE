import React, { useState, useEffect } from 'react';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Modal, Form, Input, InputNumber, Button, Card, Avatar, message } from 'antd';
import { useCourseApi } from '../hooks/coursesAPIExtend';
import { useProfileUser } from '../hooks/ProfileApi';
import useAuthStore from '../hooks/authenStoreApi.js';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../style/CourseProfilePage.css';

const { Meta } = Card;
const { TextArea } = Input;

const CoursePage = () => {
  const { courses, isLoading, error, createCourse, getTutorCourses } = useCourseApi();
  const { data: userData } = useProfileUser();
  const { user } = useAuthStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const accountId = user?.accountId;

  useEffect(() => {
    const fetchCourses = async () => {
      if (accountId) {
        try {
          await getTutorCourses(accountId);
        } catch (error) {
          console.error('Error fetching courses:', error);
          // Error is already handled in the hook, just log it
        }
      }
    };

    fetchCourses();
  }, [accountId]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    if (!accountId) {
      message.error('User not authenticated');
      return;
    }

    setSubmitting(true);
    try {
      const courseData = {
        ...values,
        accountId: accountId
      };
      
      await createCourse(courseData);
      message.success('Course created successfully!');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error(error.message || 'Failed to create course. Please try again.');
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

  // Show loading if user is not authenticated
  if (!accountId) {
    return (
      <div className="course-page-container">
        <ErrorMessage message="User not authenticated. Please log in." />
      </div>
    );
  }

  if (isLoading && courses.length === 0) {
    return (
      <div className="course-page-container">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="course-page-container">
        <ErrorMessage message={error} />
        <Button 
          type="primary" 
          onClick={() => getTutorCourses(accountId)}
          style={{ marginTop: 16 }}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
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

      {courses.length === 0 && !isLoading && !error && (
        <div className="empty-state">
          <h3>No courses yet</h3>
          <p>Create your first course to get started!</p>
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Create Course
          </Button>
        </div>
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
  );
};

export default CoursePage;