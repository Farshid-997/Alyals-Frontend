'use client';
import ActionBar from '@/components/ui/ActionBar';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import UMTable from '@/components/ui/UMTable';
import { useDeleteuserMutation, useUserQuery } from '@/redux/api/adminApi/userApi';
import { useDebounced } from '@/redux/hooks';
import {
  ReloadOutlined
} from '@ant-design/icons';
import { Button, Input } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
export default function UserPage() {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deleteuser] = useDeleteuserMutation();

  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query['searchTerm'] = debouncedTerm;
  }
  const { data, isLoading } = useUserQuery({ ...query });

  const Users = data?.user;
  const meta = data?.meta;
 
 

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: 'ContactNo',
      dataIndex: 'contactNo',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      render: function (data: any) {
        return data && dayjs(data).format('MMM D, YYYY hh:mm A');
      },
      sorter: true,
    },
    // {
    //   title: 'Action',
    //   render: function (data: any) {
    //     return (
    //       <>
    //         <Button
    //           onClick={() => deleteHandler(data?.id)}
    //           type="primary"
    //           danger
    //         >
    //           <DeleteOutlined />
    //         </Button>
    //       </>
    //     );
    //   },
    // },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
  
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    
    setSortBy(field as string);
    setSortOrder(order === 'ascend' ? 'asc' : 'desc');
  };

  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
    setSearchTerm('');
  };

 

  return (
    <div>
      <div>
        <UMBreadCrumb
          items={[
            {
              label: 'admin',
              link: '/admin',
            },
          ]}
        />
        <ActionBar title="Users">
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '20%',
            }}
          />
          <div>
            {(!!sortBy || !!sortOrder || !!searchTerm) && (
              <Button
                style={{ margin: '0px 5px' }}
                type="primary"
                onClick={resetFilters}
              >
                <ReloadOutlined />
              </Button>
            )}
          </div>
        </ActionBar>



        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={Users}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
    </div>
  );
}
