import React from "react";
import { DashboardNavbar } from "../../components";

export default function Layout({ children }) {
  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
}
