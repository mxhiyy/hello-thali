"use client"

import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";


const Footer = () => {
    return (
    <div>
      <div className="bg-green-800 text-white p-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="md:w-[350px] lg:w-[400px]">
            <h2 className="text-2xl font-semibold mb-4">About Us!</h2>
            <p className="mt-5">HelloThali delivers fresh, authentic thalis straight to your door.
            ✅Affordable weekly/monthly plans, diverse menus, cooked with love. Say goodbye to
            kitchen chaos, hello to stress-free flavor! Join us & simplify your life, one delicious
            thali at a time ➡️.
            </p>
          </div>

          <div className="sm:flex sm:flex-col sm:justify-center sm:ml-20 md:ml-[8rem] md:w-[300px] lg:ml-[18rem] xl:ml-[28rem] xl:mt-[2rem]">
            <p className="flex items-center mb-2">
              <span className="text-xl mr-2"><FaPhone /></span>+91 8003357044
            </p>
            <p className="flex items-center mb-4">
              <span className="text-xl mr-2"><MdEmail className="w-5 h-5" /></span>
              support@hellothali.com
            </p>
            <div className="flex space-x-4">
              <a href="#" className="cursor-pointer">
                <FaInstagram className="w-7 h-7"/>
              </a>
              <a href="#" className="cursor-pointer">
                <FaLinkedin className="w-7 h-7"/>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-lg bg-green-2 p-5 text-white">
      <p className="xl:ml-48">Copyright © Hellothali</p>
    </div>
    </div>
    )
};

export default Footer;
  