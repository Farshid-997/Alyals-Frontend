import { ProfileOutlined, TableOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Link from 'next/link';
import { USER_ROLE } from './role';
export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps['items'] = [
    {
      label: 'Profile',
      key: 'profile',
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps['items'] = [
    {
      label: <Link href={`/${role}/manage-product`}>Manage Product</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-product`,
    },
    {
      label: <Link href={`/${role}/manage-category`}>Manage Category</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-category`,
    },

    {
      label: <Link href={`/${role}/manage-brand`}>Manage Brand</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-brand`,
    },

    {
      label: <Link href={`/${role}/manage-user`}>Manage Users</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-user`,
    },
    {
      label: <Link href={`/${role}/manage-review`}>Manage Reviews</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-review`,
    },

    {
      label: <Link href={`/${role}/manage-orders`}>Manage Orders</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-orders`,
    },

    {
      label: (
        <Link href={`/${role}/manage-notification/create`}>manage Notification</Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/manage-notification`,
    },

    {
      label: <Link href={`/${role}/product-analytics`}>Product Analysis</Link>,
      icon: <TableOutlined />,
      key: `/${role}/product-analytics`,
    },
  ];

  const adminSidebarItems: MenuProps['items'] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
   
  ];

  const superAdminSidebarItems: MenuProps['items'] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/manage-admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-admin`,
    },
    ...commonAdminSidebarItems,
  ];

  const userSidebarItems: MenuProps['items'] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/orders`}>Orders</Link>,
      icon: <TableOutlined />,
      key: `/${role}/orders`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
