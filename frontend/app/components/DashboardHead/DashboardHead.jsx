"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../api";
import styles from "./style.module.css";
import { FaSearch } from "react-icons/fa";

const DashboardHead = ({ activeTab }) => {
  const [userData, setUserData] = useState({});
  const router = useRouter();

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

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = e.target[0].value;
    router.push(
      `/dashboard/find-work/most-recent?q=${encodeURIComponent(query)}`
    );
  };

  return (
    <div className={styles.DashboardHead}>
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
          {activeTab === "recent" ? (
            <span>Most Recent</span>
          ) : (
            <Link href={`/dashboard/find-work/most-recent`}>Most Recent</Link>
          )}
        </li>
        <li>
          {activeTab === "matches" ? (
            <span>Best Matches</span>
          ) : (
            <Link href={`/dashboard/find-work/best-matches`}>Best Matches</Link>
          )}
        </li>
        <li>
          {activeTab === "saved" ? (
            <span>Saved Projects</span>
          ) : (
            <Link href={`/dashboard/find-work/saved`}>Saved Projects</Link>
          )}
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
    </div>
  );
};

export default DashboardHead;
