'use client'

import React from "react";
import { Button } from './ui/button';
import { useRouter } from "next/navigation";

const OrderCard = ({ key, data}) => {
  const router = useRouter();
  return (
    <div
      key={key}
      className="w-full h-auto p-2 flex justify-between items-center shadow-xl mt-4 border-2 border-gray-6 rounded-xl"
    >
      <div className="flex gap-6 items-center">
        <div className="p-4 bg-gray-6 rounded-md">
          <p className="text-base font-medium text-green-4">
            {data.TotalOrder} items
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold">Order ID: {data.orderId}</h3>
            {data.isPending && (
              <p className="flex items-center justify-center bg-blue-700 text-white text-sm px-3 rounded-full">
                {data.isPending}
              </p>
            )}
            {data.isDelivered && (
              <p className="flex items-center justify-center bg-green-700 text-white text-sm px-3 rounded-full">
                {data.isDelivered}
              </p>
            )}
            {data.isCancelled && (
              <p className="flex items-center justify-center bg-red-700 text-white text-sm px-3 rounded-full">
                {data.isCancelled}
              </p>
            )}
          </div>
          <h1 className="text-base font-bold">₹ {data.orderAmount}</h1>
          <p className="text-sm text-gray-500 ">
            {data.orderdate}, {data.orderTime}
          </p>
        </div>
      </div>

      <Button className="text-green-4 text-base font-normal bg-gray-6 hover:bg-gray-6" onClick={() => router.push(`/my-account/my-orders/${data.orderId}`) }>View Details</Button>
    </div>
  );
};

export default OrderCard;
