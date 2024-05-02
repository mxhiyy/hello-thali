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
  {
    name: "Pizza",
    enable: false,
  },
  {
    name: "Noodles",
    enable: false,
  },
  {
    name: "Burgers",
    enable: false,
  },
  {
    name: "Biryani",
    enable: false,
  },
  {
    name: "Drinks",
    enable: false,
  },
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
    <main>
      <div className='flex flex-col gap-3 w-full h-40 justify-center items-center bg-[#F0F5F3]'>
        <h1 className='text-2xl font-semibold mt-5'>No Subscription, No Problem ?</h1>
        <p className='text-[0.65rem] mb-5 font-semibold'>No String attachded, Just pure satisfaction : Experience GOAT Thali's Deliciousness</p>
      </div>

      <div className='mt-10'>
        <div className='grid grid-cols-3 grid-rows-2 gap-1 w-full h-20 text-sm ml-3'>
        {buttons.map((data) => (
          <Button key={data.name} size="xs" className={` w-28 ${selectedButton === data.name ? "bg-green-1 text-white" : "bg-white text-green-1"}${!data.enable ? 'cursor-not-allowed text-black font-semibold border-2 border-gray-400' : ''}`} disabled={!data.enable} onClick={() => handleSubmitButton(data.name)}>{data.name}</Button>
        ))}
        </div>

        {loading && (<div className='flex justify-center items-center'><CircularProgress /></div>)}
        {console.log(selectedButton)}        
        {!loading && selectedButton && (
           <div className='mt-10 grid grid-cols-2 grid-rows-3 border-2 border-white gap-5 mb-10'>
           {MenuLink[selectedButton].map((data) => (
             <div className='flex flex-col gap-3 w-40 ml-5' key={data.name}>
               <Image src={data.img} alt={data.name} width={200} height={100} />
               <Button className="p-2 rounded-md w-full bg-[#A38F98] text-white">{data.name}</Button>
             </div>
           ))}
         </div>
        )}
      </div>
    </main>
  )
}

export default Explorepage;