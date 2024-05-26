"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Edit2Icon, TrashIcon } from "lucide-react";
import { portfolios } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import TopHeaderSkelton from "./header-top-skelton";
import HeaderLeftSkelton from "./header-left-skelton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import DeleteDialog from "./delete-dialog";
import { deletePortfolio } from "@/app/server/portfolio";
import { toast } from "@/components/ui/use-toast";

export default function SiteCard({ portfolio }: { portfolio: portfolios }) {
  async function onDelete() {
    const { messg } = await deletePortfolio(portfolio.id);
    if (messg === "error") {
      toast({ title: messg, variant: "destructive" });
    } else {
      toast({ title: messg });
    }
  }
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
          <div className="flex justify-end items-center">
            <div className="flex gap-2">
              <Link
                href={`/v1/admin/${portfolio.id}`}
                className={cn(
                  buttonVariants({ size: "icon", variant: "outline" })
                )}
              >
                <Edit2Icon className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Link>
              <DeleteDialog callback={onDelete} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
