import { DashboardNavbar } from "../../../components";
import ProjectSection from "./ProjectSection";

export function generateMetadata({ searchParams }) {
  const { title, description } = searchParams;

  return {
    title: `${title} - Forge Skill Exchange Platform`,
    description: description,
  };
}

const ProjectPage = ({ params }) => {
  return (
    <>
      <ProjectSection projectId={params.id} />
    </>
  );
};

export default ProjectPage;
