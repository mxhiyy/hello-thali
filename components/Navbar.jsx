"use client";

import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";

import { Button } from "./ui/button";
import { NavbarLink } from "@/constants";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";

const Navbar = () => {
  const pathname = usePathname();
  const route = useRouter();
  const user = useSelector((state) => state.user);
  // const user = JSON.parse(localStorage.getItem("user"));
  const cartItems = useSelector((state) => state.cart.items);


  let greeting = "";
  if (user?.phoneNumber && user?.firstName) {
    greeting = `Hi ${user?.firstName}👋🏻`;
  } else if (user?.phoneNumber) {
    greeting = `Hi User👋🏻`;
  };

  const handleLogout = () => {
    route.push('/');
  }

  return (
    <nav className="p-3 w-full mb-5">
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
          <div className="sm:w-[300px] lg:w-[90%] flex justify-between ml-5">
            {NavbarLink.map((link) => {
              const isActive = pathname === link.route;
              return (
                <Link
                  key={link.label}
                  className={cn("text-black text-lg font-medium drop-shadow-2xl  cursor-pointer hover:text-green-5", {
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

        <div className={`flex items-center sm:w-[200px] ${greeting && ( 'lg:w-[35%]')} lg:w-[24%] justify-between`}>
          {/* {greeting && (
              <NavigationMenu>
                <NavigationMenuList >
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{greeting}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <Link  href={"/profile"}><NavigationMenuLink className={navigationMenuTriggerStyle()}>Profile Section</NavigationMenuLink></Link>
                      <Link href={"/orders"}><NavigationMenuLink className={navigationMenuTriggerStyle()}>Orders</NavigationMenuLink></Link>
                      <Link onClick={handleLogout} href={"/"} ><NavigationMenuLink className={navigationMenuTriggerStyle()}>Log Out</NavigationMenuLink></Link>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
          )} */}
          <Button className='flex items-center gap-3 bg-green-4 opacity-65  text-white font-medium text-base hover:opacity-90 hover:bg-green-4 hover:text-white'>
            <FaCartShopping size={25} />
            <div className="flex flex-col">
              <p className="text-xs font-medium">2 items</p>
              <p className="text-xs font-medium">₹198</p>
            </div>
          </Button>
          <Button className='bg-green-4 opacity-65 text-white font-medium text-base hover:opacity-90 hover:bg-green-4 hover:text-white'>Login</Button>
          <Button
            onClick={() => route.push("/contact-us")}
            className="bg-green-4 opacity-65  text-white font-medium text-base hover:opacity-90 hover:bg-green-4 hover:text-white"
          >
            Contact Us
          </Button>
        </div>
      </div>

      <MobileNav />
    </nav>
  );
};

export default Navbar;
