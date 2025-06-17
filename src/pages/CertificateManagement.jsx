import React, { useState } from "react";
import { Table, Tag, Modal, Button, Tooltip, Popconfirm, message } from "antd";
import { EyeOutlined, CheckOutlined } from "@ant-design/icons";
import {
  useGetAllTutors,
  useUpdateIsChecked,
  useUpdateIsCanTeach,
} from "../hooks/tutorsApi";
import SidebarAdmin from "../components/SidebarAdmin";

const CertificateManagement = () => {
  const { data, isLoading, error, refetch } = useGetAllTutors();
  const updateIsCheckedMutation = useUpdateIsChecked();
  const updateIsCanTeachMutation = useUpdateIsCanTeach();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const tutorsData = data?.data?.tutors || [];

  // Flatten the data to create a row for each certificate
  const certificateData = tutorsData
    .filter((tutor) => tutor.certifications && tutor.certifications.length > 0)
    .flatMap((tutor) =>
      tutor.certifications.map((cert) => ({
        ...cert,
        tutorName: tutor.account.fullName,
        tutorId: tutor.account._id,
      }))
    );

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
      title: "Can Teach",
      dataIndex: "isCanTeach",
      key: "isCanTeach",
      render: (isCanTeach) => (isCanTeach ? "Yes" : "No"),
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
      render: (_, record) => (
        <>
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedCertificate(record);
                setIsModalVisible(true);
              }}
              size="small"
              style={{ marginRight: 8 }}
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
                  size="small"
                  style={{ marginRight: 8 }}
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
                <Button icon={<CheckOutlined />} size="small" />
              </Tooltip>
            </Popconfirm>
          )}
        </>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, padding: 24 }}>
        <h2>Certificate Management</h2>
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
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
        >
          {selectedCertificate ? (
            <div>
              <p>
                <strong>Tutor Name:</strong> {selectedCertificate.tutorName}
              </p>
              <p>
                <strong>Certificate Name:</strong> {selectedCertificate.name}
              </p>
              <p>
                <strong>Description:</strong> {selectedCertificate.description}
              </p>
              <p>
                <strong>Experience:</strong> {selectedCertificate.experience}{" "}
                years
              </p>
              <p>
                <strong>Can Teach:</strong>{" "}
                {selectedCertificate.isCanTeach ? "Yes" : "No"}
              </p>
              <p>
                <strong>Image:</strong>{" "}
                <img
                  src={selectedCertificate.image[0]}
                  alt="Certificate"
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

export default CertificateManagement;
