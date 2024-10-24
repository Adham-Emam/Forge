"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "../../api";
import { getTimeDifference } from "../../util";

import { IoMdArrowDropdown, IoMdArrowDropup, IoMdClose } from "react-icons/io";
import { LuPartyPopper } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiFillQuestionCircle } from "react-icons/ai";
import styles from "./style.module.css";

const MyJobsDropDowns = ({
  title,
  hint,
  apiUrl,
  type,
  accept = false,
  finish = false,
}) => {
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [activeAssignToPopup, setActiveAssignToPopup] = useState(false);
  const [activeFinishPopup, setActiveFinishPopup] = useState(false);
  const [activeDeletePopup, setActiveDeletePopup] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [projectId, setProjectId] = useState("");
  const [bidder, setBidder] = useState("");
  const [confirmation, setConfirmation] = useState([]);

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
      await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}/`,
        {
          assigned_to: bidder,
          status: "in_progress",
        }
      );
      fetchItems();
      setActiveAssignToPopup(false);
      setConfirmation([
        "Project Assigned Successfully!",
        `The project has been assigned to ${assignedTo}.`,
        "The freelancer will now begin working on the project.",
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const requestApproval = async () => {
    try {
      await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}/request-approval/${bidder}/`
      );
      fetchItems();
      setActiveFinishPopup(false);
      setConfirmation([
        "Request Sent Successfully!",
        "Your request for project completion has been sent to the project owner.",
        " You will be notified once the project owner reviews and approves your request.",
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async () => {
    try {
      await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}/`
      );
      fetchItems();
      setActiveDeletePopup(false);
      setConfirmation([
        "Project Deleted Successfully!",
        "The project has been deleted and all associated data has been permanently removed.",
      ]);
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

  const handleFinishToPopup = (item) => {
    setActiveFinishPopup(true);
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
    setActiveFinishPopup(false);
    setConfirmation([]);
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
      <div
        className={`${styles.overlay} ${
          activeAssignToPopup ||
          activeFinishPopup ||
          activeDeletePopup ||
          confirmation.length > 0
            ? styles.active
            : ""
        }`}
      ></div>
      {confirmation.length > 0 && (
        <div
          className={`${styles.popup} ${
            confirmation.length > 0 ? styles.active : ""
          }`}
        >
          <div className={styles.icon}>
            <LuPartyPopper />
          </div>
          <h3>{confirmation[0]}</h3>
          <p>{confirmation[1]}</p>
          {confirmation[2] && <p>{confirmation[2]}</p>}
          <button
            className={styles.closeBtn}
            onClick={closePopup}
            aria-label="Close Popup"
          >
            <IoMdClose />
          </button>
        </div>
      )}
      {accept && (
        <div
          className={`${styles.popup} ${
            activeAssignToPopup ? styles.active : ""
          }`}
        >
          <h3>Assign Project to Freelancer</h3>
          <p>
            You are about to assign this project to {assignedTo}.
            <br />
            Once assigned, the freelancer will begin working on the project
            under the agreed terms.
          </p>
          <span>
            <strong>Note:</strong> Ensure the project details and deadlines are
            clearly defined before proceeding.
          </span>
          <div className={styles.buttons}>
            <button className={styles.btn} onClick={assignProject}>
              Assign
            </button>
            <button className={styles.btn} onClick={closePopup}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {activeFinishPopup && (
        <div
          className={`${styles.popup} ${
            activeFinishPopup ? styles.active : ""
          }`}
        >
          <h3>Request Project Completion</h3>
          <p>
            You are about to request the project owner to review the work and
            finalize the project.
            <br /> Once the owner approves, you will receive your payment.
          </p>
          <span>
            <strong>Note:</strong> Make sure all deliverables are submitted and
            the project is complete before proceeding.
          </span>
          <div className={styles.buttons}>
            <button className={styles.btn} onClick={requestApproval}>
              Confirm Request
            </button>
            <button className={styles.btn} onClick={closePopup}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {activeDeletePopup && (
        <div
          className={`${styles.popup} ${
            activeDeletePopup ? styles.active : ""
          }`}
        >
          <h3>Delete Project</h3>
          <p>
            Are you sure you want to delete this project?
            <br /> Once deleted, this action cannot be undone, and all
            associated data will be permanently removed.
          </p>
          <span>
            <strong>Note:</strong>
            This will not affect any payment transactions or proposals related
            to this project.
          </span>
          <div className={styles.buttons}>
            <button className={styles.btn} onClick={deleteProject}>
              Delete Project
            </button>
            <button className={styles.btn} onClick={closePopup}>
              Cancel
            </button>
          </div>
        </div>
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
              aria-label={`Show ${show ? "Less" : "More"}`}
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
                {type === "proposals" && finish && (
                  <button
                    className={styles.btn}
                    onClick={() => handleFinishToPopup(item)}
                  >
                    Submit for Final Approval
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
                    aria-label="Delete project"
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
