import { Separator } from "@/components/ui/separator";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Sections from "../sections";
import EditSideBarSort from "../edit-sidebar-sort";

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  name: string;
  items: {
    id: string;
    title: string;
    sortOrder: number;
  }[];
}

export default function LeftTemplate({
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
          "flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 shadow-lg  min-h-svh ",
          className
        )}
      >
        <aside className="max-h-svh lg:min-w-56  border border-border px-4">
          <p className=" sm:text-4xl mb-4">{name[0]}</p>
          <TabsList className=" w-full h-fit flex flex-row lg:flex-col gap-2 justify-start items-start bg-background group">
            {items
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className={cn(
                    buttonVariants({ variant: "link", size: "sm" }),

                    "bg-muted hover:bg-muted lg:w-full w-fit"
                  )}
                >
                  {item.title}
                </TabsTrigger>
              ))}
            <EditSideBarSort pages={items} />
            {/* <Sidebar items={items} /> */}
          </TabsList>
        </aside>
        {items.map((item) => (
          <TabsContent
            key={item.id}
            value={item.id}
            className="w-full md:min-w-[200px]"
          >
            <Sections pageId={item.id} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
