"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "../../api";
import Link from "next/link";
import Button from "../Button/Button";

import styles from "./style.module.css";
import spark from "../../assets/spark.png";

const DashboardSidebar = () => {
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await api.get("http://127.0.0.1:8000/api/current-user/");
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.addProject}>
        <Button href={"/dashboard/projects/add-project"}>Add Project</Button>
      </div>
      <div className={styles.sparks}>
        <div>
          <h3>Sparks</h3>
          <Image src={spark} alt="Spark" width={50} height={50} />
          <span>{userData.sparks}</span>
        </div>
        <ul>
          <li>
            <Link href={"/dashboard/transactions"}>View Details</Link>
          </li>
          <li>
            <Link href={"/add-sparks"}>Purchase Sparks</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
