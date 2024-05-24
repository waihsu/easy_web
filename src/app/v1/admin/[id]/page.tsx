import React from "react";
import TopTemplate from "../../components/template/top-template";
import {
  getPagesByPortfolioId,
  getPortfolioById,
} from "@/app/server/portfolio";
import LeftTemplate from "../../components/template/left-template";
import AdminNavbar from "../../components/admin-navbar";

export default async function Portfolio({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const portfolio = await getPortfolioById(id);
  const pages = await getPagesByPortfolioId(id);
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
