"use client";
import React, { useState, useEffect } from "react";
import { LoadingContainer } from "../../../components";
import api from "../../../api";
import { getTimeDifference } from "../../../util";
import Image from "next/image";
import Link from "next/link";

import spark from "../../../assets/spark.png";
import ember from "../../../assets/ember.png";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdBriefcase } from "react-icons/io";
import Button from "../../../components/Button/Button";

const ProjectSection = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getProjectData();
  }, []);

  const getProjectData = async () => {
    try {
      const response = await api.get(
        `http://127.0.0.1:8000/api/projects/${projectId}`
      );
      setProject(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      router.push("/404");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        {!isLoading ? (
          <div className={styles.projectContainer}>
            <aside className={styles.info}>
              <div className={styles.budget}>
                <h3>Budget</h3>
                <Image src={ember} alt="ember" width={50} height={50} />
                {project.budget}
              </div>
              <div
                className={styles.spark}
                title="Amount needed to submit a bid for this project"
              >
                <h3>Sparks</h3>
                <Image src={spark} alt="Spark" width={50} height={50} />
                {project.bid_amount}
              </div>
              <Button href={`/dashboard/projects/${project.id}/apply`}>
                Apply now
              </Button>
              <ul>
                <h3>Project Owner</h3>
                <li>
                  <FaUser /> {project.owner_first_name}{" "}
                  {project.owner_last_name}
                </li>
                <li>
                  <IoMdBriefcase /> {project.owner_title}
                </li>
                <li>
                  <IoLocationSharp /> {project.owner_location}
                </li>
              </ul>
            </aside>
            <main>
              <span>{getTimeDifference(project.created_at)}</span>
              <h1>{project.title}</h1>
              <div className={styles.content}>
                <p>{project.description}</p>
              </div>
              <div className={styles.skills}>
                {project.skills_needed.map((skill, index) => (
                  <span key={index}>{skill}</span>
                ))}
              </div>
            </main>
          </div>
        ) : (
          <LoadingContainer borderless circle={false} />
        )}
      </div>
    </>
  );
};

export default ProjectSection;
