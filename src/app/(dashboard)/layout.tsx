"use client";
import Contents from "@/components/ui/Contents";
import SideBar from "@/components/ui/Sidebar";
import { isLoggedIn } from "@/services/auth.service";
import { LoadingOutlined } from '@ant-design/icons';
import { Layout, Row, Space, Spin } from "antd";
import { redirect } from "next/navigation";
import { useLayoutEffect, useState } from "react";



export default function DashboardLayout({

  children,
}: {
  children: React.ReactNode;
}) {

   
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

  useLayoutEffect(() => {
    const isLoggedin = isLoggedIn();
    if (!isLoggedin) {
      redirect('/login');
    }
  }, []);


  
  if (!isLoading) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{
          height: '100vh',
        }}
      >
        <Space>
          <Spin indicator={antIcon} />;
        </Space>
      </Row>
    );
  }
  return (
    <>
      <Layout hasSider>
        <SideBar />
        <Contents>{children}</Contents>
      </Layout>
    </>
  );
}
