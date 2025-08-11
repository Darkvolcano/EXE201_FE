import React, { useState } from "react";
import {
  Table,
  Tag,
  Modal,
  Button,
  Tooltip,
  Card,
  Descriptions,
  Input,
  Slider,
  Select,
} from "antd";
import { EyeOutlined, FilterOutlined } from "@ant-design/icons";
import { useGetCourse } from "../hooks/coursesApi";
import dayjs from "dayjs";

const CourseManagementForAdmin = () => {
  const { data, isLoading, error } = useGetCourse();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [statusFilter, setStatusFilter] = useState("all");

  const coursesData = Array.isArray(data?.data?.courses)
    ? data?.data?.courses
    : [];

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesPrice =
      course.course.price >= priceRange[0] &&
      course.course.price <= priceRange[1];
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && course.course.isActive) ||
      (statusFilter === "inactive" && !course.course.isActive);
    return matchesSearch && matchesPrice && matchesStatus;
  });

  const columns = [
    {
      title: "Gia Sư",
      dataIndex: ["account", "fullName"],
      key: "tutorName",
      sorter: (a, b) => a.account.fullName.localeCompare(b.account.fullName),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Tìm tên gia sư"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={confirm}
            style={{ width: "100%", marginBottom: 8, display: "block" }}
          />
          <Button
            onClick={confirm}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Tìm kiếm
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Đặt lại
          </Button>
        </div>
      ),
      onFilter: (value, record) =>
        record.account.fullName.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Khóa Học",
      dataIndex: ["course", "name"],
      key: "courseName",
      sorter: (a, b) => a.course.name.localeCompare(b.course.name),
    },
    {
      title: "Mô Tả",
      dataIndex: ["course", "description"],
      key: "description",
    },
    {
      title: "Giá",
      dataIndex: ["course", "price"],
      key: "price",
      sorter: (a, b) => a.course.price - b.course.price,
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Trạng Thái",
      dataIndex: ["course", "isActive"],
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "volcano"}>
          {isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Ngày Tạo",
      dataIndex: ["course", "createdAt"],
      key: "createdAt",
      sorter: (a, b) =>
        new Date(a.course.createdAt) - new Date(b.course.createdAt),
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Hình Ảnh",
      dataIndex: ["course", "image"],
      key: "image",
      render: (image) => (
        <img src={image} alt="Khóa học" style={{ maxWidth: "100px" }} />
      ),
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Tooltip title="Xem Chi Tiết">
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedCourse(record);
              setIsModalVisible(true);
            }}
            size="small"
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", width: "-webkit-fill-available" }}>
      <div style={{ width: "-webkit-fill-available", padding: 24 }}>
        <h2>Quản Lý Khóa Học</h2>
        {error && <p style={{ color: "red" }}>Lỗi: {error.message}</p>}
        <div
          style={{ display: "flex", gap: 16, marginBottom: 16, marginTop: 16 }}
        >
          <Input
            placeholder="Tìm kiếm tên hoặc mô tả khóa học"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 500 }}
          />
          <Button
            icon={<FilterOutlined />}
            onClick={() => setIsFilterModalVisible(true)}
          >
            Bộ lọc
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={filteredCourses}
          loading={isLoading}
          rowKey={(record) => record.course._id}
          pagination={{ pageSize: 5 }}
        />
        <Modal
          title="Chi Tiết Khóa Học"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={1000}
          style={{ marginTop: "-73px" }}
        >
          {selectedCourse ? (
            <Card>
              <Descriptions column={2} bordered>
                <Descriptions.Item label="Tên Gia Sư">
                  {selectedCourse.account.fullName}
                </Descriptions.Item>
                <Descriptions.Item label="Tên Khóa Học">
                  {selectedCourse.course.name}
                </Descriptions.Item>
                <Descriptions.Item label="Mô Tả" style={{ maxWidth: "280px" }}>
                  {selectedCourse.course.description}
                </Descriptions.Item>
                <Descriptions.Item label="Giá">
                  {selectedCourse.course.price.toLocaleString()} VND
                </Descriptions.Item>
                <Descriptions.Item label="Trạng Thái">
                  {selectedCourse.course.isActive
                    ? "Đang hoạt động"
                    : "Ngừng hoạt động"}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày Tạo">
                  {dayjs(selectedCourse.course.createdAt).format("DD/MM/YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Hình Ảnh" span={2}>
                  <img
                    src={selectedCourse.course.image}
                    alt="Khóa học"
                    style={{ maxWidth: "500px" }}
                  />
                </Descriptions.Item>
              </Descriptions>
            </Card>
          ) : (
            <p>Không có thông tin chi tiết.</p>
          )}
        </Modal>
        <Modal
          title="Lọc Khóa Học"
          open={isFilterModalVisible}
          onCancel={() => setIsFilterModalVisible(false)}
          footer={[
            <Button
              key="apply"
              type="primary"
              onClick={() => setIsFilterModalVisible(false)}
            >
              Áp dụng
            </Button>,
            <Button
              key="reset"
              onClick={() => {
                setPriceRange([0, 10000000]);
                setStatusFilter("all");
                setIsFilterModalVisible(false);
              }}
            >
              Đặt lại
            </Button>,
          ]}
        >
          <div style={{ marginBottom: 16 }}>
            <h3>Khoảng Giá (VND)</h3>
            <Slider
              range
              min={0}
              max={10000000}
              value={priceRange}
              onChange={setPriceRange}
              tipFormatter={(value) => `${value.toLocaleString()} VND`}
            />
            <p>
              Từ {priceRange[0].toLocaleString()} đến{" "}
              {priceRange[1].toLocaleString()} VND
            </p>
          </div>
          <div>
            <h3>Trạng Thái</h3>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 200 }}
            >
              <Select.Option value="all">Tất cả</Select.Option>
              <Select.Option value="active">Đang hoạt động</Select.Option>
              <Select.Option value="inactive">Ngừng hoạt động</Select.Option>
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CourseManagementForAdmin;
