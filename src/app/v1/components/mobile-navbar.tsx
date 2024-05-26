"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ColorThemes from "@/components/color-themes";
import { TabsTrigger } from "@/components/ui/tabs";

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

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    id: string;
    sortOrder: number;
    title: string;
  }[];
}

export default function MobileNav({
  className,
  items,
  ...props
}: SidebarNavProps) {
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
          {items?.map((item, index) => (
            <MobileLink item={item} key={index} onOpenChange={setOpen}>
              {item.title}
            </MobileLink>
          ))}
        </div>

        <Separator className=" my-4" />
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  onOpenChange?: (open: boolean) => void;
  item: { id: string; sortOrder: number; title: string };
  children: string;
}

function MobileLink({ item, onOpenChange, children }: MobileLinkProps) {
  return (
    <TabsTrigger
      onClick={() => {
        onOpenChange?.(false);
      }}
      value={item.id}
      className={cn(
        buttonVariants({ variant: "link", size: "sm" }),

        "bg-background hover:bg-muted  w-full "
      )}
    >
      {children}
    </TabsTrigger>
  );
}
