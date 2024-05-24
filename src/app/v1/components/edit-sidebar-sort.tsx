"use client";
import { updatePageOrder } from "@/app/server/portfolio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { pages } from "@prisma/client";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Reorder } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface sortProps {
  id: string;
  title: string;
  sortOrder: number;
}

export default function EditSideBarSort({ pages }: { pages: sortProps[] }) {
  const pathname = usePathname();
  const [items, setItems] = useState(pages);
  const handleReorder = async (newOrder: sortProps[]) => {
    setItems(newOrder);
    const orderedPages = newOrder.map((item, index) => ({
      id: item.id,
      sortOrder: index,
    }));
    const { messg } = await updatePageOrder({ pages: orderedPages });
    if (messg === "error") {
      toast({ title: messg });
    } else {
      toast({ title: messg });
    }
  };
  return (
    <div className={pathname.startsWith("/v1") ? "inline" : "hidden"}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className=" hidden group-hover:block transition-all duration-300 delay-300 "
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changes page order</DialogTitle>
            <DialogDescription>
              {" "}
              Drag and drop the pages to reorder them. The changes will be saved
              automatically.
            </DialogDescription>
          </DialogHeader>
          <Reorder.Group axis="y" values={items} onReorder={handleReorder}>
            {items.map((item, index) => (
              <Reorder.Item
                key={item.id}
                value={item}
                className="border border-border py-2 text-center my-1"
              >
                {item.title}
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </DialogContent>
      </Dialog>
    </div>
  );
}
