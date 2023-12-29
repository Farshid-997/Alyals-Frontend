import { authKey } from "@/constants/storageKey";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBell } from 'react-icons/fa';
const { Header: AntHeader } = Layout;


const Header = () => {
  const [show, setShow] = useState(false);
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
        <FaBell className="text-blue-900 cursor-pointer " />
        
        <p
          style={{
            margin: '0px 5px',
          }}
          className="text-blue-900 font-semibold font-sans"
        >
          {role.toUpperCase()}
        </p>

        <Dropdown menu={{ items }}>
          <a>
            <Space wrap size={16}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;
