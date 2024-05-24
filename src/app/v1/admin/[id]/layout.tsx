// import React from "react";
// import TopTemplate from "../../components/template/top-template";
// import {
//   getPagesByPortfolioId,
//   getPortfolioById,
// } from "@/app/server/portfolio";
// import LeftTemplate from "../../components/template/left-template";
// import AdminNavbar from "../../components/admin-navbar";

// export default async function layout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: { id: string };
// }) {
//   const { id } = params;
//   const portfolio = await getPortfolioById(id);
//   const pages = await getPagesByPortfolioId(id);
//   const routes = pages.map((page) => ({
//     id: page.id,
//     title: page.title,
//     href: page.url,
//   }));
//   if (portfolio?.template === "top") {
//     return (
//       <div>
//         <AdminNavbar />
//         <TopTemplate items={routes} className="container border border-primary">
//           {children}
//         </TopTemplate>
//       </div>
//     );
//   }
//   return (
//     <div>
//       <AdminNavbar />
//       <LeftTemplate
//         className="container"
//         items={routes}
//         name={portfolio?.name as string}
//       ></LeftTemplate>
//     </div>
//   );
// }
import React from "react";
import AdminNavbar from "../../components/admin-navbar";

export default function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  return (
    <div>
      <AdminNavbar portfolioId={id} />
      {children}
    </div>
  );
}
