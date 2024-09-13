'use client';
import React, { useEffect } from "react";
import styles from "./style.module.css";
import { skills, iconMap } from "./constants";

const Skills = ({ formData, setFormData }) => {
  const handleSkillClick = (skill) => {
    const updatedSkills = formData.skills.includes(skill)
      ? formData.skills.filter((s) => s !== skill) // If yes, remove it
      : [...formData.skills, skill]; // If no, add it

    // Update formData with the new skills array
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  useEffect(() => {
    localStorage.setItem("forge-form-data", JSON.stringify(formData));
  }, [formData]);

  const toggleActive = (e) => {
    const skillContainer = e.target;
    skillContainer.classList.toggle(styles.active);
  };

  return (
    <div className={styles.container}>
      {Object.keys(skills).map((category, index) => (
        <div
          key={index}
          className={styles.skillContainer}
          onClick={toggleActive}
        >
          <div className={styles.skillHead}>
            <div className={styles.icon}>{iconMap[category]}</div>
            <h3>
              {category.charAt(0).toUpperCase() +
                category.slice(1).split("_").join(" ")}
            </h3>
          </div>
          <ul>
            <div className={styles.skill}>
              {skills[category].map((skill, i) => (
                <li
                  className={
                    formData.skills.includes(skill) ? styles.active : null
                  }
                  key={i}
                  onClick={() => handleSkillClick(skill)}
                >
                  {skill}
                </li>
              ))}
            </div>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Skills;
