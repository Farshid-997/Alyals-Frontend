"use client"

import { useGetNotificationByUserIdQuery } from '@/redux/api/notificationApi';
import { getUserInfo } from '@/services/auth.service';
import { useState } from 'react';

export default function Notification() {
   const { userId } = getUserInfo() as any;
  
  
  const [showNotification, setShowNotification] = useState(true);

  const closeNotification = () => {
    setShowNotification(false);
  };

   const { data, isLoading } =
    useGetNotificationByUserIdQuery(userId);

   
  return (
    <>
      <div
        id="toast-message-cta"
        className={`w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400 ${
          showNotification ? '' : 'hidden'
        }`}
        role="alert"
      >
        <div className="flex">
          <div className="ms-3 text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              {/* {data[0]?.title} */} New Product is launching...
            </span>

            {data.map((m: any) => (
              <div key={m?.id} className="mb-2 text-sm font-normal font-sans">
                Hi, {m?.content}
              </div>
            ))}
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-message-cta"
            aria-label="Close"
            onClick={closeNotification}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
