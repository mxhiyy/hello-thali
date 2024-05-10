"use client"

import { Button } from "@/components/ui/button";
import { Homecard, TestimonalCard } from "@/constants";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import HomeCard from "@/components/HomeCard";
import Testimonal from "@/components/Testimonal";

 const Homepage = () => {
  const route = useRouter();

  return (
    <Fragment>
      <div className="w-full h-[300px] maindiv flex flex-col gap-2 relative">
        <div className="absolute inset-0 bg-blur backdrop-blur-sm"></div>
        <h1 className="text-3xl font-semibold relative z-100 text-center text-white mt-20">No Time to Cook?</h1>
        <h1 className="text-3xl font-semibold relative z-100 text-center text-white">No Problem!</h1>
        <p className="bg-green-1 w-[84vw] m-auto text-white text-xs relative z-100">Subscribe to HelloThali for Healthy, Hassle-Free Meals.</p>
     </div>

     <div className="w-full h-[600px] flex flex-col bg-purple-4">
      {/* ======== blob ========= */}
      <div className="w-full h-1/2"></div>

      {/* ==== about us ========== */}
      <div className="h-1/2 flex flex-col gap-2 w-[85vw]">
        <h1 className="text-2xl font-semibold ml-7">What We Do!</h1>
        <h1 className="text-2xl font-semibold ml-7">Why We Do!</h1>
        <p className="m-auto text-sm font-medium text-start mt-1 ml-7">HelloThali delivers authentic, delicious Indian thalis straight to your door. Forget expensive restaurants or grocery shopping - enjoy affordable weekly/monthly plans with diverse menus curated by experts. Let us simplify your life, one delicious meal at a time.</p>
        <Button className="w-40 ml-7 bg-purple-2 mt-5 text-white rounded-md font-medium text-sm mb-10">Discover Our story</Button>
      </div>
    </div>

    <div className="w-full h-[700px] flex flex-col menubanner">
        {/* ============== paper card ============  */}
        <div className="w-full h-1/2  flex justify-center items-center">
          <div className="w-[300px] h-[300px]  flex flex-col p-9 gap-3 bg-green-3 rounded-md text-white">
             <h1 className="text-2xl font-semibold">Our Mission</h1>
             <p className="text-sm font-medium">To make delicious, healthy food accessible for everyone, from students to families. Join us and enjoy the freedom of stress-free, flavorful meals.</p>
             <Button className="w-40 bg-purple-2 text-white rounded-md text-sm" onClick={() => route.push('/explore')}>Explore Our Menu</Button>
          </div>
        </div>

        {/* ==========  image ============== */}
        <div className="h-1/2 flex flex-col gap-2 w-full"></div>
    </div>

     {/* ============= Home card ============== */}
    <div className="grid grid-col-1 grid-rows-3 place-items-center w-full h-[1800px] gap-2 mt-5">
      {Homecard.map((data) => (
        <HomeCard data={data} />
      ))}
    </div>

    {/* =========== Testimonal Card ========= */}
    <div className="w-full h-[400px] border-2 border-black relative">
      <div className="border-2 border-black w-full h-[70%]">
         {TestimonalCard.map((data) => (
          <Testimonal data={data}  />
         ))}
      </div>

      {/* ========== wave options ========= */}
      <div className="w-full absolute bottom-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#A38F98" fill-opacity="1" d="M0,32L40,64C80,96,160,160,240,176C320,192,400,160,480,122.7C560,85,640,43,720,37.3C800,32,880,64,960,106.7C1040,149,1120,203,1200,197.3C1280,192,1360,128,1400,96L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>
      </div>
    </div>

    </Fragment>
  )
}

export default Homepage;

