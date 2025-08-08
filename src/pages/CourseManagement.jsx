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
  BookOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
  VideoCameraOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  message,
  Breadcrumb,
  Empty,
  Tag,
  Tooltip,
} from "antd";
import { useCourseApi } from "../hooks/coursesAPIExtend";
import { useChapterApi } from "../hooks/chapterApiExtend";
import { useContentApi } from "../hooks/contentApiExtend";
import useAuthStore from "../hooks/authenStoreApi";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import "../style/CourseManagementPage.css"; // Import file CSS mới

const { Meta } = Card;
const { TextArea } = Input;

const CourseManagement = () => {
  const { user } = useAuthStore();
  const accountId = user?.accountId;

  const {
    courses,
    isLoading: coursesLoading,
    error: coursesError,
    createCourse,
    getTutorCourses,
  } = useCourseApi();
  const {
    chapters,
    isLoading: chaptersLoading,
    createChapter,
    getChaptersByCourse,
  } = useChapterApi();
  const {
    contents,
    isLoading: contentsLoading,
    createContent,
    getContentsByChapter,
  } = useContentApi();

  const [courseView, setCourseView] = useState("list");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [courseChapters, setCourseChapters] = useState([]);
  const [chapterContents, setChapterContents] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChapterModalVisible, setIsChapterModalVisible] = useState(false);
  const [isContentModalVisible, setIsContentModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [chapterForm] = Form.useForm();
  const [contentForm] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  // Effect to fetch courses on component mount
  useEffect(() => {
    if (accountId) {
      getTutorCourses(accountId);
    }
  }, [accountId, getTutorCourses]);

  const viewCourseChapters = async (course) => {
    setSelectedCourse(course);
    setCourseView("chapters");
    try {
      const chaptersData = await getChaptersByCourse(course.courseId);
      setCourseChapters(chaptersData);
    } catch (error) {
      console.error("Error loading chapters:", error);
      message.error("Không thể tải danh sách chương");
    }
  };

  const viewChapterContents = async (chapter) => {
    setSelectedChapter(chapter);
    setCourseView("contents");
    try {
      const contentsData = await getContentsByChapter(chapter._id);
      setChapterContents(contentsData);
    } catch (error) {
      console.error("Error loading contents:", error);
      message.error("Không thể tải nội dung");
    }
  };

  const goBackToCourses = () => {
    setCourseView("list");
    setSelectedCourse(null);
    setSelectedChapter(null);
    setCourseChapters([]);
    setChapterContents([]);
  };

  const goBackToChapters = () => {
    setCourseView("chapters");
    setSelectedChapter(null);
    setChapterContents([]);
  };

  // Course handlers
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await createCourse(values);
      message.success("Tạo khóa học thành công!");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Tạo khóa học thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  // Chapter handlers
  const showChapterModal = () => setIsChapterModalVisible(true);
  const handleChapterCancel = () => {
    setIsChapterModalVisible(false);
    chapterForm.resetFields();
  };

  const handleChapterSubmit = async (values) => {
    setSubmitting(true);
    try {
      await createChapter({
        ...values,
        courseId: selectedCourse.courseId,
      });
      message.success("Tạo chương thành công!");
      setIsChapterModalVisible(false);
      chapterForm.resetFields();
      // Reload chapters
      const chaptersData = await getChaptersByCourse(selectedCourse.courseId);
      setCourseChapters(chaptersData);
    } catch (error) {
      message.error("Tạo chương thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  // Content handlers
  const showContentModal = () => setIsContentModalVisible(true);
  const handleContentCancel = () => {
    setIsContentModalVisible(false);
    contentForm.resetFields();
  };

  const handleContentSubmit = async (values) => {
    setSubmitting(true);
    try {
      await createContent({
        ...values,
        chapterId: selectedChapter._id,
        createdBy: accountId,
      });
      message.success("Tạo nội dung thành công!");
      setIsContentModalVisible(false);
      contentForm.resetFields();
      // Reload contents
      const contentsData = await getContentsByChapter(selectedChapter._id);
      setChapterContents(contentsData);
    } catch (error) {
      message.error("Tạo nội dung thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (price) => {
    if (typeof price !== "number") return "0 VND";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Render Breadcrumb
  const renderBreadcrumb = () => {
    const items = [{ title: "Khóa học", onClick: goBackToCourses }];

    if (selectedCourse) {
      items.push({ title: selectedCourse.name, onClick: goBackToChapters });
    }

    if (selectedChapter) {
        items.push({ title: selectedChapter.title });
    }

    return (
      <Breadcrumb className="course-breadcrumb">
        {items.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.onClick && index < items.length -1 ? (
              <Button
                type="link"
                onClick={item.onClick}
                className="breadcrumb-link"
              >
                {item.title}
              </Button>
            ) : (
              item.title
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  };

  // Render Courses List
  const renderCoursesList = () => (
    <div className="courses-list-view">
      <div className="course-header">
        <div className="course-header-content">
          <h1>Khóa học của tôi</h1>
          <p>Quản lý khóa học, chương và nội dung của bạn</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          size="large"
        >
          Tạo khóa học mới
        </Button>
      </div>

      <div className="course-stats">
        <div className="stat-card">
          <h3>Tổng khóa học</h3>
          <span className="stat-number">{courses.length}</span>
        </div>
        <div className="stat-card">
          <h3>Khóa học đang hoạt động</h3>
          <span className="stat-number">
            {courses.filter((course) => course.isActive).length}
          </span>
        </div>
        <div className="stat-card">
          <h3>Tổng doanh thu</h3>
          <span className="stat-number">
            {formatPrice(
              courses.reduce((total, course) => total + course.price, 0)
            )}
          </span>
        </div>
      </div>

      {coursesLoading && courses.length === 0 ? (
        <LoadingSpinner />
      ) : coursesError ? (
        <ErrorMessage message={coursesError} />
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <Card
              key={course.courseId}
              className="course-card-clean"
              cover={
                <img
                  alt={course.name}
                  src={course.image}
                  className="course-image"
                  onError={(e) => {
                    e.target.src =
                      "/src/assets/How-to-Become-a-Front-End-Developer-in-2020.png";
                  }}
                />
              }
              actions={[
                <Tooltip title="Xem khóa học">
                  <EyeOutlined key="view" />
                </Tooltip>,
                <Tooltip title="Chỉnh sửa khóa học">
                  <EditOutlined key="edit" />
                </Tooltip>,
                <Tooltip title="Xóa khóa học">
                  <DeleteOutlined key="delete" />
                </Tooltip>,
                <Tooltip title="Quản lý chương">
                  <BookOutlined
                    key="chapters"
                    onClick={() => viewCourseChapters(course)}
                  />
                </Tooltip>,
              ]}
            >
              <Meta
                title={course.name}
                description={
                  <div className="course-details-clean">
                    <p className="course-description">{course.description}</p>
                    <div className="course-info">
                      <span className="course-price">
                        {formatPrice(course.price)}
                      </span>
                      <Tag color={course.isActive ? "green" : "red"}>
                        {course.isActive ? "Hoạt động" : "Không hoạt động"}
                      </Tag>
                    </div>
                    <div className="course-dates">
                      <small>Tạo ngày: {formatDate(course.createdAt)}</small>
                    </div>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      )}

      {courses.length === 0 && !coursesLoading && (
        <div className="empty-state">
          <Empty
            description="Chưa có khóa học nào"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Tạo khóa học
            </Button>
          </Empty>
        </div>
      )}
    </div>
  );

  // Render Chapters View
  const renderChaptersView = () => (
    <div className="chapters-view">
      <div className="view-header">
        <div className="header-left">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={goBackToCourses}
            className="back-button"
          >
            Quay lại danh sách khóa học
          </Button>
          <div className="header-info">
            <h1>{selectedCourse?.name} - Chương</h1>
            <p>Quản lý chương cho khóa học này</p>
          </div>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showChapterModal}
        >
          Thêm chương mới
        </Button>
      </div>

      <div className="content-grid">
        {chaptersLoading ? (
          <LoadingSpinner />
        ) : courseChapters.length === 0 ? (
          <div className="empty-state">
            <Empty
              description="Chưa có chương nào"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showChapterModal}
              >
                Thêm chương đầu tiên
              </Button>
            </Empty>
          </div>
        ) : (
          <div className="chapters-grid">
            {courseChapters.map((chapter, index) => (
              <Card
                key={chapter._id}
                className="chapter-card"
                hoverable
                actions={[
                  <Tooltip title="Xem nội dung">
                    <FileTextOutlined
                      key="contents"
                      onClick={() => viewChapterContents(chapter)}
                    />
                  </Tooltip>,
                  <Tooltip title="Chỉnh sửa chương">
                    <EditOutlined key="edit" />
                  </Tooltip>,
                  <Tooltip title="Xóa chương">
                    <DeleteOutlined key="delete" />
                  </Tooltip>,
                ]}
              >
                <div className="chapter-header">
                  <div className="chapter-number">Chương {index + 1}</div>
                  <Tag color="blue">{chapterContents.length || 0} Nội dung</Tag>
                </div>
                <h3 className="chapter-title">{chapter.title}</h3>
                <p className="chapter-date">
                  Tạo ngày: {formatDate(chapter.createdAt)}
                </p>
                <Button
                  type="primary"
                  ghost
                  block
                  onClick={() => viewChapterContents(chapter)}
                  icon={<PlayCircleOutlined />}
                >
                  Xem nội dung
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
  // Render Contents View
  const renderContentsView = () => (
    <div className="contents-view">
      <div className="view-header">
        <div className="header-left">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={goBackToChapters}
            className="back-button"
          >
            Quay lại danh sách chương
          </Button>
          <div className="header-info">
            <h1>{selectedChapter?.title} - Nội dung</h1>
            <p>Quản lý nội dung cho chương này</p>
          </div>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showContentModal}
        >
          Thêm nội dung mới
        </Button>
      </div>

      <div className="content-grid">
        {contentsLoading ? (
          <LoadingSpinner />
        ) : chapterContents.length === 0 ? (
          <div className="empty-state">
            <Empty
              description="Chưa có nội dung nào"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showContentModal}
              >
                Thêm nội dung đầu tiên
              </Button>
            </Empty>
          </div>
        ) : (
          <div className="contents-grid">
            {chapterContents.map((content, index) => (
              <Card
                key={content._id}
                className="content-card"
                hoverable
                actions={[
                  <Tooltip title="Xem nội dung">
                    <EyeOutlined key="view" />
                  </Tooltip>,
                  <Tooltip title="Chỉnh sửa nội dung">
                    <EditOutlined key="edit" />
                  </Tooltip>,
                  <Tooltip title="Xóa nội dung">
                    <DeleteOutlined key="delete" />
                  </Tooltip>,
                ]}
              >
                <div className="content-header">
                  <VideoCameraOutlined className="content-icon" />
                  <div className="content-number">Nội dung {index + 1}</div>
                </div>
                <div className="content-description">
                  {content.contentDescription}
                </div>
                <p className="content-date">
                  Tạo ngày: {formatDate(content.createdAt)}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );


  return (
    <div className="course-management-page">
        {renderBreadcrumb()}
        {courseView === "list"
        ? renderCoursesList()
        : courseView === "chapters"
        ? renderChaptersView()
        : renderContentsView()}

        {/* Course Modal */}
        <Modal
            title="Tạo khóa học mới"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            width={600}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
                <Form.Item name="name" label="Tên khóa học" rules={[{ required: true, message: "Vui lòng nhập tên khóa học" }]}>
                    <Input placeholder="Nhập tên khóa học" />
                </Form.Item>
                <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập mô tả khóa học" }]}>
                    <TextArea rows={4} placeholder="Nhập mô tả khóa học" />
                </Form.Item>
                <Form.Item name="image" label="URL hình ảnh khóa học" rules={[{ required: true, message: "Vui lòng nhập URL hình ảnh" }]}>
                    <Input placeholder="https://example.com/course.jpg" />
                </Form.Item>
                <Form.Item name="price" label="Giá (VND)" rules={[{ required: true, message: "Vui lòng nhập giá khóa học" }]}>
                    <InputNumber style={{ width: "100%" }} placeholder="99000" min={0} step={1000} formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} parser={(value) => value.replace(/\$\s?|(,*)/g, "")} />
                </Form.Item>
                <Form.Item className="form-buttons">
                    <Button onClick={handleCancel} style={{ marginRight: 8 }}>Hủy</Button>
                    <Button type="primary" htmlType="submit" loading={submitting}>Tạo khóa học</Button>
                </Form.Item>
            </Form>
        </Modal>

        {/* Chapter Modal */}
        <Modal title="Tạo chương mới" visible={isChapterModalVisible} onCancel={handleChapterCancel} footer={null} width={500}>
            <Form form={chapterForm} layout="vertical" onFinish={handleChapterSubmit} requiredMark={false}>
                <Form.Item name="title" label="Tiêu đề chương" rules={[{ required: true, message: "Vui lòng nhập tiêu đề chương" }]}>
                    <Input placeholder="Nhập tiêu đề chương" />
                </Form.Item>
                <Form.Item className="form-buttons">
                    <Button onClick={handleChapterCancel} style={{ marginRight: 8 }}>Hủy</Button>
                    <Button type="primary" htmlType="submit" loading={submitting}>Tạo chương</Button>
                </Form.Item>
            </Form>
        </Modal>

        {/* Content Modal */}
        <Modal title="Tạo nội dung mới" visible={isContentModalVisible} onCancel={handleContentCancel} footer={null} width={600}>
            <Form form={contentForm} layout="vertical" onFinish={handleContentSubmit} requiredMark={false}>
                <Form.Item name="contentDescription" label="Mô tả nội dung" rules={[{ required: true, message: "Vui lòng nhập mô tả nội dung" }]}>
                    <TextArea rows={4} placeholder="Nhập mô tả nội dung" />
                </Form.Item>
                <Form.Item className="form-buttons">
                    <Button onClick={handleContentCancel} style={{ marginRight: 8 }}>Hủy</Button>
                    <Button type="primary" htmlType="submit" loading={submitting}>Tạo nội dung</Button>
                </Form.Item>
            </Form>
        </Modal>
    </div>
  );
};

export default CourseManagement;