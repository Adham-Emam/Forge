"use client";
import React, { useState, useEffect } from "react";
import { DashboardNavbar, LoadingContainer } from "../components";
import { getTimeDifference } from "../util";
import { useRouter } from "next/navigation";
import api from "../api";
import Button from "../components/Button/Button";
import Link from "next/link";
import Image from "next/image";

import { FaUser, FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import spark from "../assets/spark.png";
import ember from "../assets/ember.png";
import styles from "./style.module.css";

const Dashboard = ({ searchParams }) => {
  const [userData, setUserData] = useState({});
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedProjects, setSavedProjects] = useState([]);

  const router = useRouter();

  const activeTab = searchParams?.tab;
  const validTabs = ["recent", "matches", "saved"];

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
      const response = await api.post(
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
    if (!validTabs.includes(activeTab)) {
      router.push("/dashboard?tab=recent");
    }
    fetchUserData();
  }, [userData.id]);

  useEffect(() => {
    if (userData.id) {
      fetchSavedProjects(); // Fetch saved projects when userData is ready
    }
  }, [userData.id]);

  const fetchProjects = async () => {
    let apiURL =
      activeTab === "recent"
        ? "http://127.0.0.1:8000/api/projects/"
        : activeTab === "matches"
        ? `http://127.0.0.1:8000/api/projects/user/${userData.id}/matches/`
        : `http://127.0.0.1:8000/api/projects/user/${userData.id}/saved/`;

    try {
      setIsLoading(true);
      const response = await api.get(apiURL);
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData.id && activeTab) {
      // Ensure both userData and activeTab are ready
      fetchProjects();
    }
  }, [userData.id, activeTab]); // Fetch projects when both userData and activeTab are available

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = e.target[0].value;
    router.push(`/dashboard?tab=recent&search=${query}`);

    try {
      const response = await api.get(
        `http://127.0.0.1:8000/api/projects/search/?search=${encodeURIComponent(
          query
        )}`
      );
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`container ${styles.container}`}>
        <aside className={styles.sidebar}>
          <div className={styles.addProject}>
            <Button href={"/dashboard/projects/add-project"}>
              Add Project
            </Button>
          </div>
          <div className={styles.sparks}>
            <div>
              <h3>Sparks</h3>
              <Image src={spark} alt="Spark" width={50} height={50} />
              <span>{userData.sparks}</span>
            </div>
            <ul>
              <li>
                <Link href={"transactions"}>View Details</Link>
              </li>
              <li>
                <Link href={"/add-sparks"}>Purchase Sparks</Link>
              </li>
            </ul>
          </div>
        </aside>
        <section className={styles.dashboard}>
          <h1 className="section-title">
            {userData.first_name
              ? `Welcome Back ${userData.first_name}!`
              : "Welcome Back to the Forge!"}
          </h1>
          <p className={styles.tabDescription}>
            {activeTab === "recent"
              ? "See the latest projects posted on the platform."
              : activeTab === "matches"
              ? "Find projects that match your skills and interests."
              : "Access the projects you've saved for later."}
          </p>
          <ul className={styles.tabs}>
            <li>
              <Link
                href={`?tab=recent`}
                className={activeTab === "recent" ? styles.active : ""}
              >
                Most Recent
              </Link>
            </li>
            <li>
              <Link
                href={`?tab=matches`}
                className={activeTab === "matches" ? styles.active : ""}
              >
                Best Matches
              </Link>
            </li>
            <li>
              <Link
                href={`?tab=saved`}
                className={activeTab === "saved" ? styles.active : ""}
              >
                Saved Projects
              </Link>
            </li>
          </ul>
          <form className={styles.search} onSubmit={handleSearch}>
            <input
              type="text"
              name="search"
              placeholder="Search projects by skills or title..."
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
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
        </section>
      </div>
    </>
  );
};

export default Dashboard;
