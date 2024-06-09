"use client";

import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";
import { IoLogoYoutube } from "react-icons/io5";

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="mt-20 border-t-2 border-gray-4 w-full">
      <div className="w-[90%] m-auto flex justify-between p-5">
        <div className="flex flex-col gap-5">
          <h2 className="text-base font-semibold">Company</h2>
          <Link href={"/"}>
            <p className="text-sm font-medium mt-2">About</p>
          </Link>
          <Link href={"/"}>
            <p className="text-sm font-medium">Careers</p>
          </Link>
          <Link href={"/"}>
            <p className="text-sm font-medium">Blog</p>
          </Link>
          <Link href={"/"}>
            <p className="text-sm font-medium">Team</p>
          </Link>
          <Link href={"/"}>
            <p className="text-sm font-medium">FAQs</p>
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="text-base font-semibold">Legal</h2>
          <Link href={"/"}>
            <p className="text-sm font-medium mt-2">Privacy Policy</p>
          </Link>
          <Link href={"/"}>
            <p className="text-sm font-medium">Terms & Conditions</p>
          </Link>
          <Link href={"/"}>
            <p className="text-sm font-medium">Cookie Policy</p>
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="text-base font-semibold">Contact Us</h2>
          <Link href={"/"}>
            <p className="text-sm font-medium mt-2">Help & Support</p>
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="text-base font-semibold">Useful Links</h2>
          <Link href={"/"}>
            <p className="text-sm font-medium mt-2">Mobile App</p>
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="text-base font-semibold">Social Links</h2>
          <div className="mt-2 flex gap-1 justify-center">
            <Link href={"/"}>
              <FaXTwitter size={15} />
            </Link>
            <Link href={"/"}>
              <FaLinkedin size={15} />
            </Link>
            <Link href={"/"}>
              <FaInstagram size={15} />
            </Link>
            <Link href={"/"}>
              <AiOutlineFacebook size={15} />
            </Link>
            <Link href={"/"}>
              <IoLogoYoutube size={15} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-center">
          <Image
            src="/icons/hellothali-logo.png"
            alt="logo"
            width={40}
            height={40}
          />
          <p className="text-sm font-semibold flex items-center">
            <AiOutlineCopyrightCircle /> XYZ Pvt. Ltd
          </p>
        </div>
      </div>
      <div className="text-lg p-5">
        <p className="text-center text-sm font-medium">
          All Rights Reserved©{" "}
          <span className="underline cursor-pointer">hellothali.com</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
