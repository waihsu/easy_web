import Image from "next/image";
import React from "react";
import kaung from "../../public/kaung.png";
import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const progresses = [
  { id: 1, label: "Photoshop", value: "w-3/5", icon: "ps" },
  { id: 2, label: "Illustrator", value: "w-3/5", icon: "ai" },
  { id: 3, label: "Adobe XD", value: "w-2/5", icon: "xd" },
];

export default function About({ className }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(" py-10 min-h-svh flex flex-col justify-center", className)}
      id="about"
    >
      <h1 className=" uppercase text-center text-2xl md:text-4xl font-semibold my-10">
        About
      </h1>
      <div className="grid md:grid-cols-2 gap-20 justify-center items-center ">
        <div className="sm:p-10 flex flex-col justify-evenly  h-full sm:border-s sm:border-t sm:border-s-primary sm:border-t-primary">
          <div className=" flex flex-col gap-4 mb-4">
            {progresses.map((item) => (
              <div key={item.id} className=" flex items-center gap-6">
                <div>
                  <Image
                    alt="image"
                    src={`https://skillicons.dev/icons?i=${item.icon}`}
                    width={50}
                    height={50}
                  />
                </div>
                <div className="w-full bg-card rounded-full h-3.5 dark:bg-gray-700">
                  <div
                    className={`bg-primary h-3.5 rounded-full ${item.value}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className=" grid grid-cols-2 sm:text-2xl">
            <div className=" flex flex-col gap-4 ">
              <div>
                <span>Gender</span>
              </div>
              <div>
                <span>Date of birth</span>
              </div>
              <div>
                <span>Nationalality</span>
              </div>
              <div>
                <span>Religion</span>
              </div>
              <div>
                <span>Martial Status</span>
              </div>
            </div>
            <div className=" flex flex-col gap-4">
              <div>
                <span>Male</span>
              </div>
              <div>
                <span>19.11.2001</span>
              </div>
              <div>
                <span>Myanmar</span>
              </div>
              <div>
                <span>Buddhist</span>
              </div>
              <div>
                <span>Single</span>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:p-10">
          <div className=" mb-4">
            <p className=" sm:text-2xl">
              I am <span className=" text-primary">Kaung Khant Zaw</span> . I am
              a junior Graphic Designer. I can make Facebook ads Design , Flayer
              Design , Business Card Design , Mockup Design , Vector
              Illustration , Logo Design etc.....
            </p>
          </div>
          <div className="flex">
            <div className=" min-w-fit my-auto">
              <p className=" text-xl mb-2">follow me :</p>
              <div className=" flex gap-4">
                <Link href={"https://www.facebook.com/kaung.k.zaw.144734"}>
                  <IconBrandFacebook
                    size={40}
                    stroke={2}
                    className=" text-primary hover:scale-125  transition-all delay-100 duration-200"
                  />
                </Link>
                <IconBrandInstagram
                  size={40}
                  stroke={2}
                  className=" text-primary  hover:scale-125 transition-all delay-100 duration-200"
                />
              </div>
            </div>
            <div className="">
              <Image alt="profile" src={kaung} layout="responsive" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
