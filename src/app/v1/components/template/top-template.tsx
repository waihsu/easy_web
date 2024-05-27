import { Separator } from "@/components/ui/separator";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Sections from "../sections";
import EditSideBarSort from "../edit-sidebar-sort";
import { Navbar } from "../nav-bar";
import { ThemeIcon } from "@/components/ThemeIcon";
import Link from "next/link";
import { FooterV0 } from "@/components/component/footer-v0";
import MobileNav from "../mobile-navbar";
import { EditWebsiteName } from "../edit-website-name";

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  portfolioId: string;
  name: string;
  items: {
    id: string;
    title: string;
    sortOrder: number;
  }[];
}

export default function TopTemplate({
  portfolioId,
  className,
  children,
  items,
  name,
}: Props) {
  return (
    <>
      <Tabs
        defaultValue={String(items[0].id)}
        className={cn(
          "flex flex-col   shadow-lg  min-h-svh w-screen bg-background",
          className
        )}
      >
        <TabsList className=" w-full flex justify-between items-center sticky top-0 z-20 shadow-lg py-4 p-8  backdrop-blur-sm bg-background/90  supports-[backdrop-filter]:bg-background/10 group">
          <div className=" flex items-center gap-3">
            <div className=" sm:text-4xl  relative w-full flex justify-start ">
              <p className=" text-primary uppercase">{name}</p>
              <div className="">
                <EditWebsiteName portfolioId={portfolioId} name={name} />
              </div>
            </div>

            <Navbar items={items} />
            <EditSideBarSort pages={items} />
          </div>
          <div className=" flex items-center gap-3">
            <ThemeIcon />
            <MobileNav items={items} />
          </div>
        </TabsList>

        {items.map((item) => (
          <TabsContent
            key={item.id}
            value={item.id}
            className="w-full md:min-w-[200px] "
          >
            <Sections pageId={item.id} />
            <FooterV0 name={name} portfolioId={portfolioId} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
