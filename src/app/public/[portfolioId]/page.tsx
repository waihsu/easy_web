import {
  getPagesByPortfolioId,
  getPortfolioById,
} from "@/app/server/portfolio";
import LeftTemplate from "@/app/v1/components/template/left-template";
import TopTemplate from "@/app/v1/components/template/top-template";
import React from "react";

export default async function page({
  params,
}: {
  params: { portfolioId: string };
}) {
  const { portfolioId } = params;
  const portfolio = await getPortfolioById(portfolioId);
  const pages = await getPagesByPortfolioId(portfolioId);
  const routes =
    pages &&
    pages.map((page) => ({
      id: page.id,
      title: page.title,
      sortOrder: page.sortOrder,
    }));
  if (!pages.length) return null;
  if (portfolio?.template === "top") {
    return (
      <div>
        <TopTemplate
          items={routes}
          name={portfolio?.name as string}
          className="container "
        />
      </div>
    );
  }
  return (
    <div>
      <LeftTemplate
        className="container"
        items={routes}
        name={portfolio?.name as string}
      />
    </div>
  );
}
