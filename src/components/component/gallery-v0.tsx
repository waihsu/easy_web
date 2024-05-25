"use client";
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/1FYCkZiOJQv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { deleteSection } from "@/app/server/portfolio";
import AddItems from "@/app/v1/components/add-items";
import DeleteDialog from "@/app/v1/components/delete-dialog";
import EditAboutSection from "@/app/v1/components/edit-about-section";
import { items, sections } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import EditItems from "@/app/v1/components/edit-items";

export function GalleryV0({
  section,
  items,
}: {
  section: sections;
  items: items[];
}) {
  async function onDelete() {
    const { messg } = await deleteSection(section.id);
    if (messg === "error") {
      toast({ title: messg, variant: "destructive" });
    } else {
      toast({ title: messg });
    }
  }
  const keyStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 container group relative">
      <div className="hidden group-hover:flex justify-center  items-center transition-all duration-300 delay-300 absolute left-0 top-0">
        <AddItems section_id={section.id} />
      </div>
      <div className="transition-all duration-300 delay-300 absolute right-0 top-0 hidden group-hover:block">
        <EditAboutSection section={section} />
        <DeleteDialog callback={onDelete} />
      </div>
      <div className=" px-4 md:px-6">
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {section.title}
            </h2>
            <p className=" max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {section.text}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative group/item overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
          >
            <div className="hidden group-hover/item:block absolute z-40 bottom-0 right-0">
              <EditItems item={item} />
            </div>
            <Link className="absolute inset-0 z-10" href={String(item.link)}>
              <span className="sr-only">View</span>
            </Link>
            <Image
              alt="Image 1"
              placeholder="blur"
              blurDataURL={keyStr}
              loading="lazy"
              className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300 ease-in-out"
              height="400"
              src={item.image ? item.image : "/placeholder.svg"}
              style={{
                aspectRatio: "400/400",
                objectFit: "cover",
              }}
              width="400"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 ease-in-out" />
          </div>
        ))}
      </div>
    </section>
  );
}
