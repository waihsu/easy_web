"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import ColorThemes from "./color-themes";
// import { ScrollArea } from "./ui/scroll-area";

export const sidebarNav = [
  {
    title: "Home",
    href: "/#home",
  },
  {
    title: "About",
    href: "/#about",
  },
  {
    title: "Gallery",
    href: "/#gallery",
  },
  {
    title: "Contact",
    href: "/#contact",
  },
  {
    title: "Setting",
    href: "/setting",
  },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  console.log(pathname);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <span className=" text-xl font-bold">KAUNG</span>

        {/* <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 "> */}
        <div className="flex flex-col space-y-3 ml-4 ">
          {sidebarNav?.map((item, index) => (
            <MobileLink
              pathname={pathname}
              key={index}
              href={item.href}
              onOpenChange={setOpen}
              // className={"text-primary"}
            >
              {item.title}
            </MobileLink>
          ))}
        </div>

        {/* </ScrollArea> */}
        <Separator className=" my-4" />
        <p className="mb-4">Themes</p>
        <ColorThemes setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  pathname: string;
}

function MobileLink({
  pathname,
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={
        (cn(className),
        pathname === href ? "text-primary" : "text-muted-foreground")
      }
      {...props}
    >
      {children}
    </Link>
  );
}
