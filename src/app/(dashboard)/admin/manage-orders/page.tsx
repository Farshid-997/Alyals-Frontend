'use client';
import ActionBar from '@/components/ui/ActionBar';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import UMTable from '@/components/ui/UMTable';
import {
  useOrdersQuery,
  useUpdateorderMutation
} from '@/redux/api/orderApi/orderApi';

import { useDebounced } from '@/redux/hooks';
import { ReloadOutlined } from '@ant-design/icons';
import { Button, Input, Select, message } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

enum OrderStatus {
  pending = 'pending',
  confirmed = 'confirmed',
  shipped = 'shipped',
  delivered = 'delivered',
  canceled = 'canceled',
}

export default function OrderPage() {
  const query: Record<string, any> = {};
  const [updateOrder] = useUpdateorderMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

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
  const { data, isLoading } = useOrdersQuery({ ...query });

  const products = data?.orders;
  const meta = data?.meta;

  const { Option } = Select;

  const orderStatusOptions = Object.values(OrderStatus);

  const filteredProducts = products?.filter(
    (product:any) => product.status !== OrderStatus.canceled
  );

  const columns = [
    {
      title: 'Product',
      dataIndex: 'orderProduct',
      render: function (data: any, record: any) {
        if (record.orderProduct) {
          const productDetails = record.orderProduct.map(
            (product: any, index: number) => (
              <div key={index}>
                {product.product.name}
                <span
                  style={{
                    color: 'blue',
                    fontWeight: 'bold',
                    marginLeft: '3px',
                  }}
                >
                  (Q:{product.quantity})
                </span>
              </div>
            )
          );
          return productDetails;
        } else {
          return 'N/A';
        }
      },
    },
    {
      title: 'Customer Name',
      dataIndex: 'firstName' + ' ' + 'lastName', // Concatenating first name and last name
      render: (data: any, record: any) => {
        return `${record.firstName} ${record.lastName}`; // Rendering first name and last name together
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Customer Address',
      dataIndex: 'address', // Concatenating first name and last name
      render: (data: any, record: any) => {
        return `${record.address}, ${record.city}-${record.postcode}`; // Rendering first name and last name together
      },
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      render: function (data: any) {
        return data && dayjs(data).format('MMM D, YYYY hh:mm A');
      },
    },
    {
      title: 'Action',
      render: function (data: any) {
        const handleStatusChange = async (selectedStatus: any) => {
          const id = data?.id;
          const updatedObject = {
            id,
            body: {
              status: selectedStatus,
            },
          };
          const res = await updateOrder(updatedObject).unwrap();
          if (res.id) {
            message.success('Order status updated successfully');
          }
        };

        return (
          <div className='flex flex-row justify-between ml-2'>
            <Select
              defaultValue={data.status}
              onChange={handleStatusChange}
              
            >
              {orderStatusOptions.map((status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>

           
          </div>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    
    setPage(page);
    setSize(pageSize);
  };
  
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
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
        <ActionBar title="Orders">
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '20%',
            }}
          />
          <div >
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
          dataSource={filteredProducts}
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
