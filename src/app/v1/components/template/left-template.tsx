import { Separator } from "@/components/ui/separator";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Sections from "../sections";
import EditSideBarSort from "../edit-sidebar-sort";
import { FooterV0 } from "@/components/component/footer-v0";
import { ThemeIcon } from "@/components/ThemeIcon";
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

export default function LeftTemplate({
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
          "flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 shadow-lg  min-h-svh bg-background",
          className
        )}
      >
        <aside className="max-h-svh lg:min-w-56 flex sm:flex-col items-center justify-between sm:justify-start  px-4 ">
          <div className=" sm:text-4xl sm:mb-4 relative">
            {name} <EditWebsiteName portfolioId={portfolioId} name={name} />
          </div>
          <TabsList className=" h-fit flex flex-row lg:flex-col gap-2 justify-start items-start bg-background group ">
            <div className="hidden sm:block">
              {items
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((item) => (
                  <TabsTrigger
                    key={item.id}
                    value={item.id}
                    className={cn(
                      buttonVariants({ variant: "link", size: "sm" }),

                      "bg-muted hover:bg-muted lg:w-full w-fit my-2"
                    )}
                  >
                    {item.title}
                  </TabsTrigger>
                ))}
            </div>

            <EditSideBarSort pages={items} />
            <div>
              <ThemeIcon />
            </div>
            <div className="flex sm:hidden justify-end  w-full">
              <div className="hidden sm:block">
                <ThemeIcon />
              </div>
              <MobileNav items={items} />
            </div>
          </TabsList>
        </aside>
        {items.map((item) => (
          <TabsContent
            key={item.id}
            value={item.id}
            className="w-full md:min-w-[200px]"
          >
            <Sections pageId={item.id} />
            <FooterV0 name={name} portfolioId={portfolioId} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
