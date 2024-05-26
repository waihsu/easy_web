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
    <div className=" bg-background">
      <AdminNavbar portfolioId={id} />
      {children}
    </div>
  );
}
