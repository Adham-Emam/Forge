import React from "react";
import { DashboardNavbar } from "../../../components";
import ProfileSection from "./ProfileSection";

export const generateMetadata = async ({ params, searchParams }) => {
  const { username, title } = searchParams;

  return {
    title: `${username} | ${title} Expert on Forge - Skill Exchange Platform`,
    description: `Check out ${username}'s profile on Forge. Skilled in ${title}, available for freelance projects and skill exchanges.`,
  };
};

export default function Profile({ params }) {
  return (
    <>
      <DashboardNavbar />
      <ProfileSection params={params} />
    </>
  );
}
