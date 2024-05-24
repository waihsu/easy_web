import React from "react";
import { ThemeIcon } from "./ThemeIcon";
import { FloatingNavDemo } from "./FloatingNav";
import NavLink from "./nav-link";
import MobileNav from "./mobile-nav";
import Link from "next/link";
import { DropdownProfile } from "./DropDownProfile";
import { auth } from "@/auth";
import { User } from "next-auth";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user as User;
  return (
    <div className=" min-w-full flex justify-between items-center  z-20 shadow-lg py-4 px-8 sticky top-0 backdrop-blur-sm bg-background/90  supports-[backdrop-filter]:bg-background/10">
      <div className=" flex gap-4">
        <MobileNav />
        <Link href={"/"}>
          <span className="hidden sm:block text-5xl font-bold text-primary">
            K
          </span>
        </Link>
        <NavLink />
      </div>
      {/* <FloatingNavDemo /> */}
      <div className="flex gap-2 items-center">
        {user ? (
          <DropdownProfile user={user} />
        ) : (
          <span className=" cursor-pointer py-1 rounded-md px-3 text-xs border border-input bg-background shadow-sm hover:bg-accent hover:text-primary">
            <Link href={`/auth/signin`}>Login</Link>
          </span>
        )}
        <ThemeIcon />
      </div>
    </div>
  );
}
