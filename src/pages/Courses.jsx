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
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const { Option } = Select;
const { TextArea } = Input;

// Bật plugin customParseFormat
dayjs.extend(customParseFormat);

const Courses = () => {
  const { user } = useAuthStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { mutate: createCourse, isLoading } = useCreateCourse();
  const { data, isLoading: isLoadingCourses, isError } = useGetCourse();

  // Lấy danh sách khóa học từ API
  const courses =
    data?.data?.courses?.map((item) => ({
      ...item.course,
      accountName: item.account.fullName,
    })) || [];
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

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
        message.success("Khóa học đã được tạo thành công!");
        setIsModalVisible(false);
        form.resetFields();
      },
      onError: (error) => {
        message.error(
          error.response?.data?.message || "Tạo khóa học thất bại."
        );
      },
    });
  };

  // Lọc khóa học theo tên và tên tài khoản
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.accountName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Sắp xếp khóa học
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortOrder === "price-high") return b.price - a.price;
    if (sortOrder === "price-low") return a.price - b.price;
    if (sortOrder === "created-newest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === "created-oldest")
      return new Date(a.createdAt) - new Date(b.createdAt);
    return 0; // Mặc định (mới nhất)
  });

  // Tính toán phân trang
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = sortedCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="course-container">
      <div className="course-header">
        <h1 className="header-title">Tìm Khóa Học Phù Hợp Với Bạn</h1>
        <p className="header-subtitle">
          Học hiệu quả hơn với các khóa học phù hợp. Chọn hơn một khóa học dựa
          trên nhu cầu của bạn.
        </p>
        <div className="header-buttons">
          <Button type="primary" className="explore-button">
            Khám phá thêm
          </Button>
          <Button className="watch-video-button">
            <span className="play-icon">▶</span> Xem Video
          </Button>
        </div>
        <div className="header-decoration"></div>
      </div>

      <div className="search-bar">
        <Input
          placeholder="Tìm khóa học theo môn học, độ khó, thời lượng, v.v."
          suffix={<SearchIconWhite />}
          className="search-input-course"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={sortOrder}
          className="sort-select-course"
          onChange={(value) => setSortOrder(value)}
        >
          <Option value="latest">Sắp xếp theo: Mới nhất</Option>
          <Option value="price-high">Sắp xếp theo: Giá (Cao đến Thấp)</Option>
          <Option value="price-low">Sắp xếp theo: Giá (Thấp đến Cao)</Option>
          <Option value="created-newest">
            Sắp xếp theo: Ngày (Mới nhất đến Cũ nhất)
          </Option>
          <Option value="created-oldest">
            Sắp xếp theo: Ngày (Cũ nhất đến Mới nhất)
          </Option>
        </Select>
        {user && user.role === "Tutor" ? (
          <>
            <Button
              type="primary"
              className="create-course-button"
              onClick={showModal}
            >
              Tạo khóa học
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="course-content">
        <div className="course-list-container">
          <Row gutter={[16, 16]}>
            {isLoadingCourses && <div>Đang tải...</div>}
            {isError && <div>Tải khóa học thất bại.</div>}
            {!isLoadingCourses && !isError && currentCourses.length === 0 && (
              <div>Không tìm thấy khóa học.</div>
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
                          "https://via.placeholder.com/300x200?text=Khóa học"
                        })`,
                      }}
                    ></div>
                    <h3 className="course-name">{course.name}</h3>
                    <div className="course-creator">
                      Tutor: {course.accountName || "Không rõ"}
                    </div>
                    <div className="course-created-date">
                      Ngày tạo: {dayjs(course.createdAt).format("DD/MM/YYYY")}
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
              Tổng cộng: {currentCourses.length} Khóa học
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
        title="Tạo Khóa Học Mới"
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
            label="Tên khóa học"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên khóa học!" }]}
          >
            <Input placeholder="Ví dụ: Giới thiệu về Điện toán đám mây" />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <TextArea
              rows={4}
              placeholder="Ví dụ: Học các nguyên tắc cơ bản của điện toán đám mây"
            />
          </Form.Item>
          <Form.Item
            label="URL Hình ảnh"
            name="image"
            rules={[
              { required: true, message: "Vui lòng nhập URL hình ảnh!" },
              { type: "url", message: "Vui lòng nhập URL hợp lệ!" },
            ]}
          >
            <Input placeholder="Ví dụ: https://example.com/course.jpg" />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[
              { required: true, message: "Vui lòng nhập giá!" },
              { min: 0, message: "Giá không được âm!" },
            ]}
          >
            <Input type="number" placeholder="Ví dụ: 99.99" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="submit-course-button"
              loading={isLoading}
            >
              Tạo Khóa Học
            </Button>
            <Button
              className="cancel-course-button"
              onClick={handleCancel}
              style={{ marginLeft: 8 }}
            >
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Courses;
