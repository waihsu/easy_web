import { auth } from "@/auth";
import { SignOut } from "@/components/signout-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "next-auth";
import React from "react";

export default async function page() {
  const session = await auth();
  const user = session?.user as User;
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">User Info</h3>
      </div>
      <Separator />
      <div className=" flex flex-col gap-2">
        <p className="text-xl">
          Name: <span className=" ml-10">{user.name}</span>
        </p>

        <p className="text-xl">
          Email: <span className=" ml-10">{user.email}</span>
        </p>
      </div>
      <SignOut />
    </div>
  );
}
