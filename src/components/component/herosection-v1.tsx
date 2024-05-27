"use client";
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Q9JGcIS1unO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Libre_Franklin } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'

libre_franklin({
  subsets: ['latin'],
  display: 'swap',
})

cormorant_garamond({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

import { deleteSection } from "@/app/server/portfolio";
import DeleteDialog from "@/app/v1/components/delete-dialog";
import EditHeroSection from "@/app/v1/components/edit-hero-section";
import { sections } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { toast } from "../ui/use-toast";
import { buttonVariants } from "../ui/button";

export function HeroSectionV1({ section }: { section: sections }) {
  async function onDelete() {
    const { messg } = await deleteSection(section.id);
    if (messg === "error") {
      toast({ title: messg, variant: "destructive" });
    } else {
      toast({ title: messg });
    }
  }
  return (
    <section
      className="relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat group"
      style={{
        backgroundImage: "\"url('/placeholder.svg')\"",
      }}
    >
      <Image
        alt="Mountains"
        src={section.image ? section.image : "/placeholder.svg"}
        // placeholder="blur"
        quality={100}
        priority
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
      <div className="absolute inset-0 bg-gray-900/70" />
      <div className="transition-all duration-300 delay-300 absolute right-0 top-0 hidden group-hover:block">
        <EditHeroSection section={section} />
        <DeleteDialog callback={onDelete} />
      </div>
      <div className="relative z-10 max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {section.title ? section.title : "Unlock the Power of Collaboration"}
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          {section.text
            ? section.text
            : "Streamline your team's workflow with our cutting-edge collaboration tools. Boost productivity, foster innovation, and take your projects to new heights."}
        </p>
        <div className="mt-10">
          <Link
            className={buttonVariants({ variant: "default" })}
            href={`https://${String(section.link)}`}
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
