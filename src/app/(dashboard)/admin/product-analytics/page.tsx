'use client';
import Loading from '@/app/loading';
import { useGetProductCheckoutsForDayQuery } from '@/redux/api/orderApi/orderApi';
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';
interface ProductItem {
  createdAt: Date;
  count: number;
}

function ProductAnalysis() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const { data, error, isLoading } = useGetProductCheckoutsForDayQuery({});

  


  const createChart = (data: ProductItem[]) => {
    const ctx = chartRef?.current?.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels:
            data?.map((d) => new Date(d?.createdAt).toLocaleDateString()) || [],
          datasets: [
            {
              label: 'Product Count',
              data: data?.map((d) => d.count) || [],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 0,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
          layout: {
            padding: {
              left: 5,
              right: 5,
              top: 0,
              bottom: 0,
            },
          },
          // @ts-ignore
          barPercentage: 0.8,
          categoryPercentage: 0.8,
          barThickness: 200,
          
        },
      });
    }
  };

  const destroyChart = () => {
    if (chartRef.current) {
      if ((chartRef.current as any).destroy) {
        (chartRef.current as any).destroy();
      } else {
        const chartInstance = chartRef.current as any;
        chartInstance.data = {};
      }
    }
  };

  useEffect(() => {
   
    destroyChart();

    if (data) {
     
     
      createChart(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <h1 className="text-blue-900 text-center text-3xl font-semibold font-sans ">
        Analytics
      </h1>

      <canvas ref={chartRef} width={800} height={400} />
    </>
  );
}

export default ProductAnalysis;
