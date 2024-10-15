"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import api from "../../api";

import { skills } from "../../components/Skills&Interests/constants";
import styles from "./style.module.css";

const ProjectForm = ({ title }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = JSON.parse(searchParams.get("projectData")) || {};
  const projectData = {
    title: data.title,
    description: data.description,
    skills_needed: data.skills_needed,
    budget: data.budget,
    duration: data.duration,
    bid_amount: data.bid_amount,
    type: data.type,
    exchange_for: data.exchange_for,
    experience_level: data.experience_level,
  };

  const [formData, setFormData] = useState(
    projectData || {
      title: "",
      description: "",
      skills_needed: [],
      budget: "",
      duration: "",
      bid_amount: "",
      type: "",
      exchange_for: "",
      experience_level: "",
    }
  );

  const [projectSkills, setProjectSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const skillsList = Object.values(skills).flat();

  const [isExchange, setIsExchange] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (title === "Edit Project") {
      setProjectSkills(projectData.skills_needed);
    }
  }, []);

  useEffect(() => {
    if (formData.type === "exchange") {
      setIsExchange(true);
    } else {
      setIsExchange(false);
      setFormData({ ...formData, exchange_for: "" });
    }
  }, [formData.type]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the value is a number
    const numberValue = isNaN(value) || value === "" ? value : parseInt(value);

    // Set the value in the formData state based on its type
    setFormData({
      ...formData,
      [name]: typeof numberValue === "number" ? numberValue : value,
    });
  };

  const handleSkillsChange = (newSkills) => {
    setProjectSkills(newSkills);
  };

  useEffect(() => {
    setFormData({ ...formData, skills_needed: projectSkills });
  }, [projectSkills]);

  const handleSuggestions = (value) => {
    setInputValue(value);
    if (!value) {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = skillsList.filter((skill) =>
      skill.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  // Handles adding selected suggestion to project skills
  const addSkill = (skill) => {
    if (!projectSkills.includes(skill)) {
      setProjectSkills([...projectSkills, skill]); // Add skill to tags
    }
    setSuggestions([]); // Clear suggestions
    setInputValue(""); // Clear the input field
  };

  const validateForm = () => {
    const requiredFields = isExchange
      ? [
          "exchange_for",
          "type",
          "bid_amount",
          "budget",
          "duration",
          "skills_needed",
          "description",
          "title",
        ]
      : [
          "type",
          "bid_amount",
          "budget",
          "duration",
          "skills_needed",
          "description",
          "title",
        ];
    let formIsValid = true;

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        const inputField = document.querySelector(
          `input[name="${field}"], textarea[name="${field}"], select[name="${field}"]`
        );
        if (inputField) {
          setError(
            `${field[0].toLocaleUpperCase()}${field
              .slice(1)
              .split("_")
              .join(" ")} is required`
          );
          inputField.focus();
          formIsValid = false;
          window.scrollTo({
            top: 0,
            behavior: "smooth", // This gives a smooth scrolling effect
          });
        }
      } else if (projectSkills.length === 0) {
        setError("Project skills are required");
        formIsValid = false;
        window.scrollTo({
          top: 0,
          behavior: "smooth", // This gives a smooth scrolling effect
        });
      } else {
        setError(null);
      }
    });

    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        if (title === "Edit Project") {
          await api.patch(
            `http://127.0.0.1:8000/api/projects/${data.id}/`,
            formData
          );
          router.push(
            `/dashboard/projects/${data.id}?title=${formData.title}&description=${formData.description}`
          );
        } else {
          await api.post("http://127.0.0.1:8000/api/projects/", formData);
          router.push("/dashboard/find-work/most-recent");
        }
      } catch (error) {
        setError(error.response.data.error);
        window.scrollTo({
          top: 0,
          behavior: "smooth", // This gives a smooth scrolling effect
        });
      }
    }
  };

  return (
    <>
      <h2 className="section-title">{title}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            minLength={5}
            placeholder="Enter a project title"
            defaultValue={formData.title}
            onChange={handleChange}
            style={{ fontFamily: "inherit" }}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Provide a detailed description about your project"
            minLength={20}
            defaultValue={formData.description}
            onChange={handleChange}
            style={{ fontFamily: "inherit" }}
          />
        </div>
        <div>
          <label htmlFor="skills_needed">Skills Needed</label>
          <TagsInput
            className={styles.tagsinput}
            value={projectSkills}
            onChange={handleSkillsChange}
            inputProps={{
              placeholder: "Add a skill",
            }}
            inputValue={inputValue}
            onChangeInput={handleSuggestions}
            maxTags={15}
            onlyUnique
            style={{ fontFamily: "inherit" }}
          />
          {suggestions.length > 0 && (
            <ul className={styles.suggestions}>
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => addSkill(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <small>
            Type and press enter to add skills you need for this project, max 15
            skills.
          </small>
        </div>
        <div>
          <label htmlFor="duration">Project Duration</label>
          <input
            type="number"
            name="duration"
            id="duration"
            min={1}
            max={365}
            placeholder="Enter number of days"
            defaultValue={formData.duration}
            onChange={handleChange}
            style={{ fontFamily: "inherit" }}
          />
          <small>Number of days you need to complete the project</small>
        </div>
        <div>
          <label htmlFor="budget">Budget</label>
          <input
            type="number"
            name="budget"
            id="budget"
            min={0}
            placeholder="Enter the budget in Ember"
            defaultValue={formData.budget}
            onChange={handleChange}
            style={{ fontFamily: "inherit" }}
          />
          <small>
            The number of Ember the freelancer will get after completion.
          </small>
        </div>
        <div>
          <label htmlFor="bid_amount">Bid Amount</label>
          <input
            type="number"
            id="bid_amount"
            name="bid_amount"
            placeholder="Enter bid amount"
            min={0}
            max={40}
            defaultValue={formData.bid_amount}
            onChange={handleChange}
            style={{ fontFamily: "inherit" }}
          />
          <small>
            This is the number of sparks freelancers will spend to apply for
            your project.
          </small>
        </div>
        <div>
          <label htmlFor="type">Project Type</label>
          <select
            name="type"
            id="type"
            defaultValue={formData.type}
            onChange={handleChange}
          >
            <option value="">Please select a project type</option>
            <option value="exchange">
              Skill Exchange (trade work for work)
            </option>
            <option value="freelancer">Normal (hire a freelancer)</option>
          </select>
          <small>
            Select "Skill Exchange" if you want to trade work, or "Normal" if
            you want to hire a freelancer for this project.
          </small>
        </div>
        <div>
          <label
            htmlFor="exchange_for"
            className={!isExchange ? styles.hide : ""}
          >
            What Skills do you want to exchange for?
          </label>
          <textarea
            id="exchange_for"
            name="exchange_for"
            placeholder="Describe what you can do in return for this project"
            defaultValue={formData.exchange_for}
            onChange={handleChange}
            disabled={!isExchange ? true : false}
            style={{ fontFamily: "inherit" }}
          ></textarea>
        </div>
        <div>
          <label htmlFor="experience_level">Preferred Experience Level</label>
          <select
            id="experience_level"
            name="experience_level"
            defaultValue={formData.experience_level}
            onChange={handleChange}
            // style={{ fontFamily: "Roboto" }}
          >
            <option value="">No preference</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default ProjectForm;
