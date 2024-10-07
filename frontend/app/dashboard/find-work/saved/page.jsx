"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardHead, DashboardProjects } from "../../../components";
import api from "../../../api";
import styles from "../style.module.css";

const SavedProjects = () => {
  const [userId, setUserId] = useState(null);
  const [apiUrl, setApiUrl] = useState(null);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const pageSize = searchParams.get("page_size") || 10;
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

    if (page) params.append("page", page);
    if (pageSize) params.append("page_size", pageSize);
    if (projectType) params.append("project_type", projectType);
    if (experienceLevel) params.append("experience_level", experienceLevel);
    if (budget) params.append("budget", budget);
    if (country) params.append("country", country);
    if (proposals) params.append("proposals", proposals);
    if (projectLength) params.append("project_length", projectLength);
    if (clientHistory) params.append("client_history", clientHistory);

    const queryString = params.toString();

    if (userId) {
      if (queryString) {
        setApiUrl(
          `http://127.0.0.1:8000/api/projects/user/${userId}/saved/?${queryString}`
        );
      } else {
        setApiUrl(`http://127.0.0.1:8000/api/projects/user/${userId}/saved/`);
      }
    }
  }, [
    userId,
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
      <DashboardHead activeTab={"saved"} />
      {apiUrl && <DashboardProjects apiUrl={apiUrl} userId={userId} />}
    </div>
  );
};

export default SavedProjects;
