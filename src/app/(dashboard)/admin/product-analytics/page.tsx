// pages/index.js
'use client';
import Loading from '@/app/loading';
import { useGetProductCheckoutsForRangeQuery } from '@/redux/api/orderApi/orderApi';
import { ChangeEvent, Key, useState } from 'react';

function ProductAnalysis() {
  const [selectedRange, setSelectedRange] = useState<RangeOption>('today');
  type RangeOption = 'today' | 'last7days';

  const handleRangeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRange(event.target.value as RangeOption);
  };

  const {
    data: productCheckouts,
    isLoading,
    isError,
  } = useGetProductCheckoutsForRangeQuery({
    startDate: getStartDate(selectedRange).toISOString(),
    endDate: getEndDate(selectedRange).toISOString(),
  });
console.log("data", productCheckouts)
  
  function getStartDate(range: RangeOption) {
    // Implement logic to determine the start date based on the selected range
    if (range === 'today') {
      return new Date();
    } else if (range === 'last7days') {
      const today = new Date();
      return new Date(today.setDate(today.getDate() - 7));
    } else {
      return new Date();
    }
  }

  function getEndDate(range: RangeOption): Date {
    // Implement logic to determine the end date based on the selected range
    return new Date();
  }

 if (isLoading) {
    return (
        <>
            <Loading />
        </>
    );
}


  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h1>Product Checkouts</h1>
      <div>
        <label>Select Date Range:</label>
        <select value={selectedRange} onChange={handleRangeChange}>
          <option value="today">Today</option>
          <option value="last7days">Last 7 Days</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <ul>
        {productCheckouts.map((checkout) => (
          <li key={checkout.id}>{/* Render your checkout data here */}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductAnalysis;
