import { Button } from "@/components/ui/button";
import React from "react";
import CreateNewWeb from "../../components/create-new-website";
import { auth } from "@/auth";
import { getPortfolios } from "@/app/server/portfolio";
import SiteCard from "../../components/site-card";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth();
  const portfolios = await getPortfolios();
  return (
    <div className=" ">
      <h1 className=" md:text-4xl">Your Sites</h1>
      <div className=" flex justify-end my-6">
        <CreateNewWeb />
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {portfolios &&
          portfolios.map((item) => (
            <div key={item.id} className=" min-w-[260px] ">
              <SiteCard portfolio={item} />
            </div>
          ))}
      </div>
    </div>
  );
}
