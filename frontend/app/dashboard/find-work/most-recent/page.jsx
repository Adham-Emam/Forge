"use client";
import React, { useState, useEffect } from "react";
import { DashboardHead, DashboardProjects } from "../../../components";
import { useSearchParams } from "next/navigation";
import api from "../../../api";
import styles from "../style.module.css";

const MostRecent = () => {
  const [userId, setUserId] = useState(null);
  const [apiUrl, setApiUrl] = useState("http://127.0.0.1:8000/api/projects/");

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const projectType = searchParams.get("projectType") || "";
  const experienceLevel = searchParams.get("experienceLevel") || "";
  const budget = searchParams.get("budget") || "";
  const country = searchParams.get("country") || "";
  const proposals = searchParams.get("proposals") || "";
  const projectLength = searchParams.get("projectLength") || "";
  const clientHistory = searchParams.get("clientHistory") || "";

  const fetchUserId = async () => {
    try {
      const response = await api.get("http://127.0.0.1:8000/api/current-user/");
      setUserId(response.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.append("search", searchQuery);
    if (projectType) params.append("project_type", projectType);
    if (experienceLevel) params.append("experience_level", experienceLevel);
    if (budget) params.append("budget", budget);
    if (country) params.append("country", country);
    if (proposals) params.append("proposals", proposals);
    if (projectLength) params.append("project_length", projectLength);
    if (clientHistory) params.append("client_history", clientHistory);

    const queryString = params.toString();

    if (queryString) {
      setApiUrl(`http://127.0.0.1:8000/api/projects?${queryString}`);
    } else {
      setApiUrl("http://127.0.0.1:8000/api/projects/");
    }
  }, [
    searchParams,
    experienceLevel,
    budget,
    country,
    proposals,
    projectLength,
    clientHistory,
  ]);

  return (
    <div className={styles.dashboard}>
      <DashboardHead activeTab={"recent"} />
      {apiUrl && <DashboardProjects apiUrl={apiUrl} userId={userId} />}
    </div>
  );
};

export default MostRecent;
