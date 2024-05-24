import { getCurrentUser } from "@/app/server/portfolio";
import { Button } from "@/components/ui/button";
import React from "react";
import { CreatePage } from "./create-page";
import { DropdownProfile } from "@/components/DropDownProfile";
import Link from "next/link";
import CopyLink from "./copy";

interface Props {
  name: string;
}

export default async function AdminNavbar({
  portfolioId,
}: {
  portfolioId: string;
}) {
  const user = await getCurrentUser();
  return (
    <div className=" min-w-full flex justify-between items-center  z-40 shadow-lg py-4 px-8 sticky top-0 backdrop-blur-sm bg-background">
      <div className="flex gap-3">
        <p className=" sm:text-4xl">{user?.name}</p>

        <CopyLink link={`http://localhost:3000/public/${portfolioId}`} />
      </div>
      <div>
        {user ? (
          <DropdownProfile user={user} />
        ) : (
          <span className=" cursor-pointer py-1 rounded-md px-3 text-xs border border-input bg-background shadow-sm hover:bg-accent hover:text-primary">
            <Link href={`/auth/signin`}>Login</Link>
          </span>
        )}
        <CreatePage portfolioId={portfolioId} />
      </div>
    </div>
  );
}
