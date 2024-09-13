import React from "react";
import { DashboardNavbar } from "../../components";

export default function ProfileLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DashboardNavbar />
        {children}
      </body>
    </html>
  );
}
