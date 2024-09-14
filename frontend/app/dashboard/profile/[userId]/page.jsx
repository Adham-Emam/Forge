"use client";
import React, { useState, useEffect } from "react";
import api from "../../../api";
import { getTimeDifference } from "../../../util";
import Button from "../../../components/Button/Button";
import Link from "next/link";
import Image from "next/image";

import ember from "../../../assets/ember.png";
import {
  FaEdit,
  FaUser,
  FaGlobe,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaReddit,
} from "react-icons/fa";
import { TbBrandLinktree } from "react-icons/tb";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import { IoSchoolSharp } from "react-icons/io5";

import styles from "../style.module.css";
import { LoadingContainer } from "../../../components";

const Profile = ({ params }) => {
  const [userData, setUserData] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);

  const isCurrentUser = async () => {
    try {
      const response = await api.get("http://127.0.0.1:8000/api/current-user/");
      const currentUserId = response.data.id;
      setCurrentUser(currentUserId == params.userId);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await api.get(
        `http://127.0.0.1:8000/api/users/${params.userId}/`
      );
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserProjects = async () => {
    try {
      const response = await api.get(
        `http://127.0.0.1:8000/api/projects/user/${params.userId}/`
      );
      setUserProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([isCurrentUser(), fetchUserData(), fetchUserProjects()]).then(
      () => {
        setIsLoading(false);
        console.log(userData.user_title);
      }
    );
  }, []);

  return (
    <section className={`container ${styles.container}`}>
      {!isLoading ? (
        <div className={styles.profileInfoContainer}>
          <div className={styles.profilePic}>
            <span>
              {userData.first_name
                ? `${userData.first_name?.[0]}${userData.last_name?.[0]}`
                : ""}
            </span>
            {currentUser && (
              <span
                onClick={() => {
                  setPopupActive(true);
                }}
                className={styles.uploadPhoto}
              >
                <FaEdit />
              </span>
            )}
          </div>
          <div className={styles.profileInfo}>
            <h2>
              {userData.first_name} {userData.last_name}
            </h2>
            <span>{userData.user_title}</span>
            <div className={styles.otherInfo}>
              <p>
                <FaLocationDot /> {userData.country}
              </p>
            </div>
            <div className={styles.profileSocials}>
              {userData.website_url && (
                <a href={userData.website_url} target="_blank">
                  <FaGlobe />
                </a>
              )}
              {userData.github_profile && (
                <a href={userData.github_profile} target="_blank">
                  <FaGithub />
                </a>
              )}
              {userData.instagram_profile && (
                <a href={userData.instagram_profile} target="_blank">
                  <FaInstagram />
                </a>
              )}
              {userData.linkedin_profile && (
                <a href={userData.linkedin_profile} target="_blank">
                  <FaLinkedin />
                </a>
              )}
              {userData.reddit_profile && (
                <a href={userData.reddit_profile} target="_blank">
                  <FaReddit />
                </a>
              )}
              {userData.linktree_profile && (
                <a href={userData.linktree_profile} target="_blank">
                  <TbBrandLinktree />
                </a>
              )}
              {userData.twitter_profile && (
                <a href={userData.twitter_profile} target="_blank">
                  <FaXTwitter />
                </a>
              )}
            </div>
            {currentUser && (
              <Button
                className={styles.editBtn}
                href="/dashboard/forge-profile/"
              >
                <FaEdit />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      ) : (
        <LoadingContainer />
      )}
      <div className={styles.content}>
        <aside className={styles.aside}>
          {!isLoading ? (
            <>
              {userData.description && (
                <div className={styles.description}>
                  <h3>Description</h3>
                  <p>{userData.description}</p>
                </div>
              )}

              <h3>Skills</h3>
              <ul className={styles.sectionList}>
                {userData.skills?.map((skill, i) => {
                  return <li key={i}>{skill}</li>;
                })}
              </ul>
              <h3>Interests</h3>
              <ul className={styles.sectionList}>
                {userData.interests?.map((interest, i) => {
                  return <li key={i}>{interest}</li>;
                })}
              </ul>
              {userData.education && (
                <>
                  <h3>Education</h3>
                  {userData.education.map((education, i) => {
                    return (
                      <div key={i} className={styles.section}>
                        <span>
                          {education.start_date} -{" "}
                          {education.end_date ? education.end_date : "Now"}
                        </span>
                        <h4 style={{ textTransform: "capitalize" }}>
                          {education.institution}
                        </h4>
                        <p style={{ textTransform: "capitalize" }}>
                          <IoSchoolSharp /> {education.degree} in{" "}
                          {education.field_of_study}
                        </p>
                        {education.description && (
                          <p className={styles.sectionDescription}>
                            {education.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
              {userData.experience && (
                <>
                  <h3>Experience</h3>
                  {userData.experience.map((experience, i) => {
                    return (
                      <div key={i} className={styles.section}>
                        <span>
                          {experience.start_date} -{" "}
                          {experience.end_date ? experience.end_date : "Now"}
                        </span>
                        <h4 style={{ textTransform: "capitalize" }}>
                          {experience.title}
                        </h4>
                        <p style={{ textTransform: "capitalize" }}>
                          {experience.company_name}
                        </p>
                        <p>
                          <FaLocationDot /> {experience.location}
                        </p>
                        {experience.description && (
                          <p className={styles.sectionDescription}>
                            {experience.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </>
          ) : (
            <>
              <LoadingContainer circle={false} borderless />
              <LoadingContainer circle={false} borderless />
              <LoadingContainer circle={false} borderless />
            </>
          )}
        </aside>
        <div className={styles.userProjects}>
          <h3>Projects</h3>
          {!isLoading ? (
            Object.keys(userProjects).length > 0 ? (
              userProjects.map((project, index) => {
                return (
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
                        <FaLocationDot />
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
                );
              })
            ) : (
              <p className={styles.noProjects}>No projects found</p>
            )
          ) : (
            <>
              <LoadingContainer circle={false} />
              <LoadingContainer circle={false} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
