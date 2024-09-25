"use client";
import React, { useState, useEffect } from "react";
import { DashboardHead, DashboardProjects } from "../../../components";
import api from "../../../api";
import styles from "../style.module.css";

const SavedProjects = () => {
  const [userId, setUserId] = useState();

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

  return (
    <div className={styles.dashboard}>
      <DashboardHead activeTab={"saved"} />
      <DashboardProjects
        apiUrl={`http://127.0.0.1:8000/api/projects/user/${userId}/saved/`}
        userId={userId}
      />
    </div>
  );
};

export default SavedProjects;
