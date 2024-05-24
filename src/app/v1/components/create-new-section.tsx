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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { createSection } from "@/app/server/portfolio";
import { Prisma, SectionType } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";

const Sections = [
  {
    name: "Hero Section",
    items: [
      {
        type: SectionType.hero,
        version: "v0",
        image: "/hero-v0.png",
        customData: undefined,
      },
      {
        type: SectionType.hero,
        version: "v1",
        image: "/hero-v1.png",
        customData: undefined,
      },
      {
        type: SectionType.hero,
        version: "v2",
        image: "/hero-v2.png",
        customData: undefined,
      },
    ],
  },
  {
    name: "About Section",
    items: [
      {
        type: SectionType.about,
        version: "v0",
        image: "/about-v0.png",
        customData: undefined,
      },
      {
        type: SectionType.about,
        version: "v1",
        image: "/about-v1.png",
        customData: [{ key: "name", value: "UserName" }],
      },
      {
        type: SectionType.about,
        version: "v2",
        image: "/about-v2.png",
        customData: undefined,
      },
    ],
  },
];

export default function CreateNewSection({ pageId }: { pageId: string }) {
  const pathname = usePathname();
  console.log(pathname);
  const [open, setOpen] = useState(false);
  async function onSubmit({
    pageId,
    type,
    version,
    customData,
  }: {
    pageId: string;
    type: SectionType;
    version: string;
    customData?: [];
  }) {
    const { messg } = await createSection({
      pageId,
      type,
      version,
      customData,
    });
    if (messg === "error") {
      toast({ title: "Error" });
    } else {
      toast({ title: "successful" });
    }
  }
  return (
    <div
      className={
        pathname.startsWith("/v1")
          ? " w-full  border hover:border-dashed hover:border-primary flex justify-center items-center py-10"
          : "hidden"
      }
    >
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger asChild>
          <Button>Create New Section</Button>
        </DialogTrigger>
        <DialogContent className=" max-w-4xl max-h-dvh">
          <DialogHeader>
            <DialogTitle>What type of section do you want to add?</DialogTitle>
          </DialogHeader>
          <ScrollArea className=" h-[500px]  ">
            <Card className=" my-3">
              <CardContent>
                {Sections.map((section, index) => (
                  <div key={index}>
                    <h1 className=" text-2xl my-3">{section.name}</h1>
                    <div className=" grid md:grid-cols-2 ">
                      {section.items.map((item, index) => (
                        <SectionCard
                          setOpen={setOpen}
                          version={item.version}
                          onSubmint={() =>
                            onSubmit({
                              pageId,
                              type: item.type,
                              version: item.version,
                              customData: item.customData as [],
                            })
                          }
                          pageId={pageId}
                          image={item.image}
                          type={item.type}
                          key={index}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface Props {
  pageId: string;
  version: string;
  type: SectionType;
  image: string;
  onSubmint: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SectionCard({
  version,
  pageId,
  type,
  image,
  onSubmint,
  setOpen,
}: Props) {
  return (
    <Card
      className=" sm:max-w-sm h-56 relative flex flex-col"
      onClick={() => {
        onSubmint();
        setOpen(false);
      }}
    >
      <CardHeader>
        <CardTitle>
          <p>{version}</p>
        </CardTitle>
      </CardHeader>

      <div className=" sm:max-w-sm h-40 relative ">
        {" "}
        <Image
          src={image}
          alt="image"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
        />
      </div>
    </Card>
  );
}
