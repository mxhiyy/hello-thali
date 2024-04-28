"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const Contactpage = () => {
  return (
    <main>
      {/* ========== Contact us Image background ========*/}
      <div className="relative w-full h-[150px] border-2 border-black">
        <h1 className=" text-3xl ml-10 mt-14 xl:text-5xl xl:ml-40 z-50">
          Contact Us
        </h1>
      </div>

      {/* ======== Contact us Form and details section ========= */}
      <div className="xl:flex xl:justify-between">
        {/* ======= Contact us form section */}
        <div>
          <p className="text-base ml-10 mt-14 xl:ml-40 md:text-lg">
            Contact us about anything related to our company or services. <br />{" "}
            We'll do our best to get back to you as soon as possible
          </p>
          <form className="text-base ml-10 mt-14 xl:ml-40">
            {/* =============== name section ============= */}
            <label className="block md:inline-block mt-5 md:mr-40">Name*</label>
            <input
              className="p-2 w-[80vw] mt-2 border-2 border-gray-300 rounded-5 sm:w-[90vw] md:w-[70vw] xl:w-[25vw]"
              type="text"
              placeholder="Enter name"
              required
            />
            <br />
            {/* ============== Number Section ============ */}
            <label className="block md:inline mt-5 md:mr-[6.2rem]">
              Phone Number
            </label>
            <input
              className="p-2 w-[80vw] mt-2 border-2 border-gray-300 rounded-5 sm:w-[90vw] md:w-[70vw] xl:w-[25vw]"
              type="text"
              placeholder="+91 "
            />
            <br />
            {/* ============== Email Section ============ */}
            <label className="block md:inline mt-5 md:mr-[10.3rem]">
              Email*
            </label>
            <input
              className="p-2 w-[80vw] mt-2 border-2 border-gray-300 rounded-5 sm:w-[90vw] md:w-[70vw] xl:w-[25vw]"
              type="text"
              placeholder="your@mail.oom"
              required
            />
            <br />
            {/* ============== Subject Section ============ */}
            <label className="block md:inline mt-5 md:mr-[9.2rem]">
              Subject*
            </label>
            <input
              className="p-2 w-[80vw] mt-2 border-2 border-gray-300 rounded-5 sm:w-[90vw] md:w-[70vw] xl:w-[25vw]"
              type="text"
              placeholder="Enter Subject"
              required
            />
            <br />
            {/* ============== Question Section ============ */}
            <label className="block md:inline-block mt-5 md:mr-[8.5rem] md:float-start">
              Question*
            </label>
            <textarea
              className="p-2 w-[80vw] mt-2 border-2 border-gray-300 rounded-5 sm:w-[90vw] md:w-[70vw] xl:w-[25vw]"
              type="text"
              placeholder="Enter Question"
              required
            ></textarea>
          </form>

          {/* ========= Form Submit Button ============ */}
          <div className="w-full flex justify-center mb-5">
            <Button className="bg-green-1 text-white w-30 sm:w-40 xl:mt-5">
              Submit
            </Button>
          </div>
        </div>

        {/* ========== Contact us Details Card ============ */}
        <div className="hidden xl:flex xl:justify-center xl:items-center w-1/2">
          <div className="w-[300px] h-[250px] border-2 border-green-1 xl:mt-20 shadow-lg rounded-5 bg-green-1 text-white">
            <div className="mb-4 mt-10 text-xl underline ml-7">
              <Link href={"/"}>www.hellothali.com</Link>
            </div>
            <p className="flex items-center mb-4 ml-7 text-xl">
              <span className="text-xl mr-2">
                <FaPhone />
              </span>
              +91 8003357044
            </p>
            <p className="flex items-center mb-4 ml-7 text-xl">
              <span className="text-xl mr-2">
                <MdEmail className="w-5 h-5" />
              </span>
              support@hellothali.com
            </p>
            <p className="flex items-center mb-4 ml-7 text-xl">
              <span className="text-2xl mr-2">
                <FaLocationDot className="w-5 h-5" />
              </span>
              Phagwara, punjab
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contactpage;
