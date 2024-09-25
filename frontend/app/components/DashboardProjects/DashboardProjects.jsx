"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import api from "../../api";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button/Button";
import { getTimeDifference } from "../../util";
import { LoadingContainer } from "..";

import { FaUser, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import ember from "../../assets/ember.png";
import styles from "./style.module.css";

const DashboardProjects = ({ apiUrl, userId }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedProjects, setSavedProjects] = useState([]);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(apiUrl);
      setProjects(response.data);
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
    setSavedProjects(response.data);
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

  const handleSearch = async () => {
    try {
      const response = await api.get(
        `http://127.0.0.1:8000/api/projects/search/?search=${encodeURIComponent(
          searchQuery
        )}`
      );
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      fetchProjects();
    }
  }, [searchQuery]);

  return (
    <div className={styles.projects}>
      {!isLoading ? (
        projects.length > 0 ? (
          projects.map((project, index) => {
            return (
              project.status === "open" &&
              !project.assigned_to && (
                <div key={index} className={styles.project}>
                  <span className={styles.date}>
                    {getTimeDifference(project.created_at)}
                  </span>
                  <Link href={`/dashboard/projects/${project.id}`}>
                    <h3>{project.title}</h3>
                  </Link>
                  <div className={styles.projectOwner}>
                    <span>
                      <Link
                        href={{
                          pathname: `/dashboard/profile/${project.owner}`,
                          query: {
                            username:
                              project.owner_first_name +
                              " " +
                              project.owner_last_name,
                            title: project.owner_title,
                          },
                        }}
                      >
                        <FaUser />
                        {project.owner_first_name} {project.owner_last_name}
                      </Link>
                    </span>
                    <span>
                      <IoLocationSharp />
                      {project.owner_location}
                    </span>
                  </div>
                  <p>
                    {project.description.slice(0, 300)}
                    {project.description.length > 300 && "..."}
                  </p>
                  <ul className={styles.skills}>
                    {project.skills_needed.map((skill, i) => {
                      return (
                        <li key={i}>
                          <Link
                            href={`/dashboard/find-work/most-recent?search=${skill.toLowerCase()}`}
                          >
                            {skill}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
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
          <LoadingContainer />
          <LoadingContainer />
        </>
      )}
    </div>
  );
};

export default DashboardProjects;
