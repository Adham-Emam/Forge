import React from "react";
import { DashboardNavbar } from "../../components";
import MyJobsSection from "./MyJobsSection";

export const metadata = {
  title: "My Jobs | Forge - Skill Exchange Platform",
  description:
    "View your jobs. Choose between skill exchange or hiring a freelancer for your project and set your budget, bid amount, and preferred experience level.",
  keywords:
    "my jobs, skill exchange, project form, bid amount, budget, Forge platform",
  robots: "index, follow",
};

const MyJobs = () => {
  return (
    <>
      <DashboardNavbar />
      <MyJobsSection />
    </>
  );
};

export default MyJobs;
