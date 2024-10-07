"use client";
import React, { useState, useEffect } from "react";
import api from "../../api";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button/Button";
import { getTimeDifference } from "../../util";
import { LoadingContainer } from "..";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import ember from "../../assets/ember.png";
import styles from "./style.module.css";

const DashboardProjects = ({ apiUrl, userId }) => {
  const [userProjects, setUserProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedProjects, setSavedProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(apiUrl);
      setUserProjects(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSavedProjects = async () => {
    const response = await api.get(
      `http://127.0.0.1:8000/api/projects/user/${userId}/saved/`
    );
    setSavedProjects(response.data.results);
  };

  const isProjectSaved = (project) => {
    return savedProjects.some((savedProject) => savedProject.id === project.id);
  };

  const saveProject = async (project) => {
    try {
      await api.post(
        `http://127.0.1:8000/api/projects/user/save_project/${project.id}/`
      );
      setSavedProjects((prevState) =>
        prevState.some((savedProject) => savedProject.id === project.id)
          ? prevState.filter((savedProject) => savedProject.id !== project.id)
          : [...prevState, project]
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (apiUrl && userId) {
      fetchProjects();
      fetchSavedProjects();
    }
  }, [apiUrl, userId]);

  const proposalsCounter = (proposals) => {
    if (0 <= proposals <= 5) {
      return "Less than 5";
    } else if (5 < proposals <= 10) {
      return "6 to 10";
    } else if (10 < proposals <= 20) {
      return "11 to 20";
    } else if (20 < proposals <= 30) {
      return "21 to 30";
    } else if (30 < proposals <= 50) {
      return "31 to 50";
    } else {
      return "More than 50";
    }
  };

  return (
    <div className={styles.projects}>
      {!isLoading ? (
        userProjects.length > 0 ? (
          userProjects.map((project, index) => {
            return (
              project.status === "open" &&
              !project.assigned_to && (
                <div key={index} className={styles.project}>
                  <span className={styles.date}>
                    Posted {getTimeDifference(project.created_at)}
                  </span>
                  <Link href={`/dashboard/projects/${project.id}`}>
                    <h3>{project.title}</h3>
                  </Link>
                  <div className={styles.projectDetails}>
                    <span>
                      {project?.type === "freelancer"
                        ? "Hire a freelancer"
                        : "Skill Exchange"}
                      {" - "}
                      {project.experience_level}
                      {" - "}
                      {project.owner_location}
                    </span>
                  </div>
                  <p className={styles.ProjectDescription}>
                    {project.description.slice(0, 300)}
                    {project.description.length > 300 && "..."}
                  </p>
                  <ul className={styles.skills}>
                    {project.skills_needed.map((skill, i) => {
                      return (
                        <li key={i}>
                          <Link
                            href={`/dashboard/find-work/most-recent?q=${encodeURIComponent(
                              skill.toLowerCase()
                            )}`}
                          >
                            {skill}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <p>{proposalsCounter(project.bids)} proposals</p>
                  <span
                    onClick={() => saveProject(project)}
                    className={styles.save}
                  >
                    {isProjectSaved(project) ? <FaHeart /> : <FaRegHeart />}
                  </span>
                  <div className={styles.projectGroup}>
                    <span className={styles.budget}>
                      <Image src={ember} alt="ember" width={30} height={30} />
                      {project.budget}
                    </span>
                    <span className={styles.btn}>
                      <Button
                        href={{
                          pathname: `/dashboard/projects/${project.id}`,
                          query: {
                            title: project.title,
                            description: project.description,
                          },
                        }}
                      >
                        Browse Project
                      </Button>
                    </span>
                  </div>
                </div>
              )
            );
          })
        ) : (
          <div className={styles.noProjects}>
            <h3>No Projects Found</h3>
            <p>There are no projects. Create one now to get started.</p>
          </div>
        )
      ) : (
        <>
          <LoadingContainer circle={false} />
          <LoadingContainer circle={false} />
        </>
      )}
    </div>
  );
};

export default DashboardProjects;
