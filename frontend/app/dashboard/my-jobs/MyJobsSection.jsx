"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import styles from "./style.module.css";
import { MyJobsDropDowns } from "../../components";

const MyJobsSection = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "proposals"
  );

  useEffect(() => {
    setActiveTab(searchParams.get("tab") || "proposals");
  }, [searchParams]);

  return (
    <div className={`container ${styles.container}`}>
      <h1 className="section-title">My Jobs</h1>
      <p>
        View your jobs. Chose between your applied projects or your hired
        projects, accept or decline bids, and more.
      </p>
      <ul className={styles.tabs}>
        <li className={activeTab === "proposals" ? styles.active : ""}>
          <Link href={"?tab=proposals"}>Proposals</Link>
        </li>
        <li className={activeTab === "projects" ? styles.active : ""}>
          <Link href={"?tab=projects"}>Projects</Link>
        </li>
      </ul>
      {activeTab === "proposals" && (
        <>
          <MyJobsDropDowns
            title="All proposals"
            apiUrl={`http://127.0.0.1:8000/api/projects/user/bids/`}
            type={activeTab}
          />
          <MyJobsDropDowns
            title="Pending proposals"
            hint="Proposals you applied but not yet accepted or declined."
            apiUrl={`http://127.0.0.1:8000/api/projects/user/bids/?status=open`}
            type={activeTab}
          />
          <MyJobsDropDowns
            title="Accepted proposals"
            hint="Proposals you were accepted by project owner."
            apiUrl={`http://127.0.0.1:8000/api/projects/user/bids/?status=in_progress`}
            type={activeTab}
          />
          <MyJobsDropDowns
            title="Proposals on my projects"
            hint="Proposals on your own projects."
            apiUrl={`http://127.0.0.1:8000/api/projects/user/bids/?owner=true`}
            type={activeTab}
          />
        </>
      )}
      {activeTab === "projects" && (
        <>
          <MyJobsDropDowns
            title="All projects"
            apiUrl={`http://127.0.0.1:8000/api/projects/user/`}
            type={activeTab}
          />
          <MyJobsDropDowns
            title="Pending projects"
            hint="Projects you created but not yet hired someone to do."
            type={activeTab}
            apiUrl={`http://127.0.0.1:8000/api/projects/user/?status=open`}
          />
          <MyJobsDropDowns
            title="Active projects"
            hint="Projects you hired someone to do."
            type={activeTab}
            apiUrl={`http://127.0.0.1:8000/api/projects/user/?status=in_progress`}
          />
          <MyJobsDropDowns
            title="In progress projects"
            hint="Projects you are currently working on."
            type={activeTab}
            apiUrl={`http://127.0.0.1:8000/api/projects/user/?status=my_in_progress`}
          />
          <MyJobsDropDowns
            title="Closed projects"
            type={activeTab}
            apiUrl={`http://127.0.0.1:8000/api/projects/user/?status=closed`}
          />
        </>
      )}
    </div>
  );
};

export default MyJobsSection;
