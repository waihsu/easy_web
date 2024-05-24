import { Separator } from "@/components/ui/separator";
import React from "react";
import { SidebarNav } from "./setting/components/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/v1/dashboard",
  },
  {
    title: "Setting",
    href: "/v1/setting",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className=" space-y-6 p-10 pb-16 ">
        <div className="space-y-0.5">
          <h2 className="text-2xl sm:text-5xl font-bold tracking-tight">
            E Web
          </h2>
          <p className="text-muted-foreground">
            Create a website <span>FAST</span> and <span>EASY</span>.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 ">{children}</div>
        </div>
      </div>
    </>
  );
}
