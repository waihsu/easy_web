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
import MobileNav from "@/components/mobile-nav";
import { FooterV0 } from "@/components/component/footer-v0";

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
            <Link href={"/"}>
              <span className="text-3xl md:text-5xl font-bold text-primary">
                {name}
              </span>
            </Link>
            <Navbar items={items} />
            <EditSideBarSort pages={items} />
          </div>
          <div>
            <div className="hidden sm:block">
              <ThemeIcon />
            </div>
            <MobileNav />
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
