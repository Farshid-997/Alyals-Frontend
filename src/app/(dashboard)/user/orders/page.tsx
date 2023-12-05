'use client';
import UMTable from '@/components/ui/UMTable';
import { useUserOrderIdQuery } from '@/redux/api/orderApi/orderApi';
import { getUserInfo } from '@/services/auth.service';
import { Button, message } from 'antd';
import dayjs from 'dayjs';

export default function OrdersPage() {
  const { userId } = getUserInfo() as any;
  const { data, isLoading } = useUserOrderIdQuery(userId);
  const deleteHandler = async (id: string) => {
    try {
      //   console.log(data);
      const res = await id;
      if (res) {
        message.success('Order Deleted successfully');
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };
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
      title: 'Customer Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
    },

    {
      title: 'Product Status',
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
        return (
          <>
            <Button
              onClick={() => deleteHandler(data.id)}
              type="primary"
              danger
              className="mt-2"
            >
              Cancel
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <p>Your Orders</p>
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
