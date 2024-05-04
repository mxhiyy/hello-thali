import { Button } from "@/components/ui/button";
import { Fragment } from "react";

 const Homepage = () => {
  return (
    <Fragment>
    <div className="w-full h-[300px] maindiv flex flex-col gap-2 relative">
      <div className="absolute inset-0 bg-blur backdrop-blur-sm"></div>
      <h1 className="text-3xl font-semibold relative z-100 text-center text-white mt-20">No Time to Cook?</h1>
      <h1 className="text-3xl font-semibold relative z-100 text-center text-white">No Problem!</h1>

      <p className="bg-green-1 w-[84vw] m-auto text-white text-xs relative z-100">Subscribe to HelloThali for Healthy, Hassle-Free Meals.</p>
    </div>
    <div className="w-full h-[600px] flex flex-col gap-5">
      {/* ======== blob ========= */}
      <div className="w-full h-1/2"></div>

      {/* ==== about us ========== */}
      <div className="w-full h-1/2 flex flex-col gap-2">
        <h1 className="text-2xl text-center font-semibold">What We Do!</h1>
        <h1 className="text-2xl text-center font-semibold">Why We Do!</h1>
        <p className="w-[85vw] m-auto text-sm font-medium text-start mt-1">HelloThali delivers authentic, delicious Indian thalis straight to your door. Forget expensive restaurants or grocery shopping - enjoy affordable weekly/monthly plans with diverse menus curated by experts. Let us simplify your life, one delicious meal at a time.</p>
        <Button className="w-40 mt-1 ml-7 bg-purple-2 text-white rounded-md font-medium text-sm">Discover Our story</Button>
      </div>
    </div>

    </Fragment>
  )
}

export default Homepage;

