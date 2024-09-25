"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "../../components";
import api from "../../api";
import styles from "./style.module.css";
import {
  CountryDropDown,
  GenderDropDown,
  CountryCodes,
  Skills,
  Interests,
  EducationForm,
  ExperienceForm,
} from "../../components";

import {
  FaGlobe,
  FaLinkedin,
  FaGithub,
  FaReddit,
  FaInstagram,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaGenderless,
  FaBirthdayCake,
  FaLaptopCode,
  FaHeart,
  FaLink,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandLinktree } from "react-icons/tb";
import { FiUser } from "react-icons/fi";

const forgeProfile = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_title: "",
    description: "",
    country_code: "",
    phone: "",
    country: "",
    state: "",
    gender: "",
    birth_date: "",
    education: [],
    experience: [],
    skills: [],
    interests: [],
    website_url: "",
    linkedin_profile: "",
    github_profile: "",
    twitter_profile: "",
    reddit_profile: "",
    instagram_profile: "",
    linktree_profile: "",
  });

  const router = useRouter();

  const fetchUser = async () => {
    try {
      const response = await api.get("http://127.0.0.1:8000/api/current-user/");
      Object.keys(formData).forEach((key) => {
        setFormData((prevState) => ({
          ...prevState,
          [key]: response.data[key],
        }));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem("forge-form-data");
    if (savedData) {
      setFormData(savedData ? JSON.parse(savedData) : {});
    } else {
      fetchUser();
    }
  }, []);

  const [error, setError] = useState(null);

  const validateForm = () => {
    // Check if all required fields are filled
    const requiredFields = [
      "first_name",
      "last_name",
      "user_title",
      "country_code",
      "phone",
      "country",
      "state",
      "gender",
      "birth_date",
      "skills",
      "interests",
    ];

    for (let i = 0; i < requiredFields.length; i++) {
      const fieldName = requiredFields[i];
      if (!formData[fieldName]) {
        // Style all empty form inputs with red border
        const inputField = document.querySelector(
          `input[name="${fieldName}"], select[name="${fieldName}"]`
        );
        if (inputField) {
          inputField.style.border = "2px solid var(--forge-red) !important";
          inputField.focus();

          // If a required field is empty, set an error message
          setError(
            `${
              fieldName[0].toLocaleUpperCase() +
              fieldName.slice(1).split("_").join(" ")
            } is required`
          );
          return false; // Exit the function
        }
      } else {
        // Clear the error style
        const inputField = document.querySelector(
          `input[name="${fieldName}"], select[name="${fieldName}"]`
        );
        if (inputField) {
          inputField.style.border = "";
        }
      }
    }

    if (step === 2) {
      const requiredFields = [
        "degree",
        "institution",
        "field_of_study",
        "start_date",
      ];

      const element = document.getElementById("container");

      for (let i = 0; i < formData.education.length; i++) {
        const item = formData.education[i];
        if (item.start_date < "1900-01-01") {
          setError("Start date is too old");
          element.scrollTo(0, 0);
          return false;
        }
        if (item.start_date > item.end_date && item.end_date) {
          setError("End date cannot be before start date");
          element.scrollTo(0, 0);
          return false;
        }
        if (item.start_date > new Date().toISOString().split("T")[0]) {
          setError("Start date cannot be in the future");
          element.scrollTo(0, 0);
          return false;
        }
        for (let j = 0; j < requiredFields.length; j++) {
          element.scrollTo(0, 0);
          const fieldName = requiredFields[j];

          if (!item[fieldName] || formData[fieldName] === "") {
            const element = document.getElementById("container");
            element.scrollTo(0, 0);

            // If a required field is empty, set an error message
            setError(
              `${
                fieldName[0].toLocaleUpperCase() +
                fieldName.slice(1).split("_").join(" ")
              } is required`
            );
            return false; // Exit the function
          }
        }
      }
    }

    if (step === 3) {
      const requiredFields = [
        "title",
        "company_name",
        "location",
        "start_date",
      ];

      const element = document.getElementById("container");

      for (let i = 0; i < formData.experience.length; i++) {
        const item = formData.experience[i];
        if (item.start_date < "1900-01-01") {
          setError("Start date is too old");
          element.scrollTo(0, 0);
          return false;
        }
        if (item.start_date > item.end_date && item.end_date) {
          setError("End date cannot be before start date");
          element.scrollTo(0, 0);
          return false;
        }
        if (item.start_date > new Date().toISOString().split("T")[0]) {
          setError("Start date cannot be in the future");
          element.scrollTo(0, 0);
          return false;
        }

        for (let j = 0; j < requiredFields.length; j++) {
          const fieldName = requiredFields[j];

          if (!item[fieldName] || formData[fieldName] === "") {
            element.scrollTo(0, 0);

            // If a required field is empty, set an error message
            setError(
              `${
                fieldName[0].toLocaleUpperCase() +
                fieldName.slice(1).split("_").join(" ")
              } is required`
            );
            return false; // Exit the function
          }
        }
      }
    }

    if (step == 4 && formData.skills.length < 3) {
      setError("You must select at least 3 items");
      // Scroll to the top
      const element = document.getElementById("container");
      if (element) {
        element.scrollTo(0, 0);
      }
      return false;
    }
    if (step == 5 && formData.interests.length < 3) {
      setError("You must select at least 3 items");
      // Scroll to the top
      const element = document.getElementById("container");
      if (element) {
        element.scrollTo(0, 0);
      }
      return false;
    }

    // Add validation for Step Six inputs
    const urlRegex =
      /^(https?:\/\/)?([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,6}))(:[0-9]{1,5})?(\/.*)?$/;

    const formUrls = [
      "website_url",
      "linkedin_profile",
      "github_profile",
      "twitter_profile",
      "reddit_profile",
      "instagram_profile",
      "linktree_profile",
    ];

    if (step == 6) {
      for (let i = 0; i < formUrls.length; i++) {
        const fieldName = formUrls[i];
        if (formData[fieldName] && !urlRegex.test(formData[fieldName])) {
          // Set the form input to focus
          const inputField = document.querySelector(
            `input[name="${fieldName}"]`
          );
          if (inputField) {
            inputField.focus();
            inputField.style.border = "2px solid var(--forge-red) !important";
          }
          // If a required field is empty, set an error message
          setError(
            `${
              fieldName[0].toLocaleUpperCase() +
              fieldName.slice(1).split("_").join(" ")
            } is not a valid URL`
          );
          return false; // Exit the function
        } else {
          // Clear the error style
          const inputField = document.querySelector(
            `input[name="${fieldName}"]`
          );
          if (inputField) {
            inputField.style.border = "";
          }
        }
      }
    }
    // If all required fields are filled, clear the error message
    setError(null);
    return true;
  };

  const steps = [1, 2, 3, 4, 5, 6, 7];
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (!validateForm()) {
      return;
    }
    setStep(step + 1);
  };
  const prevStep = () => {
    setError(null);
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };
    updatedFormData[name] = value;

    console.log(updatedFormData);
    setFormData(updatedFormData);

    // Save the form data in local storage
    localStorage.setItem("forge-form-data", JSON.stringify(updatedFormData));
  };

  useEffect(() => {
    const element = document.getElementById("container");
    if (element) {
      element.scrollTo(0, 0);
    }
  }, [step]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api
      .patch("http://127.0.0.1:8000/api/current-user/", formData)
      .then((response) => {
        // remove the local storage
        localStorage.removeItem("forge-form-data");

        console.log(`User updated successfully: ${response.data}`);

        // redirect to dashboard
        router.push("/dashboard/find-work/most-recent");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <ProtectedRoute>
      <div className={`container ${styles.container}`} id="container">
        <div className={styles.steps}>
          <div className={styles.stepsBar}>
            <span style={{ width: `${(step / steps.length) * 100}%` }}></span>
          </div>
          {steps.map((_, index) => (
            <span
              key={index}
              className={`${styles.step} ${
                step >= index + 1 ? styles.active : ""
              }`}
              onClick={() => {
                step >= index + 1 || (step === index && validateForm())
                  ? setStep(index + 1)
                  : null;
              }}
              style={{
                cursor:
                  step >= index + 1 || step + 1 === index + 1
                    ? "pointer"
                    : "no-drop",
              }}
            >
              {index + 1}
            </span>
          ))}
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.progress}>
          Step {step} out of {steps.length}
        </p>
        {step === 1 && (
          <StepOne handleChange={handleChange} formData={formData} />
        )}
        {step === 2 && (
          <StepTwo
            formData={formData}
            setFormData={setFormData}
            validateForm={validateForm}
          />
        )}
        {step === 3 && (
          <StepThree
            formData={formData}
            setFormData={setFormData}
            validateForm={validateForm}
          />
        )}
        {step === 4 && (
          <StepFour formData={formData} setFormData={setFormData} />
        )}
        {step === 5 && (
          <StepFive formData={formData} setFormData={setFormData} />
        )}
        {step === 6 && (
          <StepSix
            handleChange={handleChange}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 7 && <StepSeven formData={formData} />}
        <div className={styles.btns}>
          <button onClick={prevStep} disabled={step === 1}>
            Previous
          </button>
          <button onClick={nextStep} disabled={step === 7}>
            Next
          </button>
          {step === 7 && <button onClick={handleSubmit}>Submit</button>}
        </div>
      </div>
    </ProtectedRoute>
  );
};

const StepOne = ({ handleChange, formData }) => (
  <div className={styles.formContainer}>
    <h2 className="section-title">Forge Your Identity</h2>
    <p>Let’s Start with the Basics</p>
    <form className={styles.form}>
      <p>
        Required fields marked with <span style={{ color: "#d64545" }}>*</span>
      </p>
      <div className={styles.formGroup}>
        <div>
          <label htmlFor="firstName">
            First Name <span>*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="first_name"
            onChange={handleChange}
            autoComplete="on"
            value={formData.first_name}
          />
        </div>

        <div>
          <label htmlFor="lastName">
            Last Name <span>*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="last_name"
            onChange={handleChange}
            autoComplete="on"
            value={formData.last_name}
          />
        </div>
      </div>
      <div className={styles.formGroup}>
        <div>
          <label htmlFor="user_title">
            Title <span>*</span>
          </label>
          <input
            type="text"
            id="user_title"
            name="user_title"
            onChange={handleChange}
            autoComplete="on"
            value={formData.user_title}
          />
        </div>
      </div>
      <div className={styles.textareaContainer}>
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
          autoComplete="on"
          maxLength={5000}
          value={formData.description}
        />
        <span className={styles.charCount}>
          {5000 - formData.description.length} characters left
        </span>
      </div>

      <div>
        <label htmlFor="phoneNumber">
          Phone Number <span>*</span>
        </label>
        <div className={styles.countryCode}>
          <CountryCodes
            className={styles.dropdown}
            handleChange={handleChange}
            selectedCountry={formData.country_code}
          />
          <input
            type="text"
            id="phone"
            name="phone"
            onKeyDown={(e) => {
              if (
                e.key !== "Backspace" &&
                e.key !== "Tab" &&
                !e.key.match(/[0-9]/)
              ) {
                e.preventDefault();
              }
            }}
            onChange={handleChange}
            autoComplete="on"
            value={formData.phone}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <div>
          <label htmlFor="country">
            Country <span>*</span>
          </label>
          <CountryDropDown
            className={styles.dropdown}
            handleChange={handleChange}
            selectedCountry={formData.country}
          />
        </div>

        <div>
          <label htmlFor="state">
            State <span>*</span>
          </label>
          <input
            type="text"
            id="state"
            name="state"
            onChange={handleChange}
            autoComplete="on"
            value={formData.state}
          />
        </div>
      </div>

      <div>
        <label htmlFor="gender">
          Gender <span>*</span>
        </label>
        <GenderDropDown
          className={styles.dropdown}
          handleChange={handleChange}
          selectedGender={formData.gender}
        />
      </div>

      <div>
        <label htmlFor="birthDate">
          Birth Date <span>*</span>
        </label>
        <input
          type="date"
          id="birthDate"
          name="birth_date"
          min={"1900-01-01"}
          max={new Date().toISOString().split("T")[0]}
          onChange={handleChange}
          autoComplete="on"
          value={formData.birth_date}
        />
      </div>
    </form>
  </div>
);

const StepTwo = ({ formData, setFormData }) => (
  <div className={styles.formContainer}>
    <h2 className="section-title">Forge Your Knowledge</h2>
    <p>Tell Us About Your Academic Background</p>
    <EducationForm formData={formData} setFormData={setFormData} />
  </div>
);

const StepThree = ({ formData, setFormData }) => (
  <div className={styles.formContainer}>
    <h2 className="section-title">Forge Your Journey</h2>
    <p>Detail Your Past Experiences to Showcase Your Expertise</p>
    <ExperienceForm formData={formData} setFormData={setFormData} />
  </div>
);

const StepFour = ({ formData, setFormData }) => (
  <div className={styles.formContainer}>
    <h2 className="section-title">Forge Your Expertise</h2>
    <p>Select the Skills That Define Your Craftsmanship</p>
    <p>Select at least 3 skills</p>
    <Skills formData={formData} setFormData={setFormData} />
  </div>
);

const StepFive = ({ formData, setFormData }) => (
  <div className={styles.formContainer}>
    <h2 className="section-title">Forge Your Interests</h2>
    <p>Select the Skills You Want to Explore or Seek Assistance With</p>
    <p>Select at least 3 skills</p>
    <Interests formData={formData} setFormData={setFormData} />
  </div>
);

const StepSix = ({ handleChange, formData }) => (
  <div className={styles.formContainer}>
    <h2 className="section-title">Forge Your Connections</h2>
    <p>Share Your Social Media Links to Connect with the Community</p>
    <form className={`${styles.form} ${styles.socialLinks}`}>
      <div>
        <label htmlFor="website-url">
          <FaGlobe /> Website URL
        </label>
        <input
          type="text"
          id="website-url"
          name="website_url"
          placeholder="https://example.com"
          onChange={handleChange}
          value={formData.website_url}
        />
      </div>
      <div>
        <label htmlFor="linkedin-profile">
          <FaLinkedin /> LinkedIn
        </label>
        <input
          type="text"
          id="linkedin-profile"
          name="linkedin_profile"
          placeholder="https://linkedin.com/in/yourprofile"
          onChange={handleChange}
          value={formData.linkedin_profile}
        />
      </div>
      <div>
        <label htmlFor="github-profile">
          <FaGithub /> GitHub
        </label>
        <input
          type="text"
          id="github-profile"
          name="github_profile"
          placeholder="https://github.com/yourusername"
          onChange={handleChange}
          value={formData.github_profile}
        />
      </div>
      <div>
        <label htmlFor="twitter-profile">
          <FaXTwitter /> Twitter
        </label>
        <input
          type="text"
          id="twitter-profile"
          name="twitter_profile"
          placeholder="https://x.com/yourusername"
          onChange={handleChange}
          value={formData.twitter_profile}
        />
      </div>
      <div>
        <label htmlFor="reddit-profile">
          <FaReddit /> Reddit
        </label>
        <input
          type="text"
          id="reddit-profile"
          name="reddit_profile"
          placeholder="https://reddit.com/u/yourusername"
          onChange={handleChange}
          value={formData.reddit_profile}
        />
      </div>
      <div>
        <label htmlFor="instagram-profile">
          <FaInstagram /> Instagram
        </label>
        <input
          type="text"
          id="instagram-profile"
          name="instagram_profile"
          placeholder="https://instagram.com/yourusername"
          onChange={handleChange}
          value={formData.instagram_profile}
        />
      </div>
      <div>
        <label htmlFor="instagram-profile">
          <TbBrandLinktree /> LinkTree
        </label>
        <input
          type="text"
          id="linktree-profile"
          name="linktree_profile"
          placeholder="https://linktr.ee/username"
          onChange={handleChange}
          value={formData.linktree_profile}
        />
      </div>
    </form>
  </div>
);

const StepSeven = ({ formData }) => {
  function calculateAge(dob) {
    // dob is a date object or string in the format "YYYY-MM-DD"
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // If the current month is before the birth month or it's the same month but the day is before the birth day, subtract one year from the age
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  return (
    <div className={styles.formContainer}>
      <h2 className="section-title">Forge Your Masterpiece</h2>
      <p>Review Your Information Before Finalizing Your Profile</p>
      <div className={styles.preview}>
        <div className={styles.card}>
          <h3>Personal Details</h3>
          <p>
            <FaUser />
            <strong>Name: </strong> {formData.first_name} {formData.last_name}
          </p>
          {formData.description && (
            <p>
              <FiUser />
              <strong>Description: </strong> {formData.description}
            </p>
          )}
          <p>
            <FaPhone />
            <strong>Phone Number: </strong> {formData.country_code}{" "}
            {formData.phone}
          </p>
          <p>
            <FaMapMarkerAlt />
            <strong>Location:</strong> {formData.state}, {formData.country}
          </p>
          <p>
            <FaGenderless />
            <strong>Gender:</strong> {formData.gender}
          </p>
          <p>
            <FaBirthdayCake />
            <strong>Age:</strong> {calculateAge(formData.birth_date)}
          </p>
        </div>
        {Object.keys(formData.education).length > 0 && (
          <div className={styles.card}>
            <h3>Education</h3>
            {formData.education.map((education, index) => (
              <ul key={index}>
                <li>
                  <strong>Degree:</strong>{" "}
                  {education.degree.toLocaleUpperCase()[0] +
                    education.degree.slice(1)}
                </li>
                <li>
                  <strong>Institution:</strong> {education.institution}
                </li>
                <li>
                  <strong>Starting Date:</strong> {education.start_date}
                </li>
                <li>
                  <strong>End Date:</strong>{" "}
                  {education.end_date ? education.end_date : "Now"}
                </li>
                {education.description && (
                  <li>
                    <strong>Description:</strong> {education.description}
                  </li>
                )}
              </ul>
            ))}
          </div>
        )}
        {Object.keys(formData.experience).length > 0 && (
          <div className={styles.card}>
            <h3>Work Experience</h3>
            {formData.experience.map((experience, index) => (
              <ul key={index}>
                <li>
                  <strong>Title:</strong> {experience.title}
                </li>
                <li>
                  <strong>Company:</strong> {experience.company_name}
                </li>
                <li>
                  <strong>Location:</strong> {experience.location}
                </li>
                <li>
                  <strong>Start Date:</strong> {experience.start_date}
                </li>
                <li>
                  <strong>End Date:</strong>{" "}
                  {experience.end_date ? experience.end_date : "Now"}
                </li>
                {experience.description && (
                  <li>
                    <strong>Description:</strong> {experience.description}
                  </li>
                )}
              </ul>
            ))}
          </div>
        )}
        <div className={styles.card}>
          <h3>
            <FaLaptopCode /> Skills
          </h3>
          <ul className={styles.list}>
            {formData.skills.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </div>
        <div className={styles.card}>
          <h3>
            <FaHeart /> Interests
          </h3>
          <ul className={styles.list}>
            {formData.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </div>
        <div className={styles.card}>
          <h3>Social Media</h3>
          {formData.website_url && (
            <p>
              <FaGlobe />
              <strong>Website:</strong>
              <a href={formData.website_url} target="_blank">
                {formData.website_url}
              </a>
            </p>
          )}
          {formData.linkedin_profile && (
            <p>
              <FaLinkedin />
              <strong>LinkedIn:</strong>
              <a href={formData.linkedin_profile} target="_blank">
                {formData.linkedin_profile}
              </a>
            </p>
          )}
          {formData.github_profile && (
            <p>
              <FaGithub />
              <strong>GitHub:</strong>
              <a href={formData.github_profile} target="_blank">
                {formData.github_profile}
              </a>
            </p>
          )}
          {formData.twitter_profile && (
            <p>
              <FaXTwitter />
              <strong>Twitter:</strong>
              <a href={formData.twitter_profile} target="_blank">
                {formData.twitter_profile}
              </a>
            </p>
          )}
          {formData.reddit_profile && (
            <p>
              <FaReddit />
              <strong>Reddit:</strong>
              <a href={formData.reddit_profile} target="_blank">
                {formData.reddit_profile}
              </a>
            </p>
          )}
          {formData.instagram_profile && (
            <p>
              <FaInstagram />
              <strong>Instagram:</strong>
              <a href={formData.instagram_profile} target="_blank">
                {formData.instagram_profile}
              </a>
            </p>
          )}
          {formData.linktree_profile && (
            <p>
              <FaLink />
              <strong>LinkTree:</strong>
              <a href={formData.linktree_profile} target="_blank">
                {formData.linktree_profile}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default forgeProfile;
