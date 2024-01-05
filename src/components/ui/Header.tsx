"use client"
import { authKey } from "@/constants/storageKey";
import { useGetNotificationByUserIdQuery } from "@/redux/api/notificationApi";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBell } from 'react-icons/fa';
import Notification from "./Notification";
const { Header: AntHeader } = Layout;




const Header = () => {
   const { userId } = getUserInfo() as any;
 
  const [showNotification, setShowNotification] = useState(false);


 const { data, isLoading } =
   useGetNotificationByUserIdQuery(userId);

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];
  const { role } = getUserInfo() as any;
  return (
    <AntHeader
      style={{
        background: '#fff',
      }}
    >
      <Row
        justify="end"
        align="middle"
        style={{
          height: '100%',
        }}
      >
        {/* <Notification/> */}

     
    <FaBell
          className="text-red-700 cursor-pointer "
          size={26}
          style={{ marginRight: '1rem', marginTop: '0.2rem' }}
          onClick={toggleNotification}
        />

        {showNotification && (
          <div className="absolute bottom-3 right-3">
            <Notification></Notification>
          </div>
        )}

        

        <Dropdown menu={{ items }}>
          <a>
            <Space wrap size={12}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;
