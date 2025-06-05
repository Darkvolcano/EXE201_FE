import React, { useState } from "react";
import { Form, Input, Button, Upload, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useProfileUser, useEditProfileUser } from "../hooks/ProfileApi";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import "../style/ProfileUser.css";

const { Title, Text } = Typography;

const EditProfileUser = () => {
  const [form] = Form.useForm();
  const { data, isLoading, error } = useProfileUser();
  const { mutate: updateProfile, isPending } = useEditProfileUser();
  const [avatarBase64, setAvatarBase64] = useState(null);

  const handleAvatarChange = ({ fileList }) => {
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      const reader = new FileReader();
      reader.onload = () => setAvatarBase64(reader.result);
      reader.onerror = () => message.error("Failed to read the file");
      reader.readAsDataURL(file);
    } else {
      setAvatarBase64(null);
    }
  };

  const onFinish = (values) => {
    updateProfile({
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      avatar: avatarBase64 || data?.avatar,
    });
  };

  const handleCancel = () => {
    navigate("/profile-user");
  };

  if (isLoading) return (
    <div className="profile-container">
      <LoadingSpinner />
    </div>
  );
  if (error) return (
    <div className="profile-container">
      <ErrorMessage message="Error loading profile" />
    </div>
  );

  return (
    <>
      <div className="profile-container">
        <div className="profile-card">
          <Title level={2} className="profile-title">
            Edit Profile
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="profile-form"
            initialValues={{
              fullName: data?.fullName,
              email: data?.email,
              phone: data?.phone,
            }}
          >
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Please input your full name!" }]}
            >
              <Input placeholder="Enter your full name" size="large" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Enter your email" size="large" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
                { pattern: /^[0-9]{10,15}$/, message: "Please enter a valid phone number!" },
              ]}
            >
              <Input placeholder="Enter your phone number" size="large" />
            </Form.Item>
            <Form.Item label="Avatar" name="avatar">
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
                accept="image/*"
                onChange={handleAvatarChange}
                defaultFileList={
                  data?.avatar ? [{ uid: "-1", name: "Current Avatar", url: data.avatar }] : []
                }
              >
                <Button icon={<UploadOutlined />}>Upload Avatar</Button>
              </Upload>
            </Form.Item>
            <div className="profile-form-buttons">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="profile-button"
                loading={isPending}
              >
                Save Changes
              </Button>
              <Button
                size="large"
                className="profile-button-cancel"
                onClick={handleCancel}
                style={{ marginLeft: 10 }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditProfileUser;