import React from "react";
import AddProjectForm from "../ProjectForm";

export const metadata = {
  title: "Post a New Project | Forge - Skills Exchange Platform",
  description:
    "Create a new project for freelancers to apply to. Choose between skill exchange or hiring a freelancer for your project and set your budget, bid amount, and preferred experience level.",
  keywords:
    "post project, hire freelancer, skill exchange, project form, bid amount, budget, Forge platform",
};

const AddProject = () => {
  return (
    <div className="container">
      <AddProjectForm title="Add Project" />
    </div>
  );
};

export default AddProject;
