"use client"

import { Button } from '@/components/ui/button';
import { MenuLink } from '@/constants';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react'

const buttons = [
  {
    name: "Thali",
    enable: true
  },
  // {
  //   name: "Pizza",
  //   enable: false,
  // },
  // {
  //   name: "Noodles",
  //   enable: false,
  // },
  // {
  //   name: "Burgers",
  //   enable: false,
  // },
  // {
  //   name: "Biryani",
  //   enable: false,
  // },
  // {
  //   name: "Drinks",
  //   enable: false,
  // },
];


const Explorepage = () => {
  const [selectedButton, setSelectedButton] = useState("Thali");
  const [ loading, setLoading] = useState(false);

  const handleSubmitButton = (name) => {
    setSelectedButton(name);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <main className='w-full'>
      <div className='flex flex-col gap-3 w-full h-40 justify-center items-center bg-[#F0F5F3]'>
        <h1 className='text-2xl font-semibold mt-5'>No Subscription, No Problem?</h1>
        <p className='text-[0.65rem] mb-5 font-semibold'>No String attachded, Just pure satisfactions</p>
      </div>

      <div className='mt-10'>

       
        <div className='grid place-items-center grid-cols-3 grid-rows-1 gap-4 w-full h-20 text-sm ml-2'>
        {buttons.map((data) => (
          <Button key={data.name} size="xs" className={`p-2 w-28 ${selectedButton === data.name ? "bg-green-1 text-white" : "bg-white text-green-1"}${!data.enable ? 'cursor-not-allowed text-black font-semibold border-2 border-gray-400' : ''}`} disabled={!data.enable} onClick={() => handleSubmitButton(data.name)}>{data.name}</Button>  

        ))}
        </div>
      </div>

      <div className='mt-10'>

        {loading && (<div className='flex justify-center items-center'><CircularProgress /></div>)}

        {!loading && selectedButton && (
           
           <div className='mt-10 grid grid-cols-2 grid-rows-3 border-2 border-white gap-5 mb-10 w-full place-items-center'>
           {MenuLink[selectedButton].map((data) => {
             const discount = (data.sellingPrice / data.mrp) * 100;
             return(
              <div className='flex flex-col gap-3 w-40' key={data.name}>
               <Image src={data.img} className='relative rounded-xl' alt={data.name} width={200} height={100} />
               <div className='absolute h-6 w-12 bg-red-600 text-white text-xs flex justify-center items-center transform mt-2' style={{ borderTopRightRadius:'12px', borderBottomRightRadius: '12px'}}>{100 - Math.round(discount)} %</div>
               <p className='font-semibold text-sm'>{data.title}</p>
               <div className='w-20 flex gap-2 items-center'>
               <p className='font-semibold text-base mt-1'>₹{data.sellingPrice}</p>
               <p className='font-normal text-sm text-gray-400 mt-1 line-through'>₹{data.mrp}</p>
               </div>
               <Button className="p-2 rounded-md w-full bg-white hover:bg-white border-2 border-[#A38F98] text-[#A38F98] hover:text-[#A38F98]">Add to Cart</Button>

             </div>
             )
          })}
         </div>
        )}
        
      </div>
    </main>
    
  )
}

export default Explorepage;