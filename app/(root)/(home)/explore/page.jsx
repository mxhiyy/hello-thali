import { Button } from '@/components/ui/button';
import React from 'react'

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
    name: "Drinks & Snacks",
    enable: false,
  },
];


const Explorepage = () => {
  return (
    <main>
      <div className='flex flex-col gap-3 w-full h-40 justify-center items-center bg-[#F0F5F3]'>
        <h1 className='text-2xl font-semibold mt-5'>No Subscription, No Problem ?</h1>
        <p className='text-[0.65rem] mb-5 font-semibold'>No String attachded, Just pure satisfaction : Experience GOAT Thali's Deliciousness</p>
      </div>

      <div className='mt-10'>
        <div className='flex gap-1 w-full h-20 justify-between text-sm border-2 border-black'>
        {buttons.map((data) => (
          <Button size="xs" className="bg-white text-green-1">{data.name}</Button>
        ))}
        </div>
      </div>
    </main>
  )
}

export default Explorepage;