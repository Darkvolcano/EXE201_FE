import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Input,
  Radio,
  Select,
  Modal,
  message,
  Form,
  Rate,
  Row,
  Col,
  Pagination,
} from "antd";
import "../style/Courses.css";
import SearchIconWhite from "../components/SearchIconWhite";
import useAuthStore from "../hooks/authenStoreApi";
import { useCreateCourse, useGetCourse } from "../hooks/coursesApi";

const { Option } = Select;
const { TextArea } = Input;

const Courses = () => {
  const { user } = useAuthStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { mutate: createCourse, isLoading } = useCreateCourse();
  const { data, isLoading: isLoadingCourses, isError } = useGetCourse();

  // Lấy danh sách course từ API
  const courses = data?.data?.courses?.map((item) => item.course) || [];
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

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

  // Calculate pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        <div className="course-list-container">
          <Row gutter={[16, 16]}>
            {isLoadingCourses && <div>Loading...</div>}
            {isError && <div>Failed to load courses.</div>}
            {!isLoadingCourses && !isError && currentCourses.length === 0 && (
              <div>No courses found.</div>
            )}
            {!isLoadingCourses &&
              !isError &&
              currentCourses.map((course) => (
                <Col span={6} key={course._id} style={{ padding: "0 16px" }}>
                  <div
                    className="course-card"
                    onClick={() => navigate(`/courses/${course._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="course-image"
                      style={{
                        backgroundImage: `url(${
                          course.image ||
                          "https://via.placeholder.com/300x200?text=Course"
                        })`,
                      }}
                    ></div>
                    <h3 className="course-name">{course.name}</h3>
                    <div className="course-category">Beginner</div>
                    <div className="course-duration">
                      <span className="course-meta-icon">🕒</span>
                      24 hours - 1 hour a day
                    </div>
                    <div className="course-rating">
                      <Rate
                        value={course.rating || 4} // Default to 4 if no rating
                        disabled // Make it read-only
                      />
                      <span>(200)</span>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
          <div
            className="pagination"
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <span style={{ fontSize: 16 }}>
              Total: {currentCourses.length} Courses
            </span>
            <Pagination
              current={currentPage}
              total={totalPages * coursesPerPage}
              pageSize={coursesPerPage}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
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
