"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { ReactTyped } from "react-typed";

export default function AutoTypeBanner({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <ReactTyped
      className={cn(" text-xl md:text-3xl font-semibold font-serif", className)}
      strings={[text]}
      typeSpeed={60}
      backSpeed={20}
      loop
    />
  );
}
