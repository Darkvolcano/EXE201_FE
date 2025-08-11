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
import { useGetAccount } from "../hooks/accountsApi";

const AccountManagement = () => {
  const { data, isLoading, error } = useGetAccount();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const accountsData = Array.isArray(data?.data?.accounts)
    ? data?.data?.accounts
    : [];

  const filteredAccounts = accountsData.filter((account) => {
    const matchesSearch =
      account.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const columns = [
    {
      title: "Tên",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
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
            Tìm kiếm
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Đặt lại
          </Button>
        </div>
      ),
      onFilter: (value, record) =>
        record.fullName.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <img src={avatar} alt="Ảnh đại diện" style={{ maxWidth: "100px" }} />
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "volcano"}>
          {status === "Active" ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Tooltip title="Xem chi tiết">
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedAccount(record);
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
        <h2 style={{ color: "black" }}>Quản lý Tài khoản</h2>
        {error && <p style={{ color: "red" }}>Lỗi: {error.message}</p>}
        <div
          style={{ display: "flex", gap: 16, marginBottom: 16, marginTop: 16 }}
        >
          <Input
            placeholder="Tìm kiếm tên, email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 500 }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredAccounts}
          loading={isLoading}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 5 }}
        />
        <Modal
          title="Chi tiết Tài khoản"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={1000}
        >
          {selectedAccount ? (
            <Card>
              <Descriptions column={2} bordered>
                <Descriptions.Item label="Tên">
                  {selectedAccount.fullName}
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                  {selectedAccount.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {selectedAccount.email}
                </Descriptions.Item>
                <Descriptions.Item label="Vai trò">
                  {selectedAccount.role}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  {selectedAccount.status === "active"
                    ? "Hoạt động"
                    : "Không hoạt động"}
                </Descriptions.Item>
                <Descriptions.Item label="Ảnh đại diện" span={2}>
                  <img
                    src={selectedAccount.avatar}
                    alt="Ảnh đại diện"
                    style={{ maxWidth: "500px" }}
                  />
                </Descriptions.Item>
              </Descriptions>
            </Card>
          ) : (
            <p>Không có chi tiết nào sẵn có.</p>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AccountManagement;
