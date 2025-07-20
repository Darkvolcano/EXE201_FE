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
      title: "Name",
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
            Search
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Reset
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <img src={avatar} alt="Avatar" style={{ maxWidth: "100px" }} />
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "volcano"}>
          {status === "Active" ? "Active" : "Inactive"}
        </Tag>
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
        <h2>Account Management</h2>
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        <div
          style={{ display: "flex", gap: 16, marginBottom: 16, marginTop: 16 }}
        >
          <Input
            placeholder="Search name, email"
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
          title="Account Details"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={1000}
        >
          {selectedAccount ? (
            <Card>
              <Descriptions column={2} bordered>
                <Descriptions.Item label="Name">
                  {selectedAccount.fullName}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  {selectedAccount.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {selectedAccount.email}
                </Descriptions.Item>
                <Descriptions.Item label="Role">
                  {selectedAccount.role}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {selectedAccount.status === "active" ? "Active" : "Inactive"}
                </Descriptions.Item>
                <Descriptions.Item label="Avatar" span={2}>
                  <img
                    src={selectedAccount.avatar}
                    alt="Avatar"
                    style={{ maxWidth: "500px" }}
                  />
                </Descriptions.Item>
              </Descriptions>
            </Card>
          ) : (
            <p>No details available.</p>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AccountManagement;
