"use client";

import Link from "next/link";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useRef } from "react";
import emailjs from '@emailjs/browser';
import { useToast } from "@/components/ui/use-toast"



const Contactpage = () => {
  const form  = useRef();
  const { toast } = useToast()

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_y2m6k1k', 'template_m1xbwyw', form.current, {
        publicKey: 'rLH_300giKWQylT-N',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
      e.target.reset();

      setTimeout(() => {
        toast({
          title: "Your response has been submitted successfully!",
        })
      }, 2000);
  };   
  return (
    <main>
      {/* ========== Contact us Image background ========*/}
      <div className="relative w-full h-[150px] border-2 border-white ">
      <div className="absolute top-0 left-0 w-full h-[150px]  blur-sm backgroundDiv"></div>
      <h1 className="relative text-3xl ml-10 mt-14 xl:text-5xl xl:ml-40 z-1 text-white">
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
          <form ref={form} onSubmit={sendEmail} className="text-base ml-10 mt-14 xl:ml-40">
            {/* =============== name section ============= */}
            <label className="block md:inline-block mt-5 md:mr-40">Name*</label>
            <input
              name="user_name"
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
              name="user_phonenumber"
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
              name="user_email"
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
              name="user_subject"
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
              name="user_message"
              className="p-2 w-[80vw] mt-2 border-2 border-gray-300 rounded-5 sm:w-[90vw] md:w-[70vw] xl:w-[25vw]"
              type="text"
              placeholder="Enter Question"
              required
            ></textarea>

            <button type="submit" className="bg-green-1 flex justify-center mb-5 text-white p-2 rounded-md w-30 sm:w-40 xl:mt-5 xl:w-[8rem]"> 
              Submit
            </button>
          </form>

          {/* ========= Form Submit Button ============ */}
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
