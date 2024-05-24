import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

export default function HeaderLeftSkelton() {
  return (
    <div className={cn(" flex flex-row min-h-[120px]")}>
      <aside className=" w-1/5 bg-primary relative ">
        <Skeleton className="w-full h-full  rounded-none" />
        <div className="flex flex-col items-center space-y-2 absolute top-4 left-2">
          <Skeleton className="h-1 w-8" />
          <Skeleton className="h-1 w-8 " />
          <Skeleton className="h-1 w-8 " />
          <Skeleton className="h-1 w-8 " />
        </div>
      </aside>
      <Skeleton className="w-full h-full " />
    </div>
  );
}
