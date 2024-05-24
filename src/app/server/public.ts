"use server";

import { prisma } from "@/db/prisma";

export async function getPortfolio({ portfolio_id }: { portfolio_id: string }) {
  try {
    const portfolio = await prisma.portfolios.findUnique({
      where: { id: portfolio_id },
    });
    return portfolio;
  } catch (err) {
    console.log(err);
    return null;
  }
}
