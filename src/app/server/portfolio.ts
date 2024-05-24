"use server";

import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { Prisma, SectionType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getCurrentUser() {
  try {
    const session = await auth();
    const user = session?.user;
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function createPortfolio({
  name,
  template,
}: {
  name: string;
  template: string;
}) {
  try {
    const session = await auth();
    const user_id = session?.user.id;
    if (!user_id) return { messg: "error" };
    const newPortfolio = await prisma.portfolios.create({
      data: { name, userId: user_id, template },
    });
    const page = await prisma.pages.create({
      data: { portfolio_id: newPortfolio.id },
    });
    await prisma.sections.create({
      data: { page_id: page.id, type: "hero", version: "v0" },
    });
    return { newPortfolio };
  } catch (err) {
    console.log(err);
    return { messg: "error" };
  }
}

export async function getPortfolios() {
  try {
    const user = await getCurrentUser();
    if (!user) return [];
    const portfolios = await prisma.portfolios.findMany({
      where: { userId: user.id },
    });
    return portfolios;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getPortfolioById(id: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return null;
    const portfolio = await prisma.portfolios.findUnique({
      where: { id, userId: user.id },
    });
    return portfolio;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getPagesByPortfolioId(id: string) {
  try {
    const pages = await prisma.pages.findMany({
      where: { portfolio_id: id },
      select: {
        id: true,
        title: true,
        sortOrder: true,
      },
    });
    return pages;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getSectionsByPageId(page_id: string) {
  try {
    const secitons = await prisma.sections.findMany({
      where: { page_id },
      include: { items: true },
    });
    return secitons;
  } catch (err) {
    console.log(err);
    return [];
  }
}

// Section
export async function createSection({
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
  try {
    if (type === "projects") {
      const newSection = await prisma.sections.create({
        data: {
          page_id: pageId,
          type,
          version,
          title: "Our Creative Projects",
          text: "Explore our collection of visually stunning and innovative projects that showcase our design expertise.",
        },
      });
      await prisma.items.create({ data: { section_id: newSection.id } });
      revalidatePath(`/v1/admin/${pageId}`);
      return { messg: "successful" };
    }
    if (!customData) {
      const newSection = await prisma.sections.create({
        data: { page_id: pageId, type, version },
      });

      revalidatePath(`/v1/admin/${pageId}`);
      return { messg: "successful" };
    }

    const newSection = await prisma.sections.create({
      data: { page_id: pageId, type, version, customData },
    });
    revalidatePath(`/v1/admin/${pageId}`);
    return { messg: "successful" };
  } catch (err) {
    console.log(err);
    return { messg: "error" };
  }
}

export async function updateSection({
  id,
  title,
  text,
  image,
  customData,
}: {
  id: string;
  title: string;
  text: string;
  image?: string | undefined;
  customData?: { key: string; value: string }[];
}) {
  try {
    if (customData) {
      await prisma.sections.update({
        where: { id },
        data: { title, text, image, customData },
      });
      return { messg: "successful" };
    }
    await prisma.sections.update({
      where: { id },
      data: { title, text, image },
    });
    return { messg: "successful" };
  } catch (err) {
    console.log(err);
    return { messg: "error" };
  }
}

export async function deleteSection(id: string) {
  try {
    await prisma.sections.delete({ where: { id } });
    revalidatePath("/v1/admin");
    return { messg: "successful" };
  } catch (err) {
    console.log(err);
    return { messg: "error" };
  }
}

// Section Items

export async function createItems({
  section_id,
  name,
  description,
  link,
  image,
}: {
  section_id: string;
  name?: string;
  description?: string;
  link?: string;
  image?: string;
}) {
  try {
    await prisma.items.create({
      data: { section_id, name, description, link, image },
    });
    revalidatePath("/v1");
    return { messg: "successful" };
  } catch (err) {
    return { messg: "error" };
  }
}

// Page
export async function createPage({
  title,
  portfolioId,
}: {
  title: string;
  portfolioId: string;
}) {
  try {
    const newPage = await prisma.pages.create({
      data: { title, portfolio_id: portfolioId },
    });
    revalidatePath(`/v1/admin/${portfolioId}`);
    return { messg: "successful" };
  } catch (err) {
    console.log(err);
    return { messg: "error" };
  }
}

export async function updatePageOrder({
  pages,
}: {
  pages: { id: string; sortOrder: number }[];
}) {
  try {
    const updatepageorder = await prisma.$transaction(
      pages.map((page) =>
        prisma.pages.update({
          where: { id: page.id },
          data: { sortOrder: page.sortOrder },
        })
      )
    );
    revalidatePath("/v1/admin/");
    return { messg: "successful" };
  } catch (err) {
    return { messg: "error" };
  }
}
