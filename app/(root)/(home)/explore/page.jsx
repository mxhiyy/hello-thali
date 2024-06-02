"use client"

import { Button } from '@/components/ui/button';
import { MenuLink } from '@/constants';
import { CircularProgress, Rating } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { CiStar } from "react-icons/ci";

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


  const n = MenuLink.length;


  const handleSubmitButton = (name) => {
    setSelectedButton(name);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <main className='w-full'>

      <div className="relative m-auto w-[90%] h-[300px] shadow-lg  rounded-xl">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-35 backgroundDiv rounded-xl"></div>
        <div className='flex flex-col gap-2 items-center justify-center'>
          <h1 className="relative text-7xl z-50 font-extrabold text-purple mt-20">Not Subscribed to Plan?</h1>
          <p className='font-semibold text-black text-xl'>No Problem! But we bet you definitely will</p>
        </div>
      </div>

      <div className='flex justify-center mt-20'>
        <Button className='bg-green-4 opacity-65 text-white font-medium text-base hover:opacity-90 rounded-2xl hover:bg-green-4 hover:text-white'>Thali</Button>
      </div>

      <div className='m-auto w-[80%] mt-20 h-full'>
       <div className={`grid grid-cols-1 grid-rows-${n} place-content-between gap-5`}>
       {MenuLink.map((data) => {
          return(
            <div className='flex h-[250px] p-3 rounded-lg'  style={{ border: '1px solid #0000001A'}}>
              <div className='w-3/5 flex flex-col gap-4'>
                <div className='flex gap-3 items-center'><img src={data.img} alt={data.name} width={30} height={30} /><p className='text-sm font-bold text-red-700'>{data.main}</p></div>
                <h2 className='font-semibold text-2xl'>{data.title}</h2>
                <div className='flex items-center gap-3'><p className='font-semibold text-base line-through text-gray-500'>₹{data.mrp}</p><p className='font-semibold text-base text-black'>₹{data.sellingPrice}</p></div>
                <div className='flex items-center gap-3'><CiStar size={23} /><p className='text-sm font-light'>4.9</p></div>
                <h5 className='font-light text-sm'>{data.description}</h5>
              </div>
              <div className='w-2/5 flex flex-col items-end relative mr-10'>
                <img src={data.image} alt={data.name} width={190} height={200} className='rounded-xl'  />
                <Button className='text-black w-28 bg-[#EEEEEE] rounded-xl absolute bottom-4 right-9 font-semibold text-xl hover:text-black hover:bg-gray-200'>Add</Button>
                <p className='text-center mr-8 mt-5 font-semibold text-gray-400 text-base'>Customisable</p>
              </div>
            </div>
          )
        })}
       </div>
      </div>

      <div className='mt-40 h-36 flex justify-between w-[90%] m-auto'>
                <div className='flex flex-col gap-3'>
                  <h3 className='font-normal text-4xl'>Quality</h3>
                  <div className='flex flex-row gap-1 items-center justify-center'>
                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                    <h6 className='text-xl font-normal'>4.9</h6>
                  </div>
                </div>
                <div className='flex flex-col gap-3'>
                  <h3 className='font-normal text-4xl'>Affordability</h3>
                  <div className='flex flex-row gap-1 items-center justify-center'>
                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                    <h6 className='text-xl font-normal'>4.9</h6>
                  </div>
                </div>
                <div className='flex flex-col gap-3 items-center'>
                  <h3 className='font-normal text-4xl'>Convenience</h3>
                  <div className='flex flex-row gap-1 items-center justify-center'>
                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                    <h6 className='text-xl font-normal'>4.9</h6>
                  </div>
                </div>
        </div>

        <div className='mt-40 bg-[#F0F0F0B2] rounded-2xl w-[90%] m-auto h-full flex flex-col gap-3 p-5' style={{ border: '1px solid #0000001A'}}>
          <div className='w-[80%] m-auto'>
            <h1 className='text-4xl font-bold text-[#00000099]'>Ratings & Reviews</h1>
            <div className='flex gap-3 mt-5'><Button className='bg-green-4 opacity-65 text-white font-medium text-base hover:opacity-90 hover:bg-green-4 hover:text-white' >Add Ratings</Button><Button className='bg-green-4 opacity-65 text-white font-medium text-base hover:opacity-90 hover:bg-green-4 hover:text-white' >Write a Review</Button></div>
             
             {/* =========comment box ============= */}
             <div className='w-[80%] m-auto mt-20'>
              <div className='flex gap-4 items-center'>
                <div className='w-2 h-2 bg-black rounded-full'></div>
                <h5 className='text-base font-bold border-r-2 pr-4 border-black'>Mohit Poonia</h5>
                <h5 className='text-base font-bold'>12 Mar 2024</h5>
              </div>
              <p className='mt-4 text-base ml-20 font-normal'>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat necessitatibus suscipit voluptatem mollitia exercitationem in, quibusdam a est sequi fuga perspiciatis, sed nemo nesciunt sint dolorem voluptas, eos dolore sapiente similique id laborum repellendus. Dolores aliquam magni molestias quasi, rerum at minus, ab, quibusdam labore temporibus aperiam tenetur vero molestiae maiores? Porro cumque in tempore, quas corrupti incidunt commodi, delectus architecto ipsa nesciunt, repellat dolores quod sapiente?"</p>
              <div className='flex gap-4 ml-10 mt-5 font-bold text-base'>Like (56) | Reply (4)</div>
             </div>
          </div>
        </div>
      {/* <div className='flex flex-col gap-3 w-full h-40 justify-center items-center bg-[#F0F5F3]'>
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
               <Button className="p-2 rounded-md w-full bg-white hover:bg-white border-2 border-[#A38F98] text-[#A38F98] hover:text-[#A38F98]" onClick={() => handleAddToCartItems(data)}>Add to Cart</Button>
             </div>
             )
          })}
         </div>
        )}
        
      </div> */}
    </main>
    
  )
}

export default Explorepage;