"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Home from "./Home";
import About from "./About";

const items = [
  { name: "home", component: <Home /> },
  { name: "about", component: <About /> },
];

export default function Gallery() {
  const [name, setName] = useState("");
  return (
    <div
      className=" min-h-svh  min-w-full flex justify-center items-center py-10"
      id="gallery"
    >
      {items
        .filter((item) => item.name === name)
        .map((com) => (
          <div key={com.name}>{com.component}</div>
        ))}
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="flex">
            <div
              className="w-32 h-32 bg-green-400"
              onClick={() => setName("home")}
            ></div>

            <div
              className="w-32 h-32 bg-red-400"
              onClick={() => setName("about")}
            ></div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
