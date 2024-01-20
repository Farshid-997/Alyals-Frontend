'use client';
import { useGetProductCheckoutsForDayQuery } from '@/redux/api/orderApi/orderApi';
import { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
export default function Analysis() {
  const ref = useRef();
  const { data, error, isLoading } = useGetProductCheckoutsForDayQuery({});
  const chartData3 = {
    labels:
      data?.map((d: any) => new Date(d?.createdAt).toLocaleDateString()) || [],
    datasets: [
      {
        label: 'Product Sell Count',
        data: data?.map((d: any) => d.count) || [],
        borderColor: 'green',
        fill: false,
      },
    ],
  };
  return (
    <div >
      <Bar ref={ref} data={chartData3} redraw={true} />
    </div>
  );
}
