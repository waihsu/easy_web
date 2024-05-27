"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { TabsTrigger } from "@/components/ui/tabs";
import { EditPage } from "./edit-page";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    id: string;
    sortOrder: number;
    title: string;
  }[];
}

export function Navbar({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(" space-x-2 w-full hidden sm:flex", className)}
      {...props}
    >
      {items.map((item) => (
        <div key={item.id} className=" relative">
          <div className=" absolute top-0 right-0">
            <EditPage id={item.id} title={item.title} />
          </div>
          <TabsTrigger
            value={item.id}
            className={cn(
              buttonVariants({ variant: "link", size: "sm" }),

              "bg-background hover:bg-muted  w-fit "
            )}
          >
            {item.title}
          </TabsTrigger>
        </div>
      ))}
    </nav>
  );
}
