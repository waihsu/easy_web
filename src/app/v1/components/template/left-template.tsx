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
import { EditPage } from "../edit-page";

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
          <div className=" sm:text-4xl  relative w-full flex justify-start ">
            <p className=" text-primary uppercase">{name}</p>
            <div className="">
              <EditWebsiteName portfolioId={portfolioId} name={name} />
            </div>
          </div>
          <TabsList className=" h-fit flex flex-row lg:flex-col gap-2 justify-start items-start bg-background sm:w-full group ">
            <div className="hidden sm:block w-full">
              {items
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((item) => (
                  <div key={item.id} className=" relative ">
                    <div className=" absolute top-0 right-0">
                      <EditPage id={item.id} title={item.title} />
                    </div>
                    <TabsTrigger
                      value={item.id}
                      className={cn(
                        buttonVariants({ variant: "link", size: "sm" }),

                        "bg-muted hover:bg-muted-foreground lg:w-full w-fit my-2"
                      )}
                    >
                      {item.title}
                    </TabsTrigger>
                  </div>
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
              <MobileNav items={items} name={name} />
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
