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
      <div className="relative w-[90%] m-auto h-[150px] flex justify-center items-center bg-gray-4 bg-opacity-65 ">
      {/* <div className="absolute top-0 left-0 w-full h-[150px]  blur-sm backgroundDiv"></div> */}
      <h1 className="relative z-1 text-center font-medium text-green-5 text-6xl">
          Contact Us
      </h1>
      </div>

      <div className="w-[90%] m-auto mt-5">
          <p className="font-medium text-2xl">
            Contact us about anything related to our company or services. <br />{" "}
            We will do our best to get back to you as soon as possible
          </p>
      </div>

      {/* ======== Contact us Form and details section ========= */}
      <div className="xl:flex xl:justify-between w-[90%] m-auto">
        {/* ======= Contact us form section */}
        <div className="mt-10">
          <form ref={form} onSubmit={sendEmail} className="text-base">
            {/* =============== name section ============= */}
            <label className="block md:inline-block font-bold mt-5 md:mr-40">Name*</label>
            <input
              name="user_name"
              className="p-2 w-[80vw] mt-2 border-2 border-gray-300 rounded-5 sm:w-[90vw] md:w-[70vw] xl:w-[25vw] bg-[#E9E8E8]"
              type="text"
              placeholder="Enter name"
              required
            />
            <br />
            {/* ============== Number Section ============ */}
            <label className="block md:inline mt-5 md:mr-[6.2rem] font-bold">
              Phone Number
            </label>
            <input
              name="user_phonenumber"
              className="p-2 w-[80vw] mt-2 border-2 border-gray-300 rounded-5 sm:w-[90vw] md:w-[70vw] xl:w-[25vw] bg-[#E9E8E8]"
              type="number"
              placeholder="+91 "
            />
            <br />
            {/* ============== Email Section ============ */}
            <label className="block md:inline mt-5 md:mr-[10.3rem] font-bold">
              Email*
            </label>
            <input
              name="user_email"
              className="p-2 w-[80vw] mt-2 border-2 border-gray-300 rounded-5 sm:w-[90vw] md:w-[70vw] xl:w-[25vw] bg-[#E9E8E8]"
              type="email"
              placeholder="your@mail.oom"
              required
            />
            <br />
            {/* ============== Subject Section ============ */}
            <label className="block md:inline mt-5 md:mr-[9.2rem] font-bold">
              Subject*
            </label>
            <input
              name="user_subject"
              className="p-2 w-[80vw] mt-2 border-2 border-gray-300 rounded-5 sm:w-[90vw] md:w-[70vw] xl:w-[25vw] bg-[#E9E8E8]"
              type="text"
              placeholder="Enter Subject"
              required
            />
            <br />
            {/* ============== Question Section ============ */}
            <label className="block md:inline-block mt-5 md:mr-[8.5rem] md:float-start font-bold">
              Question*
            </label>
            <textarea
              name="user_message"
              className="p-2 w-[80vw] mt-2 border-2 border-gray-300 rounded-5 sm:w-[90vw] md:w-[70vw] xl:w-[25vw] bg-[#E9E8E8]"
              type="text"
              placeholder="Enter Question"
              rows={4}
              cols={5}
              required
            ></textarea>

            <div className="flex justify-center">
            <button type="submit" className="bg-green-4 bg-opacity-65 hover:bg-green-4 flex text-base  justify-center mb-5 text-white p-2 rounded-md w-30 sm:w-40 xl:mt-5 xl:w-[11rem]"> 
              Submit
            </button>
            </div>
          </form>

          {/* ========= Form Submit Button ============ */}
        </div>

        {/* ========== Contact us Details Card ============ */}
        <div className="hidden xl:flex xl:justify-center xl:items-center w-1/2" style={{ fontFamily: "Inter"}}>
          <div className="w-[300px] h-[250px] shadow-lg rounded-5 bg-[#7997000F] text-black">
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
              <Link href={"mailto:info@hellothali.com"}>info@hellothali.com</Link>
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
