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

  if (isLoading) return <div className="loading">Đang tải dữ liệu...</div>;
  if (error) return <div className="error">Lỗi: {error.message}</div>;

  const onFinish = (values) => {
    const filteredImages = values.image.filter(
      (url) => url && url.trim() !== ""
    );
    if (filteredImages.length === 0) {
      message.error("Vui lòng nhập ít nhất một URL hình ảnh hợp lệ!");
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
        message.success(data.message || "Tải chứng chỉ thành công!");
        form.resetFields();
        setIsUploadModalVisible(false);
        refetch();
      },
      onError: (error) => {
        message.error(
          error.response?.data?.message ||
            "Tải chứng chỉ thất bại. Vui lòng thử lại."
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
      <h2 className="certifications-title">Chứng chỉ của bạn</h2>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="primary"
          onClick={openUploadModal}
          style={{ marginBottom: 16 }}
          className="upload-button"
        >
          Tải lên chứng chỉ
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
                Xem chi tiết
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
                    Kinh nghiệm: {certificate.experience} năm
                  </p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className="certification-status">
                      Đã kiểm duyệt:{" "}
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
                      Có thể giảng dạy:{" "}
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
        title="Chi tiết chứng chỉ"
        open={isDetailModalVisible}
        onCancel={closeDetailModal}
        footer={null}
        width={800}
        className="certification-modal"
      >
        {selectedCertificate && (
          <Descriptions column={2} bordered style={{ marginTop: 16 }}>
            <Descriptions.Item label="Tên chứng chỉ">
              {selectedCertificate.name}
            </Descriptions.Item>
            <Descriptions.Item label="Kinh nghiệm">
              {selectedCertificate.experience} năm
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả" span={2}>
              {selectedCertificate.description}
            </Descriptions.Item>
            <Descriptions.Item label="Đã kiểm duyệt">
              {selectedCertificate.isChecked ? (
                <CheckCircleOutlined style={{ color: "green", fontSize: 22 }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red", fontSize: 22 }} />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Có thể giảng dạy">
              {selectedCertificate.isCanTeach ? (
                <CheckCircleOutlined style={{ color: "green", fontSize: 22 }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red", fontSize: 22 }} />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {dayjs(selectedCertificate.createdAt).format("DD/MM/YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">
              {dayjs(selectedCertificate.updatedAt).format("DD/MM/YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Hình ảnh" span={2}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {selectedCertificate.image.map((imgUrl, index) => (
                  <Image
                    key={index}
                    alt={`${selectedCertificate.name} - Hình ${index + 1}`}
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
        title="Tải lên chứng chỉ mới"
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
            label="Tên chứng chỉ"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên chứng chỉ!",
              },
            ]}
          >
            <Input placeholder="VD: Chứng chỉ giảng dạy toán học nâng cao" />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea placeholder="VD: Chứng chỉ chuyên sâu về phương pháp giảng dạy toán học" />
          </Form.Item>
          <Form.Item
            label="Đường dẫn hình ảnh"
            required
            className="image-urls-section"
          >
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
                            message: "Vui lòng nhập URL hình ảnh!",
                          },
                          {
                            type: "url",
                            message: "URL không hợp lệ!",
                          },
                        ]}
                      >
                        <Input placeholder="VD: https://example.com/image.jpg" />
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
                      Thêm đường dẫn hình ảnh
                    </Button>
                  )}
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item
            label="Số năm kinh nghiệm"
            name="experience"
            rules={[
              { required: true, message: "Vui lòng nhập số năm kinh nghiệm!" },
              {
                pattern: /^[0-9]+$/,
                message: "Phải là số nguyên!",
              },
            ]}
          >
            <Input placeholder="VD: 5" type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-button">
              Gửi xét duyệt
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TutorCertifications;
