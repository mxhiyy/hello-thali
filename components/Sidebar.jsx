'use client';

import React, { useState } from 'react';
import { userPage } from "@/constants";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { PiHandsPrayingFill } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import LogoutModal from '../components/LogoutModal';
import { useSelector } from 'react-redux';

const Sidebar = () => {

  const pathname = usePathname();
  const [ isOpen, setIsOpen ] = useState(false);
  const { profile } = useSelector((state) => state.user);
  const handleOpen = () => {
    setIsOpen(true);
  }

  return (
    <main className="w-[250px] h-auto">
        <div className="p-3 rounded-md flex flex-col gap-1 items-center  cursor-pointer">
          <h2 className="text-xl font-medium flex gap-2 items-center">
            <PiHandsPrayingFill className="text-yellow-400" size={20} />{" "}
            Namaste,
          </h2>
          <h2 className="text-xl font-medium flex gap-2 items-center">
            {profile? `HelloThali ${profile.firstName}` : `HelloThali User` }
          </h2>
        </div>
      <div className="mt-10 flex flex-col gap-3">
        {userPage.map((data) => {
          const isActive = pathname === data.route;
          return(
            <Link key={data.id} href={data.route}>
            <div className={cn("border-2 border-gray-6 rounded-md flex justify-between items-center p-3", { "shadow-lg" : isActive})}>
              {data.icon}
              <h2 className="font-medium text-xl" href={data.route}>
                {data.name}
              </h2>
              <FaChevronRight className="text-green-4" size={25} />
            </div>
          </Link>
          )
       })}
      </div>

      {/* ============= logout option ============ */}
        <div className={cn("border-2 border-gray-6 p-3 mt-3 rounded-md flex justify-between items-center cursor-pointer", { "shadow-lg" : isOpen === true })} onClick={handleOpen}>
          <IoLogOut size={30} className="text-green-4" />
          <h2 className="text-xl font-medium">Log Out</h2>
          <FaChevronRight className="text-green-4" size={25} />
        </div>

      {isOpen && ( <LogoutModal open={isOpen} setIsOpen={setIsOpen} />)}
    </main>
  );
};

export default Sidebar;
