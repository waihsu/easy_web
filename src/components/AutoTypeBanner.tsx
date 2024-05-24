"use client";
import React from "react";
import { ReactTyped } from "react-typed";

export default function AutoTypeBanner({ text }: { text: string }) {
  return (
    <ReactTyped
      className=" text-xl md:text-3xl font-semibold font-serif"
      strings={[text]}
      typeSpeed={60}
      backSpeed={20}
      loop
    />
  );
}
