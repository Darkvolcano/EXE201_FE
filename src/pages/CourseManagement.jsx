import React, { useState } from "react";
import { Table, Tag, Modal, Button, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useGetCourse } from "../hooks/coursesApi";

const CourseManagement = () => {
  const { data, isLoading, error } = useGetCourse(); // Updated hook
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Access the courses array under data.data.courses
  const coursesData = Array.isArray(data?.data?.courses)
    ? data?.data?.courses
    : [];

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
          <input
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
      render: (date) => new Date(date).toLocaleDateString(),
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
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, padding: 24 }}>
        <h2>Course Management</h2>
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        <Table
          columns={columns}
          dataSource={coursesData}
          loading={isLoading}
          rowKey={(record) => record.course._id}
          pagination={{ pageSize: 5 }}
        />
        <Modal
          title="Course Details"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          {selectedCourse ? (
            <div>
              <p>
                <strong>Tutor Name:</strong> {selectedCourse.account.fullName}
              </p>
              <p>
                <strong>Course Name:</strong> {selectedCourse.course.name}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedCourse.course.description}
              </p>
              <p>
                <strong>Price:</strong>{" "}
                {selectedCourse.course.price.toLocaleString()} VND
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedCourse.course.isActive ? "Active" : "Inactive"}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedCourse.course.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Image:</strong>{" "}
                <img
                  src={selectedCourse.course.image}
                  alt="Course"
                  style={{ maxWidth: "100%" }}
                />
              </p>
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CourseManagement;
