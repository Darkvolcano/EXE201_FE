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
  const [experienceRange, setExperienceRange] = useState([0, 10]);
  const [canTeachFilter, setCanTeachFilter] = useState("all");

  const tutorsData = data?.data?.tutors || [];

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
      title: "Gia sư",
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
            placeholder="Tìm theo tên"
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
            Tìm
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Đặt lại
          </Button>
        </div>
      ),
      onFilter: (value, record) =>
        record.tutorName.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Chứng chỉ",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Kinh nghiệm",
      dataIndex: "experience",
      key: "experience",
      sorter: (a, b) => a.experience - b.experience,
      render: (experience) => `${experience} năm`,
    },
    {
      title: "Đã duyệt",
      dataIndex: "isChecked",
      key: "isChecked",
      render: (isChecked) => (isChecked ? <CheckmarkIcon /> : <CrossIcon />),
    },
    {
      title: "Có thể dạy",
      dataIndex: "isCanTeach",
      key: "isCanTeach",
      render: (isCanTeach) => (isCanTeach ? <CheckmarkIcon /> : <CrossIcon />),
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image[0]} alt="Chứng chỉ" style={{ maxWidth: "100px" }} />
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 120,
      align: "center",
      render: (_, record) => (
        <>
          <Tooltip title="Xem chi tiết">
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
              title="Bạn có chắc muốn duyệt chứng chỉ này?"
              onConfirm={() => {
                updateIsCheckedMutation.mutate(
                  { certificationId: record._id },
                  {
                    onSuccess: () => {
                      message.success("Đã duyệt thành công!");
                      refetch();
                    },
                    onError: (err) => {
                      console.error("Cập nhật thất bại:", err);
                      message.error("Không thể cập nhật trạng thái duyệt.");
                    },
                  }
                );
              }}
              okText="Có"
              cancelText="Không"
            >
              <Tooltip title="Duyệt chứng chỉ">
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
              title="Bạn có chắc muốn cho phép dạy?"
              onConfirm={() => {
                updateIsCanTeachMutation.mutate(
                  { certificationId: record._id },
                  {
                    onSuccess: () => {
                      message.success("Đã cập nhật quyền dạy!");
                      refetch();
                    },
                    onError: (err) => {
                      console.error("Cập nhật thất bại:", err);
                      message.error("Không thể cập nhật quyền dạy.");
                    },
                  }
                );
              }}
              okText="Có"
              cancelText="Không"
            >
              <Tooltip title="Cho phép dạy">
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
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "100%", padding: 24 }}>
        <h2>Quản lý Chứng chỉ</h2>
        {error && <p style={{ color: "red" }}>Lỗi: {error.message}</p>}
        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          <Input
            placeholder="Tìm kiếm theo tên hoặc mô tả chứng chỉ"
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
          title="Chi tiết Chứng chỉ"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={1000}
          style={{ top: 20 }}
        >
          {selectedCertificate ? (
            <Card>
              <Descriptions column={2} bordered>
                <Descriptions.Item label="Tên gia sư">
                  {selectedCertificate.tutorName}
                </Descriptions.Item>
                <Descriptions.Item label="Tên chứng chỉ">
                  {selectedCertificate.name}
                </Descriptions.Item>
                <Descriptions.Item label="Mô tả">
                  {selectedCertificate.description}
                </Descriptions.Item>
                <Descriptions.Item label="Kinh nghiệm">
                  {selectedCertificate.experience} năm
                </Descriptions.Item>
                <Descriptions.Item label="Đã duyệt">
                  <Tag
                    color={selectedCertificate.isChecked ? "success" : "error"}
                  >
                    {selectedCertificate.isChecked ? "Có" : "Không"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Có thể dạy">
                  <Tag
                    color={selectedCertificate.isCanTeach ? "success" : "error"}
                  >
                    {selectedCertificate.isCanTeach ? "Có" : "Không"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Hình ảnh" span={2}>
                  <img
                    src={selectedCertificate.image[0]}
                    alt="Chứng chỉ"
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
          title="Bộ lọc chứng chỉ"
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
                setExperienceRange([0, 10]);
                setCanTeachFilter("all");
                setIsFilterModalVisible(false);
              }}
            >
              Đặt lại
            </Button>,
          ]}
        >
          <div style={{ marginBottom: 16 }}>
            <h3>Khoảng kinh nghiệm (năm)</h3>
            <Slider
              range
              min={0}
              max={10}
              value={experienceRange}
              onChange={setExperienceRange}
              tipFormatter={(value) => `${value} năm`}
            />
            <p>
              Từ {experienceRange[0]} đến {experienceRange[1]} năm
            </p>
          </div>
          <div>
            <h3>Trạng thái có thể dạy</h3>
            <Select
              value={canTeachFilter}
              onChange={setCanTeachFilter}
              style={{ width: 200 }}
            >
              <Select.Option value="all">Tất cả</Select.Option>
              <Select.Option value="yes">Có</Select.Option>
              <Select.Option value="no">Không</Select.Option>
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CertificateManagement;
