"use client";
import React, { useState, useEffect } from "react";
import api from "../../../api";
import { useRouter } from "next/navigation";
import Button from "../../../components/Button/Button";
import Image from "next/image";

import {
  FaEdit,
  FaGlobe,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaReddit,
} from "react-icons/fa";
import { TbBrandLinktree } from "react-icons/tb";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import { IoSchoolSharp, IoCloudUploadOutline, IoClose } from "react-icons/io5";

import styles from "../style.module.css";
import { LoadingContainer } from "../../../components";

const ProfileSection = ({ params }) => {
  const [userData, setUserData] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [popupActive, setPopupActive] = useState(false);

  const router = useRouter();

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
      router.push("/404");
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get(
        `http://127.0.0.1:8000/api/projects/${params.userId}/`
      );
      setUserProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchUserData(), isCurrentUser(), fetchProjects()]).then(
      () => {
        setIsLoading(false);
      }
    );
  }, []);

  const handleChange = (e) => {
    const newImage = e.target.files[0];

    const validExtensions = ["image/jpeg", "image/png", "image/jpg"];
    const isValidExtension = validExtensions.includes(newImage.type);
    const isValidSize = newImage.size < 5 * 1024 * 1024;

    if (!isValidExtension) {
      alert("The image must be a valid image file (jpeg, png, jpg).");
      return;
    } else if (!isValidSize) {
      alert("The image size must be less than 5mb.");
      return;
    }

    setProfileImage(newImage);
  };

  const uploadPhoto = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profile_image", profileImage);

    try {
      const response = await api.patch(
        `http://127.0.0.1:8000/api/current-user/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUserData((prevState) => ({
        ...prevState,
        profile_image: response.data.profile_image,
      }));
      fetchUserData();
    } catch (error) {
      console.log(error);
    } finally {
      setPopupActive(false);
    }
  };

  return (
    <>
      <section className={`container ${styles.container}`}>
        <div
          className={`${styles.overlay} ${popupActive ? styles.active : ""}`}
          onClick={() => setPopupActive(false)}
        ></div>
        <div className={`${styles.popup} ${popupActive ? styles.active : ""}`}>
          <IoClose onClick={() => setPopupActive(false)} />
          <form onSubmit={uploadPhoto}>
            <input
              type="file"
              name="profile_image"
              id="profile_image"
              accept="image/jpeg, image/png, image/jpg"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="profile_image">
              {profileImage ? (
                <Image
                  src={URL.createObjectURL(profileImage)}
                  alt="profile"
                  fill
                  sizes="(100px, 100px)"
                />
              ) : (
                <>
                  <IoCloudUploadOutline />
                  <span>Drag & Drop your photo here</span>
                  <span>or</span>
                  <span>Browse to upload from your device</span>
                  <span>
                    Only JPG, JPEG, PNG files are allowed with max size of 5MB
                  </span>
                </>
              )}
            </label>
            <button type="submit">Apply</button>
          </form>
        </div>
        {!isLoading ? (
          <div className={styles.profileInfoContainer}>
            <div className={styles.profilePic}>
              <span>
                {userData.profile_image ? (
                  <Image
                    src={userData.profile_image}
                    alt="profile"
                    fill
                    sizes="(100px, 100px)"
                    priority={true}
                  />
                ) : userData.first_name ? (
                  `${userData.first_name?.[0]}${userData.last_name?.[0]}`
                ) : (
                  ""
                )}
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
        </div>
      </section>
    </>
  );
};

export default ProfileSection;
