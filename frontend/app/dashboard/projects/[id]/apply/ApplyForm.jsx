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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`http://127.0.0.1:8000/api/projects/${projectId}/bids/`, {
        ...formData,
      });
      router.push("/dashboard/projects/" + projectId);
    } catch (error) {
      setError(error.response.data.error);
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
