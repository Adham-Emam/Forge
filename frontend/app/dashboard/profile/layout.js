import React from "react";
import { DashboardNavbar } from "../../components";

export default function ProfileLayout({ children }) {
  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
}
