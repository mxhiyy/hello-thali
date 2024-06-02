"use client";

import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import { Button } from "./ui/button";
import { NavbarLink } from "@/constants";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import LoginCard from "./Login";
import { useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);


  const handleClick = () => {
    setOpen(true);
  }

  const handleLogout = () => {
    dispatch(logout());
  }


  return (
    <nav className="p-3 w-full mb-5 border-b-2 border-gray-4">
      <div className="lg:w-[90%] m-auto hidden sm:flex items-center justify-between">
        <div className="sm:w-[350px] lg:w-[50%] xl:w-2/5 flex justify-between items-center">
          {/* hello thali logo */}
          <Link href="/">
            <Image
              src="/icons/hellothali-logo.png"
              alt="logo"
              width={50}
              height={50}
            />
          </Link>
          <div className="sm:w-[300px] lg:w-[90%] flex justify-between ml-10">
            {NavbarLink.map((link) => {
              const isActive = pathname === link.route;
              return (
                <Link
                  key={link.label}
                  className={cn("text-black text-base font-medium drop-shadow-2xl  cursor-pointer hover:text-green-5", {
                    "text-green-5": isActive,
                  })}
                  style={{ fontFamily: 'Inter'}}
                  href={link.route}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className={`flex items-center sm:w-[200px] lg:w-[24%] justify-between`}>
          <Link href={"/cart"}>
          <Button className='flex items-center gap-3 bg-green-4 text-white font-medium text-base hover:opacity-90 hover:bg-green-4 hover:text-white'>
            <FaCartShopping size={25} />
            <div className="flex flex-col">
              <p className="text-xs font-medium">2 items</p>
              <p className="text-xs font-medium">₹198</p>
            </div>
          </Button>
          </Link>
          {token ? (
            <NavigationMenu>
            <NavigationMenuList >
              <NavigationMenuItem>
                <NavigationMenuTrigger><p className="text-base font-mediume">Hi User</p></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Link  href={"/profile"}><NavigationMenuLink className={navigationMenuTriggerStyle()}>Profile Section</NavigationMenuLink></Link>
                  <Link href={"/orders"}><NavigationMenuLink className={navigationMenuTriggerStyle()}>Orders</NavigationMenuLink></Link>
                  <Link href={"/"} onClick={handleLogout}><NavigationMenuLink className={navigationMenuTriggerStyle()}>Log Out</NavigationMenuLink></Link>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          ) : (
            <Button className='bg-green-4 text-white font-medium text-base hover:opacity-90 hover:bg-green-4 hover:text-white' onClick={handleClick} >Login</Button>
          )} 
          {open && ( <LoginCard open={open} setOpen={setOpen} />)}
         <Link href={"/contact-us"}>
         <Button
            className="bg-green-4  text-white font-medium text-base hover:opacity-90 hover:bg-green-4 hover:text-white"
          >
            Contact Us
          </Button></Link>
        </div>
      </div>

      <MobileNav />
    </nav>
  );
};

export default Navbar;
