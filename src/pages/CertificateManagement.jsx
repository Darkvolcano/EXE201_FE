import React, { useState } from "react";
import {
  Table,
  Tag,
  Modal,
  Button,
  Tooltip,
  Popconfirm,
  message,
  Card,
  Descriptions,
  Input,
  Slider,
  Select,
} from "antd";
import { EyeOutlined, CheckOutlined, FilterOutlined } from "@ant-design/icons";
import {
  useGetAllTutors,
  useUpdateIsChecked,
  useUpdateIsCanTeach,
} from "../hooks/tutorsApi";
import CheckmarkIcon from "../components/CheckmarkIcon";
import CrossIcon from "../components/CrossIcon";

const CertificateManagement = () => {
  const { data, isLoading, error, refetch } = useGetAllTutors();
  const updateIsCheckedMutation = useUpdateIsChecked();
  const updateIsCanTeachMutation = useUpdateIsCanTeach();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [experienceRange, setExperienceRange] = useState([0, 10]); // Default range: 0 to 10 years
  const [canTeachFilter, setCanTeachFilter] = useState("all"); // "all", "yes", "no"

  const tutorsData = data?.data?.tutors || [];

  // Flatten and filter the data
  const certificateData = tutorsData
    .filter((tutor) => tutor.certifications && tutor.certifications.length > 0)
    .flatMap((tutor) =>
      tutor.certifications.map((cert) => ({
        ...cert,
        tutorName: tutor.account.fullName,
        tutorId: tutor.account._id,
      }))
    )
    .filter((cert) => {
      const matchesSearch =
        cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesExperience =
        cert.experience >= experienceRange[0] &&
        cert.experience <= experienceRange[1];
      const matchesCanTeach =
        canTeachFilter === "all" ||
        (canTeachFilter === "yes" && cert.isCanTeach) ||
        (canTeachFilter === "no" && !cert.isCanTeach);
      return matchesSearch && matchesExperience && matchesCanTeach;
    });

  const columns = [
    {
      title: "Tutor Name",
      dataIndex: "tutorName",
      key: "tutorName",
      sorter: (a, b) => a.tutorName.localeCompare(b.tutorName),
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
        record.tutorName.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Certificate Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
      sorter: (a, b) => a.experience - b.experience,
      render: (experience) => `${experience} years`,
    },
    {
      title: "Checked",
      dataIndex: "isChecked",
      key: "isChecked",
      render: (isChecked) => (isChecked ? <CheckmarkIcon /> : <CrossIcon />),
    },
    {
      title: "Teach",
      dataIndex: "isCanTeach",
      key: "isCanTeach",
      render: (isCanTeach) => (isCanTeach ? <CheckmarkIcon /> : <CrossIcon />),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image[0]} alt="Certificate" style={{ maxWidth: "100px" }} />
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      align: "center",
      render: (_, record) => (
        <>
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedCertificate(record);
                setIsModalVisible(true);
              }}
              style={{
                marginRight: 8,
                borderColor: "transparent",
                outline: "none",
              }}
            />
          </Tooltip>
          {!record.isChecked && (
            <Popconfirm
              title="Are you sure to update isChecked to true?"
              onConfirm={() => {
                updateIsCheckedMutation.mutate(
                  { certificationId: record._id },
                  {
                    onSuccess: () => {
                      message.success("isChecked updated successfully!");
                      refetch();
                    },
                    onError: (err) => {
                      console.error("Failed to update isChecked:", err);
                      message.error("Failed to update isChecked.");
                    },
                  }
                );
              }}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Update isChecked">
                <Button
                  icon={<CheckOutlined />}
                  style={{
                    marginRight: 8,
                    borderColor: "transparent",
                    outline: "none",
                  }}
                />
              </Tooltip>
            </Popconfirm>
          )}
          {record.isChecked && !record.isCanTeach && (
            <Popconfirm
              title="Are you sure to update isCanTeach to true?"
              onConfirm={() => {
                updateIsCanTeachMutation.mutate(
                  { certificationId: record._id },
                  {
                    onSuccess: () => {
                      message.success("isCanTeach updated successfully!");
                      refetch();
                    },
                    onError: (err) => {
                      console.error("Failed to update isCanTeach:", err);
                      message.error("Failed to update isCanTeach.");
                    },
                  }
                );
              }}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Update isCanTeach">
                <Button
                  icon={<CheckOutlined />}
                  style={{ borderColor: "transparent", outline: "none" }}
                />
              </Tooltip>
            </Popconfirm>
          )}
        </>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", width: "-webkit-fill-available" }}>
      <div style={{ width: "-webkit-fill-available", padding: 24 }}>
        <h2>Certificate Management</h2>
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        <div
          style={{ display: "flex", gap: 16, marginBottom: 16, marginTop: 16 }}
        >
          <Input
            placeholder="Search certificate name, description"
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
          dataSource={certificateData}
          loading={
            isLoading ||
            updateIsCheckedMutation.isLoading ||
            updateIsCanTeachMutation.isLoading
          }
          rowKey={(record) => record._id}
          pagination={{ pageSize: 5 }}
        />
        <Modal
          title="Certificate Details"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={1000}
          style={{ top: 20 }}
        >
          {selectedCertificate ? (
            <Card>
              <Descriptions column={2} bordered>
                <Descriptions.Item label="Tutor Name">
                  {selectedCertificate.tutorName}
                </Descriptions.Item>
                <Descriptions.Item label="Certificate Name">
                  {selectedCertificate.name}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Description"
                  style={{ maxWidth: "280px" }}
                >
                  <div>{selectedCertificate.description}</div>
                </Descriptions.Item>
                <Descriptions.Item label="Experience">
                  {selectedCertificate.experience} years
                </Descriptions.Item>
                <Descriptions.Item label="Checked">
                  <Tag
                    color={selectedCertificate.isChecked ? "success" : "error"}
                  >
                    {selectedCertificate.isChecked ? "Yes" : "No"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Can Teach">
                  <Tag
                    color={selectedCertificate.isCanTeach ? "success" : "error"}
                  >
                    {selectedCertificate.isCanTeach ? "Yes" : "No"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Image" span={2}>
                  <img
                    src={selectedCertificate.image[0]}
                    alt="Certificate"
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
          title="Filter Certificates"
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
                setExperienceRange([0, 10]);
                setCanTeachFilter("all");
                setIsFilterModalVisible(false);
              }}
            >
              Reset
            </Button>,
          ]}
        >
          <div style={{ marginBottom: 16 }}>
            <h3>Experience Range (years)</h3>
            <Slider
              range
              min={0}
              max={10}
              value={experienceRange}
              onChange={setExperienceRange}
              tipFormatter={(value) => `${value} years`}
            />
            <p>
              Range: {experienceRange[0]} - {experienceRange[1]} years
            </p>
          </div>
          <div>
            <h3>Can Teach</h3>
            <Select
              value={canTeachFilter}
              onChange={setCanTeachFilter}
              style={{ width: 200 }}
            >
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="yes">Yes</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CertificateManagement;
