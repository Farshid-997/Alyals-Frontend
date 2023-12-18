'use client';
import UMTable from '@/components/ui/UMTable';
import { useAllbrandsQuery, useDeletebrandMutation } from '@/redux/api/adminApi/brandApi';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import Link from 'next/link';

function BrandPage() {
  const query: Record<string, any> = {};
  const { data, isLoading } = useAllbrandsQuery(query);
  const [deleteService] = useDeletebrandMutation();
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/manage-brand/edit/${data?.id}`}>
              <Button
                style={{
                  margin: '0px 5px',
                }}
                className="bg-blue-500"
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => deleteHandler(data?.id)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const deleteHandler = async (id: string) => {
   
    try {
     
      await deleteService(id);
      message.success('Brand Deleted successfully');
    } catch (err: any) {
      
      message.error(err.message);
    }
  };
  return (
    <div>
      <h1 className="text-2xl mb-4 text-gray-500 font-bold">Brand Page</h1>
      <Link className="bg-blue-500" href="/admin/manage-brand/create">
        <Button className="bg-blue-500" type="primary">
          Create
        </Button>
      </Link>
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={data}
        showSizeChanger={true}
        showPagination={true}
      />
    </div>
  );
}

export default BrandPage;
