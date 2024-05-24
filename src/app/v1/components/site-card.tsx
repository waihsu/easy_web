import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2Icon, TrashIcon } from "lucide-react";
import { portfolios } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import TopHeaderSkelton from "./header-top-skelton";
import HeaderLeftSkelton from "./header-left-skelton";

export default function SiteCard({ portfolio }: { portfolio: portfolios }) {
  return (
    <Card className="w-full max-w-sm rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col">
        <aside>
          {portfolio.template === "top" ? (
            <TopHeaderSkelton />
          ) : (
            <HeaderLeftSkelton />
          )}
        </aside>
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg font-semibold">{portfolio.name}</h3>
          <p className="text-gray-500 dark:text-gray-400">
            This is a sample card with a title, image, and description.
          </p>
          <div className="flex justify-between items-center">
            <Button variant="link">Learn More</Button>
            <div className="flex gap-2">
              <Button size="icon" variant="outline">
                <Edit2Icon className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button className="text-red-500" size="icon" variant="outline">
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
