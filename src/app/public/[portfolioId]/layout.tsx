import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <div className=" bg-background">{children}</div>;
}
