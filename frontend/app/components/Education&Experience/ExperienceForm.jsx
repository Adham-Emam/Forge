"use client";
import React, { useState } from "react";
import { FaCheck, FaPlus, FaTrashAlt } from "react-icons/fa";
import styles from "./style.module.css";

const ExperienceForm = ({ formData, setFormData }) => {
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };
    if (!updatedFormData.experience) {
      updatedFormData.experience = [];
    }
    if (!updatedFormData.experience[index]) {
      updatedFormData.experience[index] = {};
    }
    updatedFormData.experience[index][name] = value;

    setFormData(updatedFormData);

    // Save the form data in local storage
    localStorage.setItem("forge-form-data", JSON.stringify(updatedFormData));
  };

  const [checkDate, setCheckDate] = useState(true);
  const handleCheckDate = () => setCheckDate(!checkDate);

  const addAnotherExperience = () => {
    // Check if all required fields are filled
    const requiredFields = ["title", "company_name", "location", "start_date"];

    for (let i = 0; i < requiredFields.length; i++) {
      const fieldName = requiredFields[i];
      const index = formData.experience.length - 1;
      const inputField = document.querySelector(`.${fieldName}-${index}`);
      if (inputField) {
        if (!inputField.value) {
          // Style the input with empty value
          inputField.style.border = "2px solid var(--forge-red) !important";
          inputField.focus();
          return;
        } else {
          // Remove the error style if the field is filled
          inputField.style.border = "";
        }
      }
    }

    const updatedFormData = { ...formData };
    if (!updatedFormData.experience) {
      updatedFormData.experience = [];
    }
    updatedFormData.experience.push({});
    setFormData(updatedFormData);

    // Save the form data in local storage
    localStorage.setItem("forge-form-data", JSON.stringify(updatedFormData));
  };

  return (
    <form className={styles.form}>
      <p>
        Required fields marked with <span style={{ color: "#d64545" }}>*</span>
      </p>
      {formData.experience &&
        formData.experience.map((experience, index) => (
          <div key={index} className={styles.addedSection}>
            <div className={styles.formGroup}>
              <div>
                <label htmlFor="title">
                  Title <span>*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  className={`title-${index}`}
                  name="title"
                  onChange={(e) => handleChange(e, index)}
                  value={experience.title || ""}
                  placeholder="Enter title of experience"
                  autoComplete="on"
                />
              </div>
              <div>
                <label htmlFor="company_name">
                  Company Name <span>*</span>
                </label>
                <input
                  type="text"
                  id="company_name"
                  className={`company_name-${index}`}
                  name="company_name"
                  onChange={(e) => handleChange(e, index)}
                  value={experience.company_name || ""}
                  autoComplete="on"
                  placeholder="Enter company name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="location">
                Location <span>*</span>
              </label>
              <input
                type="text"
                id="location"
                className={`location-${index}`}
                name="location"
                onChange={(e) => handleChange(e, index)}
                value={experience.location || ""}
                placeholder="Enter location"
                autoComplete="on"
              />
            </div>
            <div className={styles.formGroup}>
              <div>
                <label htmlFor="start_date">
                  Start Date <span>*</span>
                </label>
                <input
                  type="date"
                  id="start_date"
                  className={`start_date-${index}`}
                  name="start_date"
                  onChange={(e) => handleChange(e, index)}
                  min={"1900-01-01"}
                  max={new Date().toISOString().split("T")[0]}
                  value={experience.start_date || ""}
                  autoComplete="on"
                />
              </div>
              <div>
                <label
                  htmlFor="end_date"
                  style={{
                    opacity: checkDate && !experience.end_date ? 0.5 : 1,
                    transitionDuration: "0.3s",
                  }}
                >
                  End Date <span>*</span>
                </label>
                <input
                  type={checkDate && !experience.end_date ? "text" : "date"}
                  id="end_date"
                  className={`end_date-${index}`}
                  name="end_date"
                  onChange={(e) => handleChange(e, index)}
                  min={experience.start_date || "1900-01-01"}
                  value={
                    checkDate && !experience.end_date
                      ? "Now"
                      : experience.end_date
                  }
                  autoComplete="on"
                  disabled={checkDate && !experience.end_date ? true : false}
                />
              </div>
            </div>
            <div className={styles.checkdate}>
              <span
                className={`checkdate-${index} ${
                  checkDate && !experience.end_date ? styles.active : ""
                }`}
                onClick={() => {
                  const updatedFormData = { ...formData };
                  updatedFormData.experience[index].end_date = checkDate
                    ? ""
                    : null;
                  setFormData(updatedFormData);
                  handleCheckDate();
                }}
              >
                <FaCheck />
              </span>
              <p>You currently work there</p>
            </div>
            <div className={styles.textareaContainer}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className={`description-${index}`}
                onChange={(e) => handleChange(e, index)}
                value={experience.description || ""}
                placeholder="Add any additional details..."
                autoComplete="on"
                maxLength={5000}
              />
              <span className={styles.charCount}>
                {formData.experience[index] &&
                formData.experience[index].description
                  ? 5000 - formData.experience[index].description.length
                  : 5000} characters left
              </span>
            </div>
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => {
                const updatedFormData = { ...formData };
                updatedFormData.experience.splice(index, 1);
                setFormData(updatedFormData);
                localStorage.setItem(
                  "forge-form-data",
                  JSON.stringify(updatedFormData)
                );
              }}
            >
              Remove <FaTrashAlt />
            </button>
          </div>
        ))}
      <div>
        <button
          className={styles.addButton}
          type="button"
          onClick={addAnotherExperience}
        >
          Add Experience Section <FaPlus />
        </button>
      </div>
    </form>
  );
};

export default ExperienceForm;
