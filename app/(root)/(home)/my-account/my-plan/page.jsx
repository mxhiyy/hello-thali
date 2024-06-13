'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Divider } from '@mui/material';
import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";



const planDays = [
  {
    day: 'Mon',
    status: "Delivered",
    icon : <FaCheckCircle />,
  },

  {
    day: 'Tue',
    status: "Delivered",
    icon :<FaCheckCircle />,
  },

  {
    day: 'Wed',
    status: "Delivered",
    icon : <FaCheckCircle />,
  },

  {
    day: 'Thu',
    status: "Pending",
    icon : <MdOutlinePendingActions />,
  },

  {
    day: 'Fri',
    status: "Pending",
    icon : <MdOutlinePendingActions />,
  },

  {
    day: 'Sat',
    status: "Pending",
    icon : <MdOutlinePendingActions />,
  },

  {
    day: 'Sun',
    status: "Pending",
    icon : <MdOutlinePendingActions />,
  }
]

const MyPlanpage = () => {
  return (
   <main>
       <div className='mt-10'>
        <h1 className='text-3xl font-semibold text-green-4 flex justify-center'>Your Current Plan</h1>
        <div className='mt-10 flex flex-col gap-3 w-[90%] m-auto'>
          <h1 className='font-semibold text-base'>Your prefrences: </h1>

          <div className='flex justify-between'>
            {planDays.map((data) => (
              <div className='flex flex-col gap-1'>
                <Button  className={cn('text-black bg-gray-6 w-20 hover:bg-gray-6', { 'bg-green-4 text-white hover:bg-green-4': data.status === 'Delivered'})}>{data.day}</Button>
                <div className={cn('flex items-center gap-2 px-1 text-xs font-normal rounded-3xl border-2 border-gray-6 text-red-600', { 'text-green-4' : data.status === 'Delivered'})}><p>{data.status}</p> {data.icon} </div>
              </div>
            ))}
          </div>

          <Divider sx={{ color: "gray"}} className='mt-5'/>

          <div className='flex flex-col gap-2 mb-5'>
            <h1 className='text-xl font-bold'>Bill Details: </h1>
            <div className='text-base font-normal mt-2 flex gap-2'>
              <h1>Total Amount Paid : </h1>
              <h1>₹ 630</h1>
            </div>
            <div className='text-base font-normal flex gap-2'>
              <h1>Payment Method : </h1>
              <h1>UPI</h1>
            </div>
            <div className='text-base font-normal flex gap-2'>
              <h1>Plan Duration : </h1>
              <h1 className='text-green-4'>1 April (Tuesday) - 7 April (Monday)</h1>
            </div>

            <h1 className='text-xl font-bold mt-5'>Address: </h1>
            <h1 className='text-gray-500'>C-16,in opposite green valley , karan PG 2 ,law gate ,144411,punjab</h1>


            <h1 className='text-xl font-bold mt-5'>Phone Number: </h1>
            <h1 className='text-gray-500'>8003357044</h1>


            <h1 className='text-xl font-bold mt-5'>Plan ID: </h1>
            <h1 className='text-gray-500'>PNID12345678901</h1>
          </div>

        </div>
       </div>
   </main>
  )
}

export default MyPlanpage
