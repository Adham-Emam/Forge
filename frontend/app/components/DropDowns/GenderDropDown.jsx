import React from "react";
import styles from "./style.module.css"; // Import the external CSS

const GenderDropdown = ({ selectedGender, handleChange }) => {
  const genders = ["Male", "Female", "Prefer not to say"];

  return (
    <select
      className={styles.dropdown}
      id="gender"
      name="gender"
      value={selectedGender}
      onChange={handleChange}
    >
      <option value="">Please choose a gender</option>
      {genders.map((gender, index) => (
        <option key={index} value={gender}>
          {gender}
        </option>
      ))}
    </select>
  );
};

export default GenderDropdown;
