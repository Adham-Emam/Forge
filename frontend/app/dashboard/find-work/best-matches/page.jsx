"use client";
import React, { useState, useEffect } from "react";
import { DashboardHead, DashboardProjects } from "../../../components";
import api from "../../../api";
import styles from "../style.module.css";

const BestMatch = () => {
  const [userData, setUserData] = useState();

  const fetchUserId = async () => {
    try {
      const response = await api.get("http://127.0.0.1:8000/api/current-user/");
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  return (
    <div className={styles.dashboard}>
      <DashboardHead activeTab={"matches"} />
      <DashboardProjects
        apiUrl={`http://127.0.0.1:8000/api/projects/user/${userData.id}/matches/`}
        userId={userData.id}
      />
    </div>
  );
};

export default BestMatch;
