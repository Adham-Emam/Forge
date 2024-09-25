import React from "react";
import ProjectForm from "../../ProjectForm";

export const metadata = {
  title: "Edit Project | Forge - Skill Exchange Platform",
  description:
    "Edit your project. Choose between skill exchange or hiring a freelancer for your project and set your budget, bid amount, and preferred experience level.",
  keywords:
    "edit project, skill exchange, project form, bid amount, budget, Forge platform",
};

const EditProject = () => {
  return (
    <div className="container">
      <ProjectForm title={"Edit Project"} />
    </div>
  );
};

export default EditProject;
