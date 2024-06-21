"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { clearCart } from "@/store/slices/cartSlice";
import { createOrder } from "../../../../../store/slices/orderSlice";
import toast from "react-hot-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const icons = [
  "/icons/google-pay.avif",
  "/icons/paytm.webp",
  "/icons/bharat-pay.avif",
  "/icons/phone-pay.webp",
];

const Checkoutpage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const toPay = parseFloat(searchParams.get("toPay"));
  const { items, totalQuantity } = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState(toPay);
  const [isCodSelected, setIsCodSelected] = useState(false);

  useEffect(() => {
    setTotalPrice(toPay);
  }, [toPay]);

  const handleCashOnDelivery = async () => {
    if (items.length === 0) {
      toast.error("No items in the cart");
      return;
    }

    const groupedItems = items.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity; 
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);

    try {
      const orderData = {
        totalQuantity,
        totalPrice,
        items: groupedItems,
      };
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      router.push("/my-account/my-orders");
    } catch (error) {
      alert("Failed to create orders");
    }
  };

  return (
    <main>
      <div className="w-[90%] m-auto flex gap-7">
        <div className="w-3/5">
          <h1 className="text-3xl font-extrabold">Select Payments Method</h1>
          <div className="border-2 border-gray-6 mt-5 rounded-md">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div
                    className="flex items-center gap-3"
                    onClick={() => setIsCodSelected(false)}
                  >
                    Add new UPI ID{" "}
                    <p className="text-sm rounded-xl px-3 font-semibold border-2 border-blue-500 text-blue-500 bg-blue-50">
                      Coming soon
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="border-2 border-sky-400 bg-blue-50 p-3 rounded-md">
                    <div className="flex gap-3 items-center">
                      <IoCheckmarkDoneCircleOutline
                        size={25}
                        className="text-sky-600"
                      />
                      <p className="text-base font-medium">Add new UPI</p>
                    </div>
                    <div className="ml-7">
                      <div className="flex gap-3 mt-3">
                        {icons.map((icon) => (
                          <Image
                            alt={icon}
                            className="cursor-pointer"
                            key={icon}
                            src={icon}
                            width={50}
                            height={20}
                          />
                        ))}
                      </div>
                      <div className="flex mt-3 items-center gap-4">
                        <input
                          type="text"
                          placeholder="example@upi"
                          className="p-2 outline-none bg-white border-2 border-gray-6 placeholder:text-gray-6 rounded-xl w-[30rem]"
                        />
                        <Button className="bg-green-4 p-3 text-white hover:bg-green-900 text-base font-medium w-40">
                          Checkout
                        </Button>
                      </div>
                      <p className="mt-4 text-sm font-medium text-gray-500">
                        The UPI ID is in the format of name/phone
                        number@bankname
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2">
                <AccordionTrigger onClick={() => setIsCodSelected(true)}>
                  Cash / UPI on Delivery
                </AccordionTrigger>
                <AccordionContent>
                  Please keep exact change handy to help us serve you better
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="w-2/5 rounded-md border-2 border-gray-6">
          <div className="flex flex-col gap-1 p-4">
            <h2 className="text-xl font-semibold">Delivery Address</h2>
            <p className="text-sm font-normal">
              Home: Floor 2, 12, New Shiv Puri, Ludhiana, Ludhiana
            </p>
          </div>
          <div className="border-t-2 border-b-2 border-gray-6 bg-neutral-100 p-3 flex justify-between">
            <h1 className="text-lg font-semibold">My Cart</h1>
            <h1 className="text-lg font-medium">{totalQuantity} items</h1>
          </div>
          <div className="mt-4">
            {items.map((item) => (
              <div
                className="p-2 flex justify-between border-b-2 border-gray-6 items-center"
                key={item.id}
              >
                <div className="w-1/2 flex gap-x-10 items-center">
                  <h1 className="">{item.quantity}</h1>
                  <Image
                    src={item.image}
                    alt={item.id}
                    width={60}
                    height={60}
                    className="rounded-xl"
                  />
                </div>
                <div className="w-1/2 flex flex-col justify-center gap-2">
                  <h2 className="font-light text-base">{item.title}</h2>
                  <p className="font-medium text-sm">₹ {item.sellingPrice}</p>
                </div>
              </div>
            ))}
          </div>
          <Button
            className={`${
              isCodSelected
                ? "bg-green-4 hover:bg-green-4"
                : "bg-neutral-300 cursor-not-allowed"
            } text-white text-xl font-bold mt-5 w-full p-3`}
            onClick={isCodSelected ? handleCashOnDelivery : null}
            disabled={!isCodSelected}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Checkoutpage;
