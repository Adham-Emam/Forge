"use client";
import React, { useEffect, useState } from "react";
import { FaCheck, FaPlus, FaTrashAlt } from "react-icons/fa";
import styles from "./style.module.css";

const EductaionForm = ({ formData, setFormData }) => {
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };
    if (!updatedFormData.education) {
      updatedFormData.education = [];
    }
    if (!updatedFormData.education[index]) {
      updatedFormData.education[index] = {};
    }
    updatedFormData.education[index][name] = value;

    setFormData(updatedFormData);

    // Save the form data in local storage
    localStorage.setItem("forge-form-data", JSON.stringify(updatedFormData));
  };

  const [checkDate, setCheckDate] = useState(true);
  const handleCheckDate = () => setCheckDate(!checkDate);
  const addAnotherEducation = () => {
    // Check if all required fields are filled
    const requiredFields = [
      "degree",
      "institution",
      "field_of_study",
      "start_date",
    ];

    for (let i = 0; i < requiredFields.length; i++) {
      const fieldName = requiredFields[i];
      const index = formData.education.length - 1;
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
    if (!updatedFormData.education) {
      updatedFormData.education = [];
    }
    updatedFormData.education.push({});
    setFormData(updatedFormData);

    // Save the form data in local storage
    localStorage.setItem("forge-form-data", JSON.stringify(updatedFormData));
  };

  return (
    <form className={styles.form}>
      <p>
        Required fields marked with <span style={{ color: "#d64545" }}>*</span>
      </p>
      {formData.education &&
        formData.education.map((education, index) => (
          <div key={index} className={styles.addedSection}>
            <div className={styles.formGroup}>
              <div>
                <label htmlFor="degree">
                  Degree <span>*</span>
                </label>
                <select
                  id="degree"
                  className={`degree-${index}`}
                  name="degree"
                  value={education.degree}
                  onChange={(e) => handleChange(e, index)}
                  autoComplete="on"
                >
                  <option value="">Select a degree</option>
                  <option value="bachelor">Bachelor</option>
                  <option value="master">Master</option>
                  <option value="phd">Ph.D.</option>
                  <option value="diploma">Diploma</option>
                  <option value="certificate">Certificate</option>
                </select>
              </div>
              <div>
                <label htmlFor="institution">
                  Institution <span>*</span>
                </label>
                <input
                  type="text"
                  id="institution"
                  className={`institution-${index}`}
                  name="institution"
                  onChange={(e) => handleChange(e, index)}
                  value={education.institution || ""}
                  placeholder="Enter institution name"
                  autoComplete="on"
                />
              </div>
            </div>
            <div>
              <label htmlFor="field_of_study">
                Field of Study <span>*</span>
              </label>
              <input
                type="text"
                id="field_of_study"
                className={`field_of_study-${index}`}
                name="field_of_study"
                onChange={(e) => handleChange(e, index)}
                value={education.field_of_study || ""}
                autoComplete="on"
                placeholder="Enter field of study"
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
                  value={education.start_date || ""}
                  autoComplete="on"
                />
              </div>
              <div>
                <label
                  htmlFor="end_date"
                  style={{
                    opacity: checkDate && !education.end_date ? 0.5 : 1,
                    transitionDuration: "0.3s",
                  }}
                >
                  End Date <span>*</span>
                </label>
                <input
                  type={checkDate && !education.end_date ? "text" : "date"}
                  id="end_date"
                  className={`end_date-${index}`}
                  name="end_date"
                  onChange={(e) => handleChange(e, index)}
                  min={education.start_date || "1900-01-01"}
                  value={
                    checkDate && !education.end_date
                      ? "Now"
                      : education.end_date
                  }
                  autoComplete="on"
                  disabled={checkDate && !education.end_date ? true : false}
                />
              </div>
            </div>
            <div className={styles.checkdate}>
              <span
                className={`checkdate-${index} ${
                  checkDate && !education.end_date ? styles.active : ""
                }`}
                onClick={() => {
                  const updatedFormData = { ...formData };
                  updatedFormData.education[index].end_date = checkDate
                    ? ""
                    : null;
                  setFormData(updatedFormData);
                  handleCheckDate();
                }}
              >
                <FaCheck />
              </span>
              <p>You currently study there</p>
            </div>
            <div className={styles.textareaContainer}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className={`description-${index}`}
                onChange={(e) => handleChange(e, index)}
                value={education.description || ""}
                placeholder="Add any additional details..."
                autoComplete="on"
                maxLength={5000}
              />
              <span className={styles.charCount}>
                {formData.education[index].description
                  ? 5000 - formData.education[index].description.length
                  : 5000} characters left
              </span>
            </div>
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => {
                const updatedFormData = { ...formData };
                updatedFormData.education.splice(index, 1);
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
          onClick={addAnotherEducation}
        >
          Add Education Section <FaPlus />
        </button>
      </div>
    </form>
  );
};

export default EductaionForm;
