import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Radio,
  Select,
  Modal,
  message,
  Form,
} from "antd";
import "../style/Courses.css";
import SearchIconWhite from "../components/SearchIconWhite";
import useAuthStore from "../hooks/authenStoreApi";
import { useCreateCourse } from "../hooks/coursesApi";

const { Option } = Select;
const { TextArea } = Input;

const Courses = () => {
  const { user } = useAuthStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const { mutate: createCourse, isLoading } = useCreateCourse();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    const payload = {
      name: values.name,
      description: values.description,
      image: values.image,
      price: parseFloat(values.price),
    };
    createCourse(payload, {
      onSuccess: () => {
        message.success("Course created successfully!");
        setIsModalVisible(false);
        form.resetFields();
      },
      onError: (error) => {
        message.error(
          error.response?.data?.message || "Failed to create course."
        );
      },
    });
  };

  return (
    <div className="course-container">
      <div className="course-header">
        <h1 className="header-title">Find The Right Course For You</h1>
        <p className="header-subtitle">
          Learn more effectively with suitable courses. Choose more than a
          course based on your needs.
        </p>
        <div className="header-buttons">
          <Button type="primary" className="explore-button">
            Explore More
          </Button>
          <Button className="watch-video-button">
            <span className="play-icon">▶</span> Watch Video
          </Button>
        </div>
        <div className="header-decoration"></div>
      </div>

      <div className="search-bar">
        <Input
          placeholder="Find courses by subject, difficulty, duration, etc."
          suffix={<SearchIconWhite />}
          className="search-input-course"
        />
        <Select defaultValue="latest" className="sort-select-course">
          <Option value="latest">Sort by: Latest</Option>
          <Option value="popularity">Sort by: Popularity</Option>
          <Option value="ratings">Sort by: Ratings</Option>
          <Option value="newest">Sort by: Newest</Option>
        </Select>
        {user.role === "Tutor" ? (
          <>
            <Button
              type="primary"
              className="create-course-button"
              onClick={showModal}
            >
              Create courses
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="course-content">
        <div className="filter-sidebar">
          <h3 className="filter-title">Subject</h3>
          <Checkbox>English</Checkbox>
          <Checkbox>Coding</Checkbox>
          <Checkbox>Math</Checkbox>

          <h3 className="filter-title">Categories</h3>
          <Checkbox>Beginner</Checkbox>
          <Checkbox>Intermediate</Checkbox>
          <Checkbox>Advanced</Checkbox>
          <Checkbox>Expert</Checkbox>

          <h3 className="filter-title">Order By</h3>
          <Radio.Group>
            <Radio value="popularity">Popularity</Radio>
            <Radio value="ratings">Ratings</Radio>
            <Radio value="newest">Newest</Radio>
          </Radio.Group>

          <Button type="primary" className="filter-button">
            Filter
          </Button>
        </div>

        <div className="course-list-container">
          <div className="course-grid">
            <div className="course-card">
              <div
                className="course-image"
                style={{
                  backgroundImage:
                    "url(https://via.placeholder.com/300?text=ENGLISH+Hello+ABC+Don't+the+?)",
                }}
              ></div>
              <h3 className="course-name">English Course 1</h3>
              <p className="course-category">Beginner Course 1</p>
              <p className="course-duration">24 hours - 1 hour a day</p>
              <div className="course-rating">
                <span className="stars">★★★★★</span> (200)
              </div>
            </div>
            <div className="course-card">
              <div
                className="course-image"
                style={{
                  backgroundImage:
                    "url(https://via.placeholder.com/300?text=ENGLISH+Hello+ABC+Don't+the+?)",
                }}
              ></div>
              <h3 className="course-name">English Course 2</h3>
              <p className="course-category">Beginner Course 2</p>
              <p className="course-duration">24 hours - 1 hour a day</p>
              <div className="course-rating">
                <span className="stars">★★★★☆</span> (200)
              </div>
            </div>
            <div className="course-card">
              <div
                className="course-image"
                style={{
                  backgroundImage:
                    "url(https://via.placeholder.com/300?text=ENGLISH+Hello+ABC+Don't+the+?)",
                }}
              ></div>
              <h3 className="course-name">English Course 3</h3>
              <p className="course-category">Beginner Course 3</p>
              <p className="course-duration">24 hours - 1 hour a day</p>
              <div className="course-rating">
                <span className="stars">★★★★☆</span> (200)
              </div>
            </div>
            <div className="course-card">
              <div
                className="course-image"
                style={{
                  backgroundImage:
                    "url(https://via.placeholder.com/300?text=ENGLISH+Hello+ABC+Don't+the+?)",
                }}
              ></div>
              <h3 className="course-name">English Course 1</h3>
              <p className="course-category">Beginner Course 1</p>
              <p className="course-duration">24 hours - 1 hour a day</p>
              <div className="course-rating">
                <span className="stars">★★★★★</span> (200)
              </div>
            </div>
            <div className="course-card">
              <div
                className="course-image"
                style={{
                  backgroundImage:
                    "url(https://via.placeholder.com/300?text=ENGLISH+Hello+ABC+Don't+the+?)",
                }}
              ></div>
              <h3 className="course-name">English Course 2</h3>
              <p className="course-category">Beginner Course 2</p>
              <p className="course-duration">24 hours - 1 hour a day</p>
              <div className="course-rating">
                <span className="stars">★★★★★</span> (200)
              </div>
            </div>
            <div className="course-card">
              <div
                className="course-image"
                style={{
                  backgroundImage:
                    "url(https://via.placeholder.com/300?text=ENGLISH+Hello+ABC+Don't+the+?)",
                }}
              ></div>
              <h3 className="course-name">English Course 3</h3>
              <p className="course-category">Beginner Course 3</p>
              <p className="course-duration">24 hours - 1 hour a day</p>
              <div className="course-rating">
                <span className="stars">★★★★★</span> (200)
              </div>
            </div>
          </div>
          <div className="pagination">
            <span>Showing 6 Courses from 1 Pages</span>
          </div>
        </div>
      </div>

      <Modal
        title="Create New Course"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
        className="create-course-modal"
      >
        <Form
          form={form}
          name="create-course"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ price: 0 }}
          className="create-course-form"
        >
          <Form.Item
            label="Course Name"
            name="name"
            rules={[
              { required: true, message: "Please input the course name!" },
            ]}
          >
            <Input placeholder="e.g., Introduction to Cloud Computing" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="e.g., Learn the fundamentals of cloud computing"
            />
          </Form.Item>
          <Form.Item
            label="Image URL"
            name="image"
            rules={[
              { required: true, message: "Please input the image URL!" },
              { type: "url", message: "Please input a valid URL!" },
            ]}
          >
            <Input placeholder="e.g., https://example.com/course.jpg" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please input the price!" },
              { min: 0, message: "Price cannot be negative!" },
            ]}
          >
            <Input type="number" placeholder="e.g., 99.99" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="submit-course-button"
              loading={isLoading}
            >
              Create Course
            </Button>
            <Button
              className="cancel-course-button"
              onClick={handleCancel}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Courses;
