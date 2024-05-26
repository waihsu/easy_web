import { getSectionsByPageId } from "@/app/server/portfolio";
import React from "react";
import CreateNewSection from "./create-new-section";
import { items, sections, skills } from "@prisma/client";
import { HeroSectionV0 } from "@/components/component/herosection-v0";
import { HeroSectionV1 } from "@/components/component/herosection-v1";
import { HeroSectionV2 } from "@/components/component/herosection-v2";
import { AboutSectionV0 } from "@/components/component/aboutsection-v0";
import { AboutSectionV1 } from "@/components/component/aboutsection-v1";
import { AboutSectionV2 } from "@/components/component/aboutsection-v2";
import { ProjectsSectionV0 } from "@/components/component/projectsection-v0";
import { GalleryV0 } from "@/components/component/gallery-v0";
import { GalleryV1 } from "@/components/component/gallery-v1";
import { GalleryV2 } from "@/components/component/gallery-v2";
import { Skillsv0 } from "@/components/component/skills-v0";
import { Skillsv1 } from "@/components/component/skills-v1";
import { Skillsv2 } from "@/components/component/skills-v2";

export default async function Sections({ pageId }: { pageId: string }) {
  const sections = await getSectionsByPageId(pageId);
  // const sectionItems = await
  return (
    <div className=" w-full relative ">
      <div className="">
        <CreateNewSection pageId={pageId} />
      </div>
      {sections &&
        sections.map((section) =>
          renderSection({
            section,
            items: section.items,
            skills: section.skills,
          })
        )}
    </div>
  );
}

export const renderSection = ({
  section,
  items,
  skills,
}: {
  section: sections;
  items: items[];
  skills: skills[];
}) => {
  const { type, version } = section;
  if (type === "hero") {
    if (version === "v0")
      return <HeroSectionV0 key={section.id} section={section} />;
    if (version === "v1")
      return <HeroSectionV1 key={section.id} section={section} />;
    if (version === "v2")
      return <HeroSectionV2 key={section.id} section={section} />;
  } else if (type === "about") {
    if (version === "v0")
      return <AboutSectionV0 key={section.id} section={section} />;
    if (version === "v1")
      return <AboutSectionV1 key={section.id} section={section} />;
    if (version === "v2")
      return <AboutSectionV2 key={section.id} section={section} />;
  } else if (type === "projects") {
    if (version === "v0")
      return (
        <ProjectsSectionV0 key={section.id} section={section} items={items} />
      );
  } else if (type === "gallery") {
    if (version === "v0") {
      return <GalleryV0 key={section.id} section={section} items={items} />;
    }
    if (version === "v1") {
      return <GalleryV1 key={section.id} section={section} items={items} />;
    }
    if (version === "v2") {
      return <GalleryV2 key={section.id} section={section} items={items} />;
    }
  } else if (type === "skill") {
    if (version === "v0") {
      return <Skillsv0 key={section.id} section={section} skills={skills} />;
    }
    if (version === "v1") {
      return <Skillsv1 key={section.id} section={section} skills={skills} />;
    }
    if (version === "v2") {
      return <Skillsv2 key={section.id} section={section} skills={skills} />;
    }
  }

  return null;
};

// else if (type === "about") {
//   if (version === "v0")
//     return <AboutSectionV0 key={section.id} section={section} />;
//   if (version === "v1")
//     return <AboutSectionV1 key={section.id} section={section} />;
//   if (version === "v2")
//     return <AboutSectionV2 key={section.id} section={section} />;
// } else if (type === "projects") {
//   if (version === "v0")
//     return <ProjectsSectionV0 key={section.id} section={section} />;
//   if (version === "v1")
//     return <ProjectsSectionV1 key={section.id} section={section} />;
//   if (version === "v2")
//     return <ProjectsSectionV2 key={section.id} section={section} />;
// }
