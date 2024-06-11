'use client';

import React from 'react';
import { orderedItem } from '../../../../../../constants';
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from 'next/navigation';


const OrderDetailsPage = ({ params }) => {
  const router = useRouter();

  const order = orderedItem.find((order) => order.orderId.toString() === params.id);
  return (
    <main>
        <div className='p-3 border-2 border-gray-6 w-10 m-5 rounded-md flex cursor-pointer justify-center items-start text-green-4' onClick={() =>router.push('/my-account/my-orders')}><FaArrowLeft /></div>
    </main>
  )
}

export default OrderDetailsPage
