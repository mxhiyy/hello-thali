'use client'

import React from "react";
import { Button } from './ui/button';
import { useRouter } from "next/navigation";

const OrderCard = ({ data }) => {
  const router = useRouter();

  const statusClassName = () => {
    if(data.status === "Pending") return "bg-blue-700";
    if(data.status === "Delivered") return "bg-green-700";
    if(data.status === "Cancelled") return "bg-red-700";
    return "";
  };

  const statusText = () => {
    if(data.status === "Pending") return "Pending";
    if(data.status === "Delivered") return "Delivered";
    if(data.status === "Cancelled") return "Cancelled";
    return "";
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - d);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "placed today";
    } else if (diffDays === 2) {
      return "placed yesterday";
    } else {
      return `placed on ${d.toLocaleDateString()}`;
    }
  };

  const formatTime = (date) => {
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div
      className="w-full h-auto p-2 flex justify-between items-center shadow-xl mt-4 border-2 border-gray-6 rounded-xl"
    >
      <div className="flex gap-4 items-center">
        <div className="p-3 bg-gray-6 rounded-md">
          <p className="text-base font-bold text-green-4">
            {data.totalQuantity} items
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <h3 className="text-base font-extrabold">Order ID: {data.orderID}</h3>
            {statusText() && (
              <p className={`flex items-center justify-center text-white text-sm px-3 font-medium rounded-full ${statusClassName()}`}>
                {statusText()}
              </p>
            )}
          </div>
          <h1 className="text-base font-extrabold">₹ {data.totalPrice}</h1>
          <p className="text-sm font-medium text-gray-500 ">
          {formatDate(data.createdAt)}, {formatTime(data.createdAt)}
          </p>
        </div>
      </div>

      <Button className="text-black text-base font-semibold bg-gray-6 hover:bg-gray-6" onClick={() => router.push(`/my-account/my-orders/${data.orderID}`) }>View Details</Button>
    </div>
  );
};

export default OrderCard;
