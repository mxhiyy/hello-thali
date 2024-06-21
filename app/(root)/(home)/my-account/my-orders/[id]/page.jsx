"use client";

import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { CircularProgress, Divider } from "@mui/material";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

const OrderDetailsPage = ({ params }) => {
  const [order, setOrder] = useState(null);
  const router = useRouter();
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    const fetchOrder = () => {
      const orderData = orders.find((order) => order.orderID === params.id);
      setOrder(orderData);
    };

    if (orders.length) {
      fetchOrder();
    }
  }, [params.id, orders]);

  if (!order) {
    return (
      <div>
        <CircularProgress size={25} style={{ color: "white" }} />
      </div>
    );
  }

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  const formatTime = (date) => {
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const mrp = order.items.reduce((total, item) => total + item.mrp, 0);
  const discount = order.items.reduce(
    (total, item) => total + (item.mrp - item.sellingPrice),
    0
  );

  return (
    <main>
      <div
        className="p-3 border-2 border-gray-6 w-10 m-5 rounded-md flex cursor-pointer justify-center items-start text-green-4"
        onClick={() => router.push("/my-account/my-orders")}
      >
        <FaArrowLeft />
      </div>

      <div className="w-[90%] m-auto">
        {order.status === "Delivered" && (
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-xl">Order Delivered</h1>
            <p className="font-medium text-sm text-green-4">
              Your order has been Delivered on your address. Thankyou and
              continue shopping.
            </p>
          </div>
        )}
        {order.status === "Pending" && (
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-xl">Order is Preparing</h1>
            <p className="font-medium text-sm text-yellow-400">
              Your order is preparing and will delivered on your address.
              Thankyou and continue shopping.
            </p>
          </div>
        )}
        {order.status === "Cancelled" && (
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-xl">Order is Cancelled</h1>
            <p className="font-medium text-sm text-red-500">
              Your order was Cancelled. We regret the inconveinece caused to
              you.
            </p>
          </div>
        )}

        <h2 className="text-base font-medium mt-5">
          {order.totalQuantity} {order.totalQuantity > 1 ? "items" : "item"} in
          this order
        </h2>

        <div className="flex flex-col gap-3 mt-5 mb-5">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mt-10"
            >
              <div className="flex gap-3">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={70}
                  height={70}
                  className="rounded-xl"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold text-lg">
                    {item.title} × {item.quantity || 1}
                  </h1>
                  <p className="text-gray-500 text-sm font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
              <h1 className="font-semibold text-xl">₹ {item.sellingPrice}</h1>
            </div>
          ))}
        </div>

        <Divider style={{ color: "gray" }} className="mt-10" />

        <div className="mt-10 flex flex-col gap-5 mb-5">
          <h1 className="font-bold text-xl">Bill Details</h1>
          <div className="font-medium text-base flex justify-between">
            <h1>MRP</h1>
            <h1>
              ₹ {order.items.reduce((total, item) => total + item.mrp, 0)}
            </h1>
          </div>
          <div className="font-medium text-sm flex justify-between text-blue-500">
            <h1>Product discount</h1>
            <h1>
              ₹{" "}
              {order.items.reduce(
                (total, item) => total + (item.mrp - item.sellingPrice),
                0
              )}
            </h1>
          </div>
          <div className="font-medium text-sm flex justify-between">
            <h1>Item Total</h1>
            <h1>₹ {mrp - discount}</h1>
          </div>
          <div className="font-medium text-sm flex justify-between">
            <h1>Handling Charge</h1>
            <h1>₹ 1</h1>
          </div>
          <div className="font-medium text-sm flex justify-between">
            <h1>Delivery Charge</h1>
            <h1>₹ 5</h1>
          </div>
          <div className="font-bold text-sm flex justify-between">
            <h1>Bill Total</h1>
            <h1>₹ {mrp - discount + 1 + 5}</h1>
          </div>
        </div>

        <Divider style={{ color: "gray" }} className="mt-10" />
        <div className="mt-10 flex flex-col gap-5">
          <h1 className="font-bold text-xl">Order Details</h1>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-sm">Order id</h1>
            <h1 className="font-normal text-gray-500 text-sm">
              {order.orderID}
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-sm">Payment</h1>
            <h1 className="font-normal text-gray-500 text-sm">
              Cash On Delivery
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-sm">Deliver to </h1>
            <h1 className="font-normal text-gray-500 text-sm">
              C-16,in opposite green valley , karan PG 2 ,law gate
              ,144411,punjab
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-sm">Order Placed</h1>
            <h1 className="font-normal text-gray-500 text-sm">
              {formatDate(order.createdAt)}, {formatTime(order.createdAt)}
            </h1>
          </div>
          <h1 className="font-bold text-base">Need help with your order ? </h1>

          <Link href={"/contact-us"}>
            <Button className="bg-green-4 text-white hover:bg-green-900 w-28 mb-10">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OrderDetailsPage;
