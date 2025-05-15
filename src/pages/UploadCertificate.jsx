import React, { useState } from "react";
import { Form, Input, Button, Steps, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import "../style/UploadCertificate.css";
import { useTutorRegisterCertificate } from "../hooks/tutorsApi";

const { Title, Text } = Typography;
const { Step } = Steps;

const UploadCertificate = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: [""],
    experience: "",
  });
  const [approvalResult, setApprovalResult] = useState(null);
  const [form] = Form.useForm();

  const { mutate: registerCertificate } = useTutorRegisterCertificate();

  const onFinish = (values) => {
    const filteredImages = values.image.filter(
      (url) => url && url.trim() !== ""
    );
    const payload = {
      name: values.name,
      description: values.description,
      image: filteredImages,
      experience: parseInt(values.experience, 10),
    };
    setFormData(payload);
    setStep(2);
    registerCertificate(payload, {
      onSuccess: (data) => {
        setApprovalResult({
          status: data.status || 200,
          approved: data.approved !== undefined ? data.approved : true,
          message: data.message || "Certificate approved successfully!",
        });
        setStep(3);
      },
      onError: (error) => {
        setApprovalResult({
          status: error.response?.status || 400,
          approved: false,
          message:
            error.response?.data?.message ||
            "Certificate rejected due to invalid credentials.",
        });
        setStep(3);
      },
    });
  };

  const handleAddImageField = () => {
    const currentImages = form.getFieldValue("image") || [""];
    form.setFieldsValue({
      image: [...currentImages, ""],
    });
    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, ""],
    }));
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else navigate("/courses");
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <Title level={2} className="upload-title">
          Upload Certificate
        </Title>
        <div className="steps-container">
          <Steps
            current={step - 1}
            className="upload-steps"
            labelPlacement="vertical"
          >
            <Step title="Enter Details" />
            <Step title="Waiting Approval" />
            <Step title="Result" />
          </Steps>
        </div>
        <div className="step-content">
          {step === 1 && (
            <Form
              name="upload-certificate"
              layout="vertical"
              onFinish={onFinish}
              initialValues={formData}
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
              {/* <Form.List name="image">
                {(fields, { add }) => (
                  <>
                    {fields.map((field, index) => (
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
                              required: index === 0,
                              message: "Please input at least one image URL!",
                            },
                            {
                              type: "url",
                              message: "Please input a valid URL!",
                            },
                          ]}
                        >
                          <Input placeholder="e.g., https://example.com/cert1.jpg" />
                        </Form.Item>
                        {index === fields.length - 1 && (
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                              handleAddImageField();
                            }}
                            icon={<PlusOutlined />}
                            className="add-image-button"
                          />
                        )}
                      </Space>
                    ))}
                  </>
                )}
              </Form.List> */}
              <Form.Item
                label="Image URLs"
                required
                className="image-urls-section"
              >
                <Form.List name="image">
                  {(fields, { add }) => (
                    <>
                      {fields.map((field, index) => (
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
                                required: index === 0,
                                message: "Please input at least one image URL!",
                              },
                              {
                                type: "url",
                                message: "Please input a valid URL!",
                              },
                            ]}
                          >
                            <Input placeholder="e.g., https://example.com/cert1.jpg" />
                          </Form.Item>
                          {index === fields.length - 1 && (
                            <Button
                              type="dashed"
                              onClick={() => {
                                add();
                                handleAddImageField();
                              }}
                              icon={<PlusOutlined />}
                              className="add-image-button"
                            />
                          )}
                        </Space>
                      ))}
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className="submit-button"
                >
                  Submit for Review
                </Button>
              </Form.Item>
            </Form>
          )}
          {step === 2 && (
            <div className="waiting-step">
              <Text className="waiting-text">
                Waiting for admin to verify your certificate...
              </Text>
              <Button className="back-button" onClick={handleBack}>
                Back
              </Button>
            </div>
          )}
          {step === 3 && approvalResult && (
            <div className="result-step">
              <Text className="result-text">
                {approvalResult.approved ? "Approved" : "Rejected"}:{" "}
                {approvalResult.message}
              </Text>
              <Button
                type="primary"
                className="done-button"
                onClick={() => navigate("/courses")}
              >
                Done
              </Button>
              <Button className="back-button" onClick={handleBack}>
                Back
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadCertificate;
