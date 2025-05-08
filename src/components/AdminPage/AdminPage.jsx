import React, { useState } from "react";
import { Layout, Menu } from "antd";

import MovieManagement from "../Manager/MovieManagement/MovieManagement";
import UserManagement from "../Manager/UserManegement/UserManagement";
const { Sider, Content } = Layout;

export default function AdminPage() {
  const [selectedKey, setSelectedKey] = useState("movies");

  const renderContent = () => {
    switch (selectedKey) {
      case "movies":
        return <MovieManagement />;
      case "users":
        return <UserManagement />;
      default:
        return <p>Chọn mục quản lý từ bên trái</p>;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="vertical"
          defaultSelectedKeys={["movies"]}
          onClick={(e) => setSelectedKey(e.key)}
          selectedKeys={[selectedKey]}
        >
          <Menu.Item key="movies">Movies Management</Menu.Item>
          <Menu.Item key="users">Users Management</Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: "24px" }}>
        <Content
          style={{
            background: "#f5f5f5",
            padding: 24,
            minHeight: 280,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}
