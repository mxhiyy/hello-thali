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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { IoMdPerson } from "react-icons/io";
import { FaBagShopping } from "react-icons/fa6";
import { GrPlan } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import LogoutModal from "./LogoutModal";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { totalQuantity, totalDisplayPrice } = useSelector(
    (state) => state.cart
  );

  const handleClick = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="p-3 w-full bg-white mb-5 border-b-2 border-gray-4 z-50 sticky top-0">
      <div className="lg:w-[90%] m-auto hidden sm:flex items-center justify-between">
        <div className="sm:w-[350px] lg:w-[50%] xl:w-2/5 flex gap-20 items-center">
          {/* hello thali logo */}
          <Link href="/">
            <Image
              src="/icons/hellothali-logo.png"
              alt="logo"
              width={50}
              height={50}
            />
          </Link>
          <div className="sm:w-[300px] lg:w-[60%] flex gap-10 ">
            {NavbarLink.map((link) => {
              const isActive = pathname === link.route;
              return (
                <Link
                  key={link.label}
                  className={cn(
                    "text-black text-base font-medium drop-shadow-2xl  cursor-pointer hover:text-green-5",
                    {
                      "text-green-5": isActive,
                    }
                  )}
                  style={{ fontFamily: "Inter" }}
                  href={link.route}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div
          className={`flex items-center sm:w-[200px] ${
            totalQuantity >= 1 ? "lg:w-[32%]" : "lg:w-[25%]"
          } justify-between`}
        >
          <Link href={"/cart"}>
            <Button
              className={cn(
                "flex items-center gap-3 bg-gray-6 text-black font-medium text-base hover:opacity-90 hover:bg-green-4 hover:text-white",
                { "bg-green-4 text-white": pathname === "/cart" },
                { "bg-gray-6 text-black": open === true }
              )}
            >
              <FaCartShopping size={25} />
              {totalQuantity >= 1 && (
                <div className="flex flex-col">
                  <h1 className="text-xs font-medium">{totalQuantity} items</h1>
                  <h1 className="text-xs font-medium">₹ {totalDisplayPrice}</h1>
                </div>
              )}
            </Button>
          </Link>
          {token ? (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <p className="text-base font-medium">My Account</p>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <Link href={"/my-account/my-profile"}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <div className="flex w-full justify-center items-center gap-2 text-lg">
                          <IoMdPerson /> My Profile
                        </div>
                      </NavigationMenuLink>
                    </Link>
                    <Link href={"/my-account/my-orders"}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <div className="flex w-full justify-center items-center gap-2 text-lg">
                          <FaBagShopping /> My Orders
                        </div>
                      </NavigationMenuLink>
                    </Link>
                    <Link href={"/my-account/saved-address"}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <div className="flex w-full justify-center items-center gap-2 text-lg">
                          <FaLocationDot /> Saved Address
                        </div>
                      </NavigationMenuLink>
                    </Link>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <div
                        className="flex w-full justify-center items-center gap-2 text-lg cursor-pointer"
                        onClick={handleOpen}
                      >
                        <IoLogOut /> LogOut
                      </div>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ) : (
            // <Button
            //   className={cn("bg-gray-6 text-black font-medium text-base hover:opacity-90 hover:bg-green-4 hover:text-white", { "bg-green-4 text-white" : open === true })}
            //   onClick={handleClick}
            // >
            //   Login
            // </Button>
            <Button
              className={cn(
                "bg-gray-6 text-black font-medium text-base hover:opacity-90 hover:bg-green-4 hover:text-white",
                { "bg-green-4 text-white": open === true }
              )}
              onClick={handleClick}
            >
              Login
            </Button>
            //   <NavigationMenu>
            //   <NavigationMenuList>
            //     <NavigationMenuItem>
            //       <NavigationMenuTrigger>
            //         <p className="text-base font-medium">My Account</p>
            //       </NavigationMenuTrigger>
            //       <NavigationMenuContent>
            //         <Link href={"/my-account/my-profile"}>
            //           <NavigationMenuLink
            //             className={navigationMenuTriggerStyle()}
            //           >
            //             <div className="flex w-full justify-center items-center gap-2 text-lg"><IoMdPerson /> My Profile</div>
            //           </NavigationMenuLink>
            //         </Link>
            //         <Link href={"/my-account/my-orders"}>
            //           <NavigationMenuLink
            //             className={navigationMenuTriggerStyle()}
            //           >
            //              <div className="flex w-full justify-center items-center gap-2 text-lg"><FaBagShopping /> My Orders</div>
            //           </NavigationMenuLink>
            //         </Link>
            //         <Link href={"/my-account/my-plan"}>
            //           <NavigationMenuLink
            //             className={navigationMenuTriggerStyle()}
            //           >
            //           <div className="flex w-full justify-center items-center gap-2 text-lg"><GrPlan /> My Plan</div>
            //           </NavigationMenuLink>
            //         </Link>
            //         <Link href={"/my-account/saved-address"}>
            //           <NavigationMenuLink
            //             className={navigationMenuTriggerStyle()}
            //           >
            //           <div className="flex w-full justify-center items-center gap-2 text-lg"><FaLocationDot /> Saved Address</div>
            //           </NavigationMenuLink>
            //         </Link>
            //           <NavigationMenuLink
            //             className={navigationMenuTriggerStyle()}
            //           >
            //           <div className="flex w-full justify-center items-center gap-2 text-lg cursor-pointer" onClick={handleOpen}><IoLogOut /> LogOut</div>
            //           </NavigationMenuLink>
            //       </NavigationMenuContent>
            //     </NavigationMenuItem>
            //   </NavigationMenuList>
            // </NavigationMenu>
          )}
          {isOpen && <LogoutModal open={isOpen} setIsOpen={setIsOpen} />}
          {open && <LoginCard open={open} setOpen={setOpen} />}
          <Link href={"/contact-us"}>
            <Button
              className={cn(
                "bg-gray-6 text-black font-medium text-base hover:opacity-90 hover:bg-green-4 hover:text-white",
                { "bg-green-4 text-white": pathname === "/contact-us" },
                { "bg-gray-6 text-black": open === true }
              )}
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>

      <MobileNav />
    </nav>
  );
};

export default Navbar;
