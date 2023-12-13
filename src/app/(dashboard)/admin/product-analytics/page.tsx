// pages/index.js
'use client';
import { useGetProductCheckoutsForDayQuery } from '@/redux/api/orderApi/orderApi';
import { useState } from 'react';


function ProductAnalysis() {

 const [startDate, setStartDate] = useState('');
 const [endDate, setEndDate] = useState('');
  // const query: Record<string, any> = {};
 const { data, isLoading, error } = useGetProductCheckoutsForDayQuery({});


  

 

  return (
    <>
      <div>
        <h1>Order Count</h1>

        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

       

        {isLoading && <p>Loading...</p>}
        
        {data && (
          <div>
            <p>Last 7 Days: {data?.createdAt}</p>
            <p>Last 1 Month: {data.last1MonthCount}</p>
            <p>Selected Date Range: {data.selectedDateRangeCount}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductAnalysis;
