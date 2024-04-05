"use client";

import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";

import { Button } from "./ui/button";
import { NavbarLink } from "@/constants";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-green-1 p-3 w-screen">
      <div className="lg:w-4/5 m-auto hidden sm:flex items-center justify-between">
        <div className="sm:w-[350px] lg:w-[50%] xl:w-2/5 flex justify-end">
          {/* hello thali logo */}
          <div className=" sm:w-[300px] lg:w-3/4 flex justify-between">
            {NavbarLink.map((link) => {
              const isActive = pathname === link.route;
              return (
                <Link
                  key={link.label}
                  className={cn("text-slate cursor-pointer hover:text-white", {"text-white" : isActive})}
                  href={link.route}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center sm:w-[200px] lg:w-[23%] xl:1/5 justify-between">
          <div className="p-3 rounded-3xl bg-green-2 hover:bg-slate cursor-pointer">
            <FaSearch className="text-white hover:text-green-1" />
          </div>
          <div className="p-3 rounded-3xl bg-green-2 hover:bg-slate cursor-pointer">
            <FaCartShopping className="text-white hover:text-green-1" />
          </div>
          <Button className="bg-white text-green-1 font-semibold text-sm">
            Contact Us
          </Button>
        </div>
      </div>

      <MobileNav />
    </nav>
  );
};

export default Navbar;
