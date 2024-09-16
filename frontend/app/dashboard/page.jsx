"use client";
import React, { useState, useEffect } from "react";
import { DashboardNavbar, LoadingContainer } from "../components";
import { getTimeDifference } from "../util";
import api from "../api";
import Button from "../components/Button/Button";
import Link from "next/link";
import Image from "next/image";

import { FaUser } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ember from "../assets/ember.png";
import styles from "./style.module.css";

const Dashborad = () => {
  const [userData, setUserData] = useState({});
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [savedProjects, setSavedProjects] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const fetchUserData = async () => {
    try {
      const response = await api.get("http://127.0.0.1:8000/api/current-user/");
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSavedProjects = async () => {
    const response = await api.get(
      `http://127.0.0.1:8000/api/projects/user/${userData.id}/saved/`
    );
    setSavedProjects(response.data);
  };

  const isProjectSaved = (project) => {
    return savedProjects.some((savedProject) => savedProject.id === project.id);
  };

  const saveProject = async (project) => {
    try {
      const response = await api.patch(
        `http://127.0.1:8000/api/projects/user/${userData.id}/save_project/${project.id}/`
      );
      console.log(response.data.message);
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
    console.log(savedProjects);
  }, [savedProjects]);

  useEffect(() => {
    if (userData.id) {
      fetchSavedProjects();
    }
  }, [userData.id]);

  const fetchProjects = async () => {
    const apiURL =
      activeTab === "all"
        ? "http://127.0.0.1:8000/api/projects/"
        : activeTab === "matches"
        ? `http://127.0.0.1:8000/api/projects/user/${userData.id}/matches/`
        : `http://127.0.0.1:8000/api/projects/user/${userData.id}/saved/`;

    await api
      .get(apiURL)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchUserData(), fetchProjects()]).then(() => {
      setIsLoading(false);
    });
  }, [activeTab]);

  return (
    <>
      <DashboardNavbar />
      <div className="container">
        <section className={styles.dashboard}>
          <h1 className="section-title">
            {userData.first_name
              ? `Welcome Back ${userData.first_name}!`
              : "Welcome Back to the Forge!"}
          </h1>
          <p>Explore and manage all your projects in one place.</p>
          <ul className={styles.tabs}>
            <li
              onClick={() => handleTabClick("all")}
              className={activeTab === "all" ? styles.active : ""}
            >
              All Projects
            </li>
            <li
              onClick={() => handleTabClick("matches")}
              className={activeTab === "matches" ? styles.active : ""}
            >
              Best Matches
            </li>
            <li
              onClick={() => handleTabClick("saved")}
              className={activeTab === "saved" ? styles.active : ""}
            >
              Saved Projects
            </li>
          </ul>
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
                              {project.owner_first_name}{" "}
                              {project.owner_last_name}
                            </Link>
                          </span>
                          <span>
                            <IoLocationSharp />
                            {project.owner_location}
                          </span>
                        </div>
                        <p>{project.description.slice(0, 300) + "..."}</p>
                        <ul className={styles.skills}>
                          {project.skills_needed.map((skill, i) => {
                            return <li key={i}>{skill}</li>;
                          })}
                        </ul>
                        <span
                          onClick={() => saveProject(project)}
                          className={styles.save}
                        >
                          {isProjectSaved(project) ? (
                            <FaHeart />
                          ) : (
                            <FaRegHeart />
                          )}
                        </span>
                        <div className={styles.projectGroup}>
                          <span className={styles.budget}>
                            <Image
                              src={ember}
                              alt="ember"
                              width={30}
                              height={30}
                            />
                            {project.budget}
                          </span>
                          <span className={styles.btn}>
                            <Button href={`/dashboard/projects/${project.id}`}>
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
        </section>
      </div>
    </>
  );
};

export default Dashborad;
