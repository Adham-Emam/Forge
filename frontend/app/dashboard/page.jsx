"use client";
import React, { useState, useEffect } from "react";
import { DashboardNavbar, getTimeDifference } from "../components";
import api from "../api";
import Button from "../components/Button/Button";
import Link from "next/link";
import Image from "next/image";

import { FaUser } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import ember from "../assets/ember.png";
import styles from "./style.module.css";

const Dashborad = () => {
  const [userName, setUserName] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .get("http://127.0.0.1:8000/api/current-user/")
      .then((res) => {
        setUserName(`${res.data.first_name}.${res.data.last_name[0]}`);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    await api
      .get("http://127.0.0.1:8000/api/projects/")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <DashboardNavbar />
      <div className="container">
        <section className={styles.dashboard}>
          <h1 className="section-title">
            {userName ? `Welcome Back ${userName}!` : "Welcome Back to Forge!"}
          </h1>
          <p>Explore and manage all your projects in one place.</p>
          <div className={styles.projects}>
            {projects.map((project, index) => {
              return (
                project.status === "open" && (
                  <div key={index} className={styles.project}>
                    <span className={styles.date}>
                      {getTimeDifference(project.created_at)}
                    </span>
                    <Link href={`/dashboard/projects/${project.id}`}>
                      <h3>{project.title}</h3>
                    </Link>
                    <div className={styles.projectOwner}>
                      <span>
                        <Link href={`/dashboard/profile/${project.owner}`}>
                          <FaUser />
                          {project.owner_first_name} {project.owner_last_name}
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
                    <span className={styles.budget}>
                      <Image src={ember} alt="ember" width={30} height={30} />
                      {project.budget}
                    </span>
                    <span className={styles.btn}>
                      <Button href={`/dashboard/projects/${project.id}`}>
                        Browse Project
                      </Button>
                    </span>
                  </div>
                )
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashborad;
