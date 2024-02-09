'use client';
import UMTable from '@/components/ui/UMTable';
import { useUserOrderIdQuery } from '@/redux/api/orderApi/orderApi';
import { getUserInfo } from '@/services/auth.service';
import Link from 'next/link';

export default function OrdersPage() {
  const { userId } = getUserInfo() as any;
  const { data, isLoading } = useUserOrderIdQuery(userId);

  const base = 'user';

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
      title: 'Review',
      render: function (data: any, record: any) {
        if (record?.status === 'delivered') {
          return (
            <Link href={`/${base}/review`}>
              <p className="font-sans text-md text-blue-900">Review</p>{' '}
            </Link>
          );
        } else {
          return 'N/A';
        }
      },
    },
  ];

  const hasDeliveredOrders =
    data && data?.some((order: any) => order?.status === 'delivered');

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-black text-xl mb-4">Your Orders</p>
      
      </div>

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
