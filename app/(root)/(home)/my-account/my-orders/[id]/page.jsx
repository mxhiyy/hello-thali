"use client";

import React from "react";
import { orderedItem } from "../../../../../../constants";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Divider } from "@mui/material";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const OrderDetailsPage = ({ params }) => {
  const router = useRouter();

  const order = orderedItem.find(
    (order) => order.orderId.toString() === params.id
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
        {order.isDelivered && (
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-xl">Order Delivered</h1>
            <p className="font-medium text-sm text-green-4">
              Your order has been Delivered on your address. Thankyou and
              continue shopping.
            </p>
          </div>
        )}
        {order.isPending && (
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-xl">Order is Preparing</h1>
            <p className="font-medium text-sm text-yellow-400">
              Your order is preparing and will delivered on your address.
              Thankyou and continue shopping.
            </p>
          </div>
        )}
        {order.isCancelled && (
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-xl">Order is Cancelled</h1>
            <p className="font-medium text-sm text-red-500">
              Your order was Cancelled. We regret the inconveinece caused to
              you.
            </p>
          </div>
        )}

        <h2 className="text-base font-medium mt-5">
          {order.TotalOrder} {order.TotalOrder > 1 ? "items" : "item"} in this
          order
        </h2>

        <div className="flex justify-between items-center mt-10">
          <div className="flex gap-3">
            <img
              src="/assets/paneer.jpeg"
              alt="panner"
              width={70}
              height={70}
              className="rounded-xl"
            />
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-lg">
                Mattar Paneer & Mix veg Thali × 3
              </h1>
              <p className="text-gray-500 text-sm font-medium">
                Serves 1 | Other Items: 3 Roti, Half-Bowl Rice, Raiyeta, Salad,
                Pickel, Mouth Freshner
              </p>
            </div>
          </div>

          <h1 className="font-semibold text-xl">₹ {order.orderAmount}</h1>
        </div>

        <Divider style={{ color: "gray" }} className="mt-10" />

        <div className="mt-10 flex flex-col gap-5">
          <h1 className="font-bold text-xl">Bill Details</h1>
          <div className="font-medium text-base flex justify-between">
            <h1>MRP</h1>
            <h1>₹ 160</h1>
          </div>
          <div className="font-medium text-sm flex justify-between text-blue-500">
            <h1>Product discount</h1>
            <h1>₹ 30</h1>
          </div>
          <div className="font-medium text-sm flex justify-between">
            <h1>Item Total</h1>
            <h1>₹ 130</h1>
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
            <h1>₹ 160</h1>
          </div>
        </div>

        <Divider style={{ color: "gray" }} className="mt-10" />
        <div className="mt-10 flex flex-col gap-5">
          <h1 className="font-bold text-xl">Order Details</h1>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-sm">Order id</h1>
            <h1 className="font-normal text-gray-500 text-sm">{order.orderId}</h1>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-sm">Payment</h1>
            <h1 className="font-normal text-gray-500 text-sm">Cash On Delivery</h1>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-sm">Deliver to </h1>
            <h1 className="font-normal text-gray-500 text-sm">C-16,in opposite green valley , karan PG 2 ,law gate ,144411,punjab</h1>
          </div>
         {order.isDelivered && (
             <div className="flex flex-col gap-1">
             <h1 className="font-semibold text-sm">Order Placed</h1>
             <h1 className="font-normal text-gray-500 text-sm">placed yesterday, 8:44 PM</h1>
           </div>
         )}

         {order.isCancelled && (
             <div className="flex flex-col gap-1">
             <h1 className="font-semibold text-sm">Order Cancelled</h1>
             <h1 className="font-normal text-gray-500 text-sm">yesterday, 8:44 PM</h1>
           </div>
         )}

         { 
            order.isPending && (
                <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-sm">Order Placed</h1>
                <h1 className="font-normal text-gray-500 text-sm">Today, 8:44 PM</h1>
              </div>
            )
         }

         <h1 className="font-bold text-base" >Need help with your order ? </h1>

         <Link href={"/contact-us"}><Button className='bg-green-4 text-white hover:bg-green-900 w-28 mb-10'>Contact Us</Button></Link>
        </div>
      </div>
    </main>
  );
};

export default OrderDetailsPage;
