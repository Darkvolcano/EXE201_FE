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

const CourseManagement = () => {
  const { data, isLoading, error } = useGetCourse(); // Updated hook
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]); // Default range: 0 to 10,000,000 VND
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "active", "inactive"

  // Access the courses array under data.data.courses
  const coursesData = Array.isArray(data?.data?.courses)
    ? data?.data?.courses
    : [];

  // Filter courses based on search term, price range, and status
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
      title: "Tutor Name",
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
            Search
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) =>
        record.account.fullName.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Course Name",
      dataIndex: ["course", "name"],
      key: "courseName",
      sorter: (a, b) => a.course.name.localeCompare(b.course.name),
    },
    {
      title: "Description",
      dataIndex: ["course", "description"],
      key: "description",
    },
    {
      title: "Price",
      dataIndex: ["course", "price"],
      key: "price",
      sorter: (a, b) => a.course.price - b.course.price,
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Status",
      dataIndex: ["course", "isActive"],
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "volcano"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: ["course", "createdAt"],
      key: "createdAt",
      sorter: (a, b) =>
        new Date(a.course.createdAt) - new Date(b.course.createdAt),
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Image",
      dataIndex: ["course", "image"],
      key: "image",
      render: (image) => (
        <img src={image} alt="Course" style={{ maxWidth: "100px" }} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Tooltip title="View Details">
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
        <h2>Course Management</h2>
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        <div
          style={{ display: "flex", gap: 16, marginBottom: 16, marginTop: 16 }}
        >
          <Input
            placeholder="Search course name, description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 500 }}
          />
          <Button
            icon={<FilterOutlined />}
            onClick={() => setIsFilterModalVisible(true)}
          >
            Filter
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
          title="Course Details"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={1000}
        >
          {selectedCourse ? (
            <Card>
              <Descriptions column={2} bordered>
                <Descriptions.Item label="Tutor Name">
                  {selectedCourse.account.fullName}
                </Descriptions.Item>
                <Descriptions.Item label="Course Name">
                  {selectedCourse.course.name}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Description"
                  style={{ maxWidth: "280px" }}
                >
                  {selectedCourse.course.description}
                </Descriptions.Item>
                <Descriptions.Item label="Price">
                  {selectedCourse.course.price.toLocaleString()} VND
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {selectedCourse.course.isActive ? "Active" : "Inactive"}
                </Descriptions.Item>
                <Descriptions.Item label="Created At">
                  {dayjs(selectedCourse.course.createdAt).format("DD/MM/YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Image" span={2}>
                  <img
                    src={selectedCourse.course.image}
                    alt="Course"
                    style={{ maxWidth: "500px" }}
                  />
                </Descriptions.Item>
              </Descriptions>
            </Card>
          ) : (
            <p>No details available.</p>
          )}
        </Modal>
        <Modal
          title="Filter Courses"
          open={isFilterModalVisible}
          onCancel={() => setIsFilterModalVisible(false)}
          footer={[
            <Button
              key="apply"
              type="primary"
              onClick={() => setIsFilterModalVisible(false)}
            >
              Apply
            </Button>,
            <Button
              key="reset"
              onClick={() => {
                setPriceRange([0, 10000000]);
                setStatusFilter("all");
                setIsFilterModalVisible(false);
              }}
            >
              Reset
            </Button>,
          ]}
        >
          <div style={{ marginBottom: 16 }}>
            <h3>Price Range (VND)</h3>
            <Slider
              range
              min={0}
              max={10000000}
              value={priceRange}
              onChange={setPriceRange}
              tipFormatter={(value) => `${value.toLocaleString()} VND`}
            />
            <p>
              Range: {priceRange[0].toLocaleString()} -{" "}
              {priceRange[1].toLocaleString()} VND
            </p>
          </div>
          <div>
            <h3>Status</h3>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 200 }}
            >
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CourseManagement;
