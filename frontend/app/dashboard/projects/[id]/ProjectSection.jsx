"use client";
import React, { useState, useEffect } from "react";
import { LoadingContainer } from "../../../components";
import api from "../../../api";
import { getTimeDifference } from "../../../util";
import Image from "next/image";

import spark from "../../../assets/spark.png";
import ember from "../../../assets/ember.png";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import { FaUser, FaBrain, FaExchangeAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdBriefcase } from "react-icons/io";
import Button from "../../../components/Button/Button";

const ProjectSection = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [bids, setBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [isMyProject, setIsMyProject] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getProjectData();
    getProjectBids();
  }, []);

  const getProjectData = async () => {
    try {
      const response = await api.get(
        `http://127.0.0.1:8000/api/projects/${projectId}`
      );
      setProject(response.data);
    } catch (error) {
      console.log(error);
      router.push("/404");
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectBids = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `http://127.0.0.1:8000/api/projects/${projectId}/bids`
      );
      setBids(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await api.get("http://127.0.0.1:8000/api/current-user/");
      setUserId(response.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
    if (userId === project?.owner) {
      setIsMyProject(true);
    }
  }, [userId, project]);

  return (
    <>
      <div className="container">
        {!isLoading ? (
          <div className={styles.projectContainer}>
            <aside className={styles.info}>
              <div className={styles.budget}>
                <h3>Budget</h3>
                <Image src={ember} alt="ember" width={50} height={50} />
                {project?.budget}
              </div>
              <div
                className={styles.spark}
                title="Amount needed to submit a bid for this project"
              >
                <h3>Sparks</h3>
                <Image src={spark} alt="Spark" width={50} height={50} />
                {project?.bid_amount}
              </div>
              {isMyProject ? (
                <Button
                  href={{
                    pathname: `/dashboard/projects/${project?.id}/edit`,
                    query: {
                      projectData: JSON.stringify(project),
                    },
                  }}
                >
                  Edit Project
                </Button>
              ) : (
                <Button href={`/dashboard/projects/${project?.id}/apply`}>
                  Apply now
                </Button>
              )}
              <ul>
                <h3>Project Owner</h3>
                <li>
                  <FaUser /> {project?.owner_first_name}{" "}
                  {project?.owner_last_name}
                </li>
                <li>
                  <IoMdBriefcase /> {project?.owner_title}
                </li>
                <li>
                  <IoLocationSharp /> {project?.owner_location}
                </li>
              </ul>
            </aside>
            <main>
              <span>Posted {getTimeDifference(project?.created_at)}</span>
              <h1>{project?.title}</h1>
              <div className={styles.content}>
                <p>{project?.description}</p>
              </div>
              {project?.experience_level && (
                <>
                  <div className={styles.levelContainer}>
                    <p className={styles.level}>
                      <FaBrain /> Preferred experience level:{" "}
                      <span>{project?.experience_level}</span>
                    </p>
                    <p className={styles.type}>
                      {project?.type === "freelancer" ? (
                        <FaUser />
                      ) : (
                        <FaExchangeAlt />
                      )}
                      Project type:{" "}
                      <span>
                        {project?.type === "freelancer"
                          ? "Hire a freelancer"
                          : "Skill Exchange"}
                      </span>
                    </p>
                  </div>
                </>
              )}
              <hr />
              <div className={styles.skills}>
                {project?.skills_needed.map((skill, index) => (
                  <span key={index}>{skill}</span>
                ))}
              </div>
              {project?.type === "exchange" && (
                <>
                  <hr />
                  <div className={styles.exchange}>
                    <h3>Exchange For</h3>
                    <p>{project.exchange_for}</p>
                  </div>
                </>
              )}
              <div>
                <hr />
                <h3>Proposals</h3>
                <ul>
                  {bids.length > 0 ? (
                    bids.map((bid) => (
                      <li key={bid.id} className={styles.bid}>
                        <span>{getTimeDifference(bid.created_at)}</span>
                        <h4>
                          {bid.bidder_first_name} {bid.bidder_last_name}
                        </h4>
                        <p>{bid.proposal}</p>
                        <p>Project completed in {bid.duration} days</p>
                        <p>
                          I want for this project
                          <Image
                            src={ember}
                            alt="ember"
                            width={40}
                            height={40}
                          />
                          <span>{bid.amount}</span>
                          Embers
                        </p>
                      </li>
                    ))
                  ) : (
                    <p className={styles.noBids}>No bids yet</p>
                  )}
                </ul>
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
