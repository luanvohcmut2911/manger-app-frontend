import React from "react";
import {} from "@ant-design/icons";
import { Layout } from "antd";
import SideBar from "../Component/SideBar";
import Content from "../Component/Content";
export default function HomePage() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Content />
    </Layout>
  );
}
