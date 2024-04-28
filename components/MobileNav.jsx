"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavbarLink } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <main className="w-[95vw] flex justify-between ">
      <Link href="/">
        <Image
          src="/icons/hellothali-logo.png"
          alt="logo"
          width={40}
          height={40}
          className="sm:hidden"
        />
      </Link>
      <section className="w-1/2 flex justify-end">
        <Sheet>
          <SheetTrigger asChild>
            <Image
              src="/icons/hamburger.svg"
              alt="menu-icon"
              width={36}
              height={36}
              className="cursor-pointer sm:hidden"
            />
          </SheetTrigger>
          <SheetContent side={"right"} className="bg-green-1 border-none">
            <div className="h-full flex flex-col justify-between items-center overflow-y-auto">
              <SheetClose asChild>
                <section className="flex h-full flex-col gap-8 pt-16 text-slate">
                  {NavbarLink.map((link) => {
                    const isActive = pathname === link.route;

                    return (
                      <SheetClose asChild key={link.route}>
                        <Link
                          href={link.route}
                          key={link.label}
                          className={cn(
                            "flex gap-8 items-center w-full max-w-60 text-3xl font-semibold hover:text-white",
                            { "text-white": isActive }
                          )}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </section>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </section>
    </main>
  );
};

export default MobileNav;
