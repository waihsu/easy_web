import React from "react";
import Image from "next/image";
import kaung from "../../public/kaung.png";
import AutoTypeBanner from "./AutoTypeBanner";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div
      className={cn("relative h-svh w-full flex justify-center items-center ")}
      id="home"
    >
      <div className=" flex justify-center items-center flex-wrap sm:flex-nowrap gap-3">
        <div className=" sm:w-1/2 flex flex-col justify-center items-end mb-20 space-y-8">
          <p className=" text-lg sm:text-xl">Hi There</p>
          <h1 className=" text-2xl xl:text-6xl font-extrabold text-primary">
            I am Kaung Khant Zaw
          </h1>
          {/* <AutoTypeBanner /> */}
        </div>
        <div className="sm:w-4/6 relative z-10 border-e-primary border-e border-b border-b-primary">
          <Image
            alt="Mountains"
            src={"/placeholder-image.svg"}
            // placeholder="blur"
            quality={100}
            // fill
            layout="responsive"
            sizes="100vw"
            // style={{
            //   objectFit: "cover",
            // }}
            className=" object-cover sm:object-contain "
            width={0}
            height={0}
          />
        </div>
      </div>
    </div>
  );
}
