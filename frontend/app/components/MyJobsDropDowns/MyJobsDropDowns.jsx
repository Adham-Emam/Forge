"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "../../api";
import { getTimeDifference } from "../../util";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiFillQuestionCircle } from "react-icons/ai";
import styles from "./style.module.css";

const MyJobsDropDowns = ({ title, hint, apiUrl, type, accept = false }) => {
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [activeAssignToPopup, setActiveAssignToPopup] = useState(false);
  const [activeDeletePopup, setActiveDeletePopup] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [projectId, setProjectId] = useState("");
  const [bidder, setBidder] = useState("");

  const fetchItems = async () => {
    try {
      const response = await api.get(apiUrl);
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const assignProject = async () => {
    try {
      await api.patch(`http://127.0.0.1:8000/api/projects/${projectId}/`, {
        assigned_to: bidder,
        status: "in_progress",
      });
      fetchItems();
      closePopup();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async () => {
    try {
      await api.delete(`http://127.0.0.1:8000/api/projects/${projectId}/`);
      fetchItems();
      closePopup();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssignToPopup = (item) => {
    setActiveAssignToPopup(true);
    setAssignedTo(`${item.bidder_first_name} ${item.bidder_last_name}`);
    setBidder(item.user);
    setProjectId(item.project);
  };

  const handleDeletePopup = (item) => {
    setActiveDeletePopup(true);
    setProjectId(item.id);
  };

  const closePopup = () => {
    setActiveAssignToPopup(false);
    setActiveDeletePopup(false);
    setAssignedTo("");
    setBidder("");
    setProjectId("");
  };

  useEffect(() => {
    if (apiUrl) {
      fetchItems();
    }
  }, [apiUrl]);

  return (
    <>
      {accept && (
        <>
          <div
            className={`${styles.overlay} ${
              activeAssignToPopup ? styles.active : ""
            }`}
          ></div>
          <div
            className={`${styles.popup} ${
              activeAssignToPopup ? styles.active : ""
            }`}
          >
            <h3>Assign Project</h3>
            <p>Are you sure you want to assign this project to {assignedTo}?</p>
            <div className={styles.buttons}>
              <button className={styles.btn} onClick={assignProject}>
                Yes
              </button>
              <button className={styles.btn} onClick={closePopup}>
                No
              </button>
            </div>
          </div>
        </>
      )}
      {activeDeletePopup && (
        <>
          <div
            className={`${styles.overlay} ${
              activeDeletePopup ? styles.active : ""
            }`}
          ></div>
          <div
            className={`${styles.popup} ${
              activeDeletePopup ? styles.active : ""
            }`}
          >
            <h3>Delete Project</h3>
            <p>Are you sure you want to delete this project?</p>
            <div className={styles.buttons}>
              <button className={styles.btn} onClick={deleteProject}>
                Yes
              </button>
              <button className={styles.btn} onClick={closePopup}>
                No
              </button>
            </div>
          </div>
        </>
      )}
      <div
        className={`${styles.dropdown} ${
          show && items.length > 0 ? styles.show : ""
        }`}
      >
        <div className={styles.head} onClick={() => setShow(!show)}>
          <h3>
            {title} ({items.length})
          </h3>
          {hint && (
            <div className={styles.hint}>
              <AiFillQuestionCircle />
              <span>{hint}</span>
            </div>
          )}
          {items.length > 0 && (
            <button
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </button>
          )}
        </div>
        {items.length > 0 && (
          <div className={styles.body}>
            {items.map((item, index) => (
              <div className={styles.item} key={index}>
                <span>{getTimeDifference(item.created_at)}</span>
                <Link
                  href={
                    type === "projects"
                      ? `/dashboard/projects/${item.id}?title=${item.title}&description=${item.description}`
                      : `/dashboard/projects/${item.project}?title=${item.project_title}&description=${item.project_description}`
                  }
                >
                  <h4>
                    {type === "projects" ? item.title : item.project_title}
                  </h4>
                </Link>
                <p>
                  {type === "projects"
                    ? item.description.length > 300
                      ? `${item.description.slice(0, 300)}...`
                      : item.description
                    : item.proposal.length > 300
                    ? `${item.proposal.slice(0, 300)}...`
                    : item.proposal}
                </p>
                {type === "proposals" && accept && (
                  <button
                    className={styles.btn}
                    onClick={() => handleAssignToPopup(item)}
                  >
                    Accept Proposal
                  </button>
                )}
                {type === "projects" && (
                  <Link
                    className={styles.edit}
                    href={`/dashboard/projects/${
                      item.id
                    }/edit?projectData=${JSON.stringify(item)}`}
                  >
                    <FaRegEdit />
                  </Link>
                )}
                {type === "projects" && (
                  <button
                    className={styles.delete}
                    onClick={() => {
                      handleDeletePopup(item);
                    }}
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyJobsDropDowns;
