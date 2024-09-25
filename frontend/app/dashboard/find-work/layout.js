import React from "react";
import { DashboardNavbar, DashboardSidebar } from "../../components";

import styles from "./style.module.css";

export const metadata = {
  title: "Find Work | Forge - Skill Exchange Platform",
  description:
    "Find work for your skills. Choose between skill exchange or hiring a freelancer for your project and set your budget, bid amount, and preferred experience level.",
  keywords:
    "find work, skill exchange, project form, bid amount, budget, Forge platform",
  robots: "index, follow",
};

export default function layout({ children }) {
  return (
    <>
      <DashboardNavbar />
      <div className={` container ${styles.container}`}>
        <DashboardSidebar />
        {children}
      </div>
    </>
  );
}
