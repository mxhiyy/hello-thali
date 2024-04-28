import { Fragment } from "react";
import BgBanner from '@/public/assets/bgBanner.jpg';

const Homepage = () => {
  return (
    <Fragment>
      {/* ======== Banner ========== */}
      <div style={{ backgroundImage: `url(${BgBanner})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="relative w-screen h-[250px]">
        <div className="absolute top-0 w-full h-full bg-gradient-to-r from-yellow-400 to-green-400">
          <div className="flex justify-center items-end w-full h-1/2"><h2 className="text-white font-semibold text-4xl">No Time To Cook ? <br /> <span className="block text-center">No Problem!</span></h2></div>
          <p className="text-white bg-green-1 font-medium text-xs w-[90%] m-auto text-center mt-9">Subscribe to HelloThali for Healthy, Hassale-Free Meals.</p>
        </div>
      </div>

    </Fragment>
  )
}

export default Homepage;

