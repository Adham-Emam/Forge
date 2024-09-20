import React from "react";
import { ProtectedRoute } from "../components";
import { DashboardNavbar } from "../components";

export const metadata = {
  title: "Dashboard | Forge - Skill Exchange Platform",
  description:
    "Access your dashboard on Forge to manage your skills, track earnings, and connect with freelancers or clients. Forge offers a seamless way to exchange skills for embers and monetize your expertise.",
  keywords:
    "Forge, dashboard, skill exchange, freelancers, clients, embers, earnings, job management",
  robots: "index, follow",
};

export default function ProfileLayout({ children }) {
  return (
    <>
      <ProtectedRoute>
        <DashboardNavbar />
        {children}
      </ProtectedRoute>
    </>
  );
}
