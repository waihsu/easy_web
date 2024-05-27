"use client";
import { sections, skills } from "@prisma/client";
import { SiAdobeaftereffects } from "react-icons/si";
import { SiAdobeaudition } from "react-icons/si";
import { SiAdobeillustrator } from "react-icons/si";
import { SiAdobeindesign } from "react-icons/si";
import { SiAdobephotoshop } from "react-icons/si";
import { SiAdobexd } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import { SiCss3 } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { SiMaterialformkdocs } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiMysql } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiPrisma } from "react-icons/si";
import { CreateSkill } from "@/app/v1/components/create-skill";
import { Card } from "../ui/card";
import { EditSkill } from "@/app/v1/components/edit-skill";
import EditAboutSection from "@/app/v1/components/edit-about-section";
import DeleteDialog from "@/app/v1/components/delete-dialog";
import { deleteSection } from "@/app/server/portfolio";
import { toast } from "../ui/use-toast";

export const icons = [
  { name: "Adobeaftereffect", icon: <SiAdobeaftereffects size={20} /> },
  { name: "Adobeaudition", icon: <SiAdobeaudition size={20} /> },
  { name: "Adobeillustrator", icon: <SiAdobeillustrator size={20} /> },
  { name: "Adobeindesign", icon: <SiAdobeindesign size={20} /> },
  { name: "Adobephotoshop", icon: <SiAdobephotoshop size={20} /> },
  { name: "Adobexd", icon: <SiAdobexd size={20} /> },
  { name: "Html", icon: <FaHtml5 size={20} /> },
  { name: "Css", icon: <SiCss3 size={20} /> },
  { name: "Tailwindcss", icon: <SiTailwindcss size={20} /> },
  { name: "Typescript", icon: <SiTypescript size={20} /> },
  { name: "Nodejs", icon: <FaNodeJs size={20} /> },
  { name: "Express", icon: <SiExpress size={20} /> },
  { name: "React", icon: <SiReact size={20} /> },
  { name: "Nextjs", icon: <RiNextjsFill size={20} /> },
  { name: "Materialiui", icon: <SiMaterialformkdocs size={20} /> },
  { name: "Postgresql", icon: <BiLogoPostgresql size={20} /> },
  { name: "Mysql", icon: <SiMysql size={20} /> },
  { name: "Mongodb", icon: <SiMongodb size={20} /> },
  { name: "Prisma", icon: <SiPrisma size={20} /> },
];

export function Skillsv0({
  section,
  skills,
}: {
  section: sections;
  skills: skills[];
}) {
  async function onDelete() {
    const { messg } = await deleteSection(section.id);
    if (messg === "error") {
      toast({ title: messg, variant: "destructive" });
    } else {
      toast({ title: messg });
    }
  }
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative group container">
      <div className="hidden group-hover:flex justify-center  items-center transition-all duration-300 delay-300 absolute left-0 top-0">
        <CreateSkill section_id={section.id} />
      </div>
      <div className="transition-all duration-300 delay-300 absolute right-0 top-0 hidden group-hover:block">
        <EditAboutSection section={section} />
        <DeleteDialog callback={onDelete} />
      </div>
      <div className="container  px-4 md:px-6">
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {section.title}
          </h2>
          <p className=" max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mb-2">
            {section.text}
          </p>
          <div className="grid sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {skills.map((item, index) => (
              <Card
                className="rounded-lg bg-card p-4 shadow-lg group/item relative"
                key={index}
              >
                <div className="hidden group-hover/item:block absolute bottom-0 right-0">
                  <EditSkill skill={item} />
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {icons.find((icon) => icon.name === item.name)?.icon}
                </div>
                <p className="mt-3 text-center text-sm font-medium uppercase">
                  {icons.find((icon) => icon.name === item.name)?.name}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
