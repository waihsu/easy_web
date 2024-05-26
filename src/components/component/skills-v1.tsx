/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Dqa7Bk4POsF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { sections, skills } from "@prisma/client";
import { icons } from "./skills-v0";
import { CreateSkill } from "@/app/v1/components/create-skill";
import { EditSkill } from "@/app/v1/components/edit-skill";
import { Card } from "../ui/card";

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
export function Skillsv1({
  section,
  skills,
}: {
  section: sections;
  skills: skills[];
}) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative group container">
      <div className="hidden group-hover:flex justify-center  items-center transition-all duration-300 delay-300 absolute left-0 top-0">
        <CreateSkill section_id={section.id} />
      </div>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {section.title}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              {section.text}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {skills.map((item) => (
            <Card
              key={item.id}
              className="bg-card relative group/item rounded-lg p-4 flex flex-col items-center justify-center gap-2"
            >
              <div className="hidden group-hover/item:block absolute bottom-0 right-0">
                <EditSkill skill={item} />
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {icons.find((icon) => icon.name === item.name)?.icon}
              </div>
              <span className="text-sm font-medium uppercase">
                {icons.find((icon) => icon.name === item.name)?.name}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}