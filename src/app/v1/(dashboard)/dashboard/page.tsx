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
      <div className=" flex justify-end bg-blue-300">
        <CreateNewWeb />
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-3">
        {portfolios &&
          portfolios.map((item) => (
            <Link
              href={`/v1/admin/${item.id}`}
              key={item.id}
              className=" min-w-[260px] max-h-[200px]"
            >
              <SiteCard portfolio={item} />
            </Link>
          ))}
      </div>
    </div>
  );
}
