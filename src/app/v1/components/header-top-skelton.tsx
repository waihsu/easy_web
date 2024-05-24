import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function TopHeaderSkelton() {
  return (
    <div className="min-h-[120px]">
      <aside className="bg-primary relative ">
        <Skeleton className="w-full h-8  rounded-none" />
        <div className="flex  items-center space-x-2 absolute top-4 left-2">
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
