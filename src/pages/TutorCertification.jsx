import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Image,
  Descriptions,
  Form,
  message,
  Input,
  Space,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  useGetAllTutorCertifications,
  useTutorRegisterCertificate,
} from "../hooks/tutorsApi";
import "../style/TutorCertification.css";
import dayjs from "dayjs";

const TutorCertifications = () => {
  const { data, isLoading, error, refetch } = useGetAllTutorCertifications();
  const { mutate: registerCertificate } = useTutorRegisterCertificate();
  const [form] = Form.useForm();

  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);

  useEffect(() => {
    if (isUploadModalVisible) {
      form.setFieldsValue({ image: [""] });
    }
  }, [isUploadModalVisible, form]);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const onFinish = (values) => {
    const filteredImages = values.image.filter(
      (url) => url && url.trim() !== ""
    );
    if (filteredImages.length === 0) {
      message.error("Please input at least one valid image URL!");
      return;
    }
    const payload = {
      name: values.name,
      description: values.description,
      image: filteredImages,
      experience: parseInt(values.experience, 10),
    };
    registerCertificate(payload, {
      onSuccess: (data) => {
        message.success(data.message || "Certificate uploaded successfully!");
        form.resetFields();
        setIsUploadModalVisible(false);
        refetch();
      },
      onError: (error) => {
        message.error(
          error.response?.data?.message ||
            "Failed to upload certificate. Please try again."
        );
      },
    });
  };

  const openDetailModal = (certificate) => {
    setSelectedCertificate(certificate);
    setIsDetailModalVisible(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalVisible(false);
    setSelectedCertificate(null);
  };

  const openUploadModal = () => {
    form.resetFields();
    setIsUploadModalVisible(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalVisible(false);
  };

  return (
    <div className="certifications-container">
      <h2 className="certifications-title">Your Certifications</h2>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="primary"
          onClick={openUploadModal}
          style={{ marginBottom: 16 }}
          className="upload-button"
        >
          Upload Certificate
        </Button>
      </div>
      <div className="certifications-grid">
        {data.map((certificate) => (
          <Card
            key={certificate.certificationId}
            hoverable
            cover={
              <Image
                alt={certificate.name}
                src={
                  certificate.image && certificate.image.length > 0
                    ? certificate.image[0]
                    : "https://via.placeholder.com/150"
                }
                className="certification-image"
              />
            }
            actions={[
              <Button
                type="primary"
                onClick={() => openDetailModal(certificate)}
                className="view-details-button"
              >
                View Details
              </Button>,
            ]}
            className="certification-card"
          >
            <Card.Meta
              title={
                <span className="certification-name">{certificate.name}</span>
              }
              description={
                <>
                  <p className="certification-experience">
                    Experience: {certificate.experience} years
                  </p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className="certification-status">
                      Checked:{" "}
                      {certificate.isChecked ? (
                        <CheckCircleOutlined
                          style={{ color: "green", fontSize: 22 }}
                        />
                      ) : (
                        <CloseCircleOutlined
                          style={{ color: "red", fontSize: 22 }}
                        />
                      )}
                    </p>
                    <p className="certification-status">
                      Can Teach:{" "}
                      {certificate.isCanTeach ? (
                        <CheckCircleOutlined
                          style={{ color: "green", fontSize: 22 }}
                        />
                      ) : (
                        <CloseCircleOutlined
                          style={{ color: "red", fontSize: 22 }}
                        />
                      )}
                    </p>
                  </div>
                </>
              }
            />
          </Card>
        ))}
      </div>

      <Modal
        title="Certificate Details"
        open={isDetailModalVisible}
        onCancel={closeDetailModal}
        footer={null}
        width={800}
        className="certification-modal"
      >
        {selectedCertificate && (
          <Descriptions column={2} bordered style={{ marginTop: 16 }}>
            <Descriptions.Item label="Name">
              {selectedCertificate.name}
            </Descriptions.Item>
            <Descriptions.Item label="Experience">
              {selectedCertificate.experience} years
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={2}>
              {selectedCertificate.description}
            </Descriptions.Item>
            <Descriptions.Item label="Checked">
              {selectedCertificate.isChecked ? (
                <CheckCircleOutlined style={{ color: "green", fontSize: 22 }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red", fontSize: 22 }} />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Can Teach">
              {selectedCertificate.isCanTeach ? (
                <CheckCircleOutlined style={{ color: "green", fontSize: 22 }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red", fontSize: 22 }} />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {dayjs(selectedCertificate.createdAt).format("DD/MM/YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {dayjs(selectedCertificate.updatedAt).format("DD/MM/YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Image">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {selectedCertificate.image.map((imgUrl, index) => (
                  <Image
                    key={index}
                    alt={`${selectedCertificate.name} - Image ${index + 1}`}
                    src={imgUrl}
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                ))}
              </div>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        title="Upload New Certificate"
        open={isUploadModalVisible}
        onCancel={closeUploadModal}
        footer={null}
        width={600}
        className="upload-modal"
      >
        <Form
          name="upload-certificate"
          layout="vertical"
          onFinish={onFinish}
          form={form}
          className="upload-form"
        >
          <Form.Item
            label="Certificate Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the certificate name!",
              },
            ]}
          >
            <Input placeholder="e.g., AWS Certified Solutions Architect" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea placeholder="e.g., Professional certification for cloud architecture" />
          </Form.Item>
          <Form.Item label="Image URLs" required className="image-urls-section">
            <Form.List name="image">
              {(fields, { add }) => (
                <>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                      className="image-input-wrapper"
                    >
                      <Form.Item
                        {...field}
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: "Please input an image URL!",
                          },
                          {
                            type: "url",
                            message: "Please input a valid URL!",
                          },
                        ]}
                      >
                        <Input placeholder="e.g., https://example.com/cert1.jpg" />
                      </Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                        className="add-image-button"
                      />
                    </Space>
                  ))}
                  {fields.length === 0 && (
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      className="add-image-button"
                      style={{ width: "100%" }}
                    >
                      Add Image URL
                    </Button>
                  )}
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item
            label="Years of Experience"
            name="experience"
            rules={[
              { required: true, message: "Please input your experience!" },
              {
                pattern: /^[0-9]+$/,
                message: "Experience must be a number!",
              },
            ]}
          >
            <Input placeholder="e.g., 5" type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-button">
              Submit for Review
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TutorCertifications;
