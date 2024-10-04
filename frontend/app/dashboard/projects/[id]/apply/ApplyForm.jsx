"use client";
import React, { useState, useEffect } from "react";
import api from "../../../../api";
import { useRouter } from "next/navigation";

import styles from "./style.module.css";

const ApplyForm = ({ projectId }) => {
  const [formData, setFormData] = useState({
    projectId: projectId,
    amount: 0,
    duration: 0,
    proposal: "",
  });
  const [projectData, setProjectData] = useState({});
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the value is a number
    const numberValue = isNaN(value) ? value : parseInt(value);

    // Set the value in the formData state based on its type
    setFormData({
      ...formData,
      [name]: typeof numberValue === "number" ? numberValue : value,
    });
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await api.get(
          `http://127.0.0.1:8000/api/projects/${projectId}`
        );
        setProjectData(response.data);
      } catch (error) {
        console.log(error);
        router.push("/404");
      }
    };
    fetchProjectData();
  }, [projectId, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`http://127.0.0.1:8000/api/projects/${projectId}/bids/`, {
        ...formData,
      });
      router.push(
        `/dashboard/projects/${projectId}?title=${projectData.title}&description=${projectData.description}`
      );
      setError("");
    } catch (error) {
      if (error.response.data.duration) {
        setError(error.response.data.duration[0]);
        document.getElementById("duration").focus();
      } else if (error.response.data.error) {
        setError(error.response.data.error);
      } else if (error.response.data.error[0]) {
        setError(error.response.data.error[0]);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <h1 className="section-title">Craft Your Offer</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        <div>
          <label htmlFor="proposal">Proposal</label>
          <textarea
            type="text"
            name="proposal"
            id="proposal"
            placeholder="Type your proposal here"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Embers Amount</label>
          <input
            type="number"
            placeholder="Amount"
            name="amount"
            id="amount"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="duration">Duration (in days)</label>
          <input
            type="number"
            placeholder="Duration"
            name="duration"
            id="duration"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default ApplyForm;
