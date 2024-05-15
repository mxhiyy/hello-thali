"use client"

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import { Homecard } from "@/constants";


 const Homepage = () => {
  const route = useRouter();

  return (
    <Fragment>
      <div className="w-[90%] m-auto h-[550px]">
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
       <SwiperSlide><img src="/assets/first-banner.svg" alt="first-banner" className="w-full" /></SwiperSlide>
       <SwiperSlide><img src="/assets/first-banner.svg" alt="first-banner" className="w-full" /></SwiperSlide>
       <SwiperSlide><img src="/assets/first-banner.svg" alt="first-banner" className="w-full" /></SwiperSlide>
        
      </Swiper>
      </div>

      <div className="w-[90%] h-full m-auto mt-10">
      <div className="h-[400px] flex justify-around items-center">
        <div className="bg-[#7997000F] w-[420px] h-[270px] rounded-3xl p-7 flex flex-col gap-2">
          <h5 className="text-2xl font-semibold">About Us</h5>
          <p className="text-sm font-medium w-80">We deliver authentic, delicious Indian thalis straight to your door. Forger expensive restaurants or grocery shopping enjoy alfordable weekly/monthly plans with diverse menus curated by experts. Let us simplify your life, one delicious meal at a time.Forger expensive restaurants or grocery shopping </p>
          <button className="mt-1 text-white rounded-md text-sm bg-green-4 p-2 w-24 font-medium">Read More</button>
        </div>
        <div className='w-[350px] h-[450px]'>
          <img src="/assets/aboutimage.svg" alt="image-about" className="w-full h-full" />
        </div>
      </div>

      <div className="h-[400px] flex justify-around items-center">
        <div className='w-[350px] h-[450px]'>
          <img src="/assets/missionimage.svg" alt="image-about" className="w-full h-full" />
        </div>
        <div className="bg-[#7997000F] w-[420px] h-[270px] rounded-3xl p-7 flex flex-col gap-2">
          <h5 className="text-2xl font-semibold">Our Mission</h5>
          <p className="text-sm font-medium w-80">We deliver authentic, delicious Indian thalis straight to your door. Forger expensive restaurants or grocery shopping enjoy alfordable weekly/monthly plans with diverse menus curated by experts. Let us simplify your life, one delicious meal at a time.Forger expensive restaurants or grocery shopping </p>
          <button className="mt-1 text-white rounded-md text-sm bg-green-4 p-2 w-24 font-medium">Read More</button>
        </div>
      </div>
      </div>

      <div className="mt-10 h-[500px]">
        <h1 className="text-center text-6xl font-normal text-green-5">Customised Menu</h1>
        <div className="w-[80%] m-auto flex items-center justify-center gap-4 mt-5">
          <div className="w-3/5 h-[330px] bg-white rounded-xl"></div>
          <div className="h-full flex flex-col gap-5 bg-[#7997000F] p-5 w-[340px] rounded-xl">
            <p className="text-sm font-medium w-80">We deliver authentic, delicious Indian thalis straight to your door. Forget expensive restaurants or grocery shopping enjoy alfordable weekly/monthly plans with diverse menus curated by experts. Let us simplify your life, one delicious meal at a time.We deliver authentic, delicious Indian thalis straight to your door. Forger expensive restaurants or grocery shopping enjoy alfordable weekly/monthly plans with diverse menus curated by experts. </p>
            <button className="p-2 text-white rounded-md text-sm bg-green-4 w-24 font-medium">See how?</button>
          </div>
        </div>
      </div>

      <div className="w-[80%] m-auto mt-5 flex justify-around">
        {Homecard.map((data) => (
          <div key={data.title} className="w-[250px] h-full flex flex-col gap-3">
            <img src={data.img} className="rounded-xl cursor-pointer" alt="home-card" height={200} width={250} />
            <h3 className="text-xl text-green-5 font-semibold text-center">{data.title}</h3>
          </div>
        ))}
      </div>


    </Fragment>
  )
}

export default Homepage;

