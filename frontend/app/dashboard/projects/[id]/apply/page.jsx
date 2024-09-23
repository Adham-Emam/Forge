import React from "react";
import ApplyForm from "./ApplyForm";

export const metadata = {
  title: "Apply | Forge - Skill Exchange Platform",
  description:
    "Apply to join the project. Choose between skill exchange or hiring a freelancer for your project and set your budget, bid amount, and preferred experience level.",
  keywords:
    "apply to project, skill exchange, project form, bid amount, budget, Forge platform",
};

const Apply = ({ params }) => {
  return <ApplyForm projectId={params.id} />;
};

export default Apply;
