"use client";
import React, { useState, useEffect } from "react";
import { DashboardNavbar } from "../../../components";
import api from "../../../api";

import styles from "./style.module.css";

const ProjectPage = ({ params }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    getProjectData();
  }, []);

  const getProjectData = async () => {
    try {
      const response = await api.get(
        `http://127.0.0.1:8000/api/projects/${params.id}`
      );
      setProject(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DashboardNavbar />
      <div className="container">
        {project ? (
          <div className={styles.projectContainer}></div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ProjectPage;
