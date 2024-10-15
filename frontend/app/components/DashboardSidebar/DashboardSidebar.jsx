"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import api from "../../api";
import Link from "next/link";
import Button from "../Button/Button";
import { countries } from "../DropDowns/constants";

import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import styles from "./style.module.css";
import spark from "../../assets/spark.png";

const DashboardSidebar = () => {
  const [userData, setUserData] = useState({});
  const [filters, setFilters] = useState({
    projectType: {
      freelancer: false,
      exchange: false,
    },
    experienceLevel: {
      beginner: false,
      intermediate: false,
      expert: false,
    },
    budget: {
      min: "",
      max: "",
    },
    country: "",
    proposals: {
      "0-5": false,
      "6-10": false,
      "11-20": false,
      "21-30": false,
      "31-50": false,
    },
    projectLength: {
      "0-1": false,
      "1-3": false,
      "3-6": false,
      "6-12": false,
    },
    clientHistory: {
      0: false,
      "1-9": false,
      "10+": false,
    },
  });
  const [activeFilters, setActiveFilters] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Effect to reset filters when the pathname (URL) changes
  useEffect(() => {
    // Reset filters when moving to a new page
    setFilters({
      projectType: {
        freelancer: false,
        exchange: false,
      },
      experienceLevel: {
        beginner: false,
        intermediate: false,
        expert: false,
      },
      budget: {
        min: "",
        max: "",
      },
      country: "",
      proposals: {
        "0-5": false,
        "6-10": false,
        "11-20": false,
        "21-30": false,
        "31-50": false,
      },
      projectLength: {
        "0-1": false,
        "1-3": false,
        "3-6": false,
        "6-12": false,
      },
      clientHistory: {
        0: false,
        "1-9": false,
        "10+": false,
      },
    });
  }, [pathname]); // Reset filters every time the URL path changes

  useEffect(() => {
    // Extract query params
    const params = Object.fromEntries(searchParams.entries());

    // Project Type filter from URL params
    if (params.projectType) {
      const projectTypes = params.projectType.split(",");
      setFilters((prev) => ({
        ...prev,
        projectType: {
          freelancer: projectTypes.includes("freelancer"),
          exchange: projectTypes.includes("exchange"),
        },
      }));
    }

    // Experience Level filter from URL params
    if (params.experienceLevel) {
      const experienceLevels = params.experienceLevel.split(",");
      setFilters((prev) => ({
        ...prev,
        experienceLevel: {
          beginner: experienceLevels.includes("beginner"),
          intermediate: experienceLevels.includes("intermediate"),
          expert: experienceLevels.includes("expert"),
        },
      }));
    }

    // Budget filter from URL params
    if (params.budget) {
      const [minBudget, maxBudget] = params.budget.split("-");
      setFilters((prev) => ({
        ...prev,
        budget: {
          min: minBudget || "",
          max: maxBudget || "",
        },
      }));
    }

    // Proposals filter from URL params
    if (params.proposals) {
      const proposalRanges = params.proposals.split(",");
      setFilters((prev) => ({
        ...prev,
        proposals: {
          "0-5": proposalRanges.includes("0-5"),
          "6-10": proposalRanges.includes("6-10"),
          "11-20": proposalRanges.includes("11-20"),
          "21-30": proposalRanges.includes("21-30"),
          "31-50": proposalRanges.includes("31-50"),
        },
      }));
    }

    // Ensure other filters like country, projectLength, and clientHistory are also read from URL
    if (params.country) {
      setFilters((prev) => ({
        ...prev,
        country: params.country,
      }));
    }

    // Set projectLength filter from URL params
    if (params.projectLength) {
      const projectLengths = params.projectLength.split(",");
      setFilters((prev) => ({
        ...prev,
        projectLength: {
          "0-1": projectLengths.includes("0-1"),
          "1-3": projectLengths.includes("1-3"),
          "3-6": projectLengths.includes("3-6"),
          "6-12": projectLengths.includes("6-12"),
        },
      }));
    }

    // Set clientHistory filter from URL params
    if (params.clientHistory) {
      const clientHistories = params.clientHistory.split(",");
      setFilters((prev) => ({
        ...prev,
        clientHistory: {
          0: clientHistories.includes("0"),
          "1-9": clientHistories.includes("1-9"),
          "10+": clientHistories.includes("10+"),
        },
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());

    const query = new URLSearchParams(currentParams);

    const selectedType = Object.entries(filters.projectType)
      .filter(([_, selected]) => selected)
      .map(([range]) => range)
      .join(",");
    if (selectedType) {
      query.set("projectType", selectedType);
    } else {
      query.delete("projectType");
    }

    const selectedExperienceLevels = Object.entries(filters.experienceLevel)
      .filter(([_, selected]) => selected)
      .map(([range]) => range)
      .join(",");
    if (selectedExperienceLevels) {
      query.set("experienceLevel", selectedExperienceLevels);
    } else {
      query.delete("experienceLevel");
    }

    // Budget filter in "min-max" format
    const { min, max } = filters.budget;
    if (min || max) {
      const budgetQuery = `${min || 0}-${max || 5000}`; // Defaults to "0-max" or "min-5000"
      query.set("budget", budgetQuery);
    } else {
      query.delete("budget");
    }

    // Add country filter if a country is selected
    if (filters.country) {
      query.set("country", filters.country);
    } else {
      query.delete("country");
    }

    // Add proposals filter as a comma-separated string
    const selectedProposals = Object.entries(filters.proposals)
      .filter(([_, selected]) => selected)
      .map(([range]) => range)
      .join(",");

    if (selectedProposals) {
      query.set("proposals", selectedProposals); // Send proposals as a single comma-separated string
    } else {
      query.delete("proposals");
    }

    // Add projectLength filter as a comma-separated string
    const selectedProjectLengths = Object.entries(filters.projectLength)
      .filter(([_, selected]) => selected)
      .map(([range]) => range)
      .join(",");
    if (selectedProjectLengths) {
      query.set("projectLength", selectedProjectLengths);
    } else {
      query.delete("projectLength");
    }

    // Add clientHistory filter as a comma-separated string
    const selectedClientHistory = Object.entries(filters.clientHistory)
      .filter(([_, selected]) => selected)
      .map(([range]) => range)
      .join(",");
    if (selectedClientHistory) {
      query.set("clientHistory", selectedClientHistory);
    } else {
      query.delete("clientHistory");
    }

    // Update the URL query without reloading the page
    router.replace(`?${query.toString()}`, { scroll: false });
  }, [filters, searchParams, router]);

  // Handle experience level change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle budget changes
    if (name.startsWith("budget.")) {
      const budgetKey = name.split(".")[1]; // Get "min" or "max"
      setFilters((prev) => ({
        ...prev,
        budget: {
          ...prev.budget,
          [budgetKey]: value,
        },
      }));
    } else {
      // Handle other filters
      const [filterKey, subKey] = name.split(".");
      if (subKey) {
        // For nested objects like proposals, projectLength, etc.
        setFilters((prev) => ({
          ...prev,
          [filterKey]: {
            ...prev[filterKey],
            [subKey]: e.target.checked,
          },
        }));
      } else {
        // For top-level fields like country, experience level
        setFilters((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  // Prevent typing non-numeric characters by blocking invalid key presses
  const handleKeyDown = (e) => {
    // Allow: backspace, delete, tab, escape, enter, and arrow keys
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Tab" ||
      e.key === "Escape" ||
      e.key === "Enter" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowLeft"
    ) {
      return; // Allow these keys
    }

    // Prevent non-numeric keys
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault(); // Block non-numeric characters
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await api.get("http://127.0.0.1:8000/api/current-user/");
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <aside
      className={`${styles.sidebar} ${activeFilters ? styles.active : ""}`}
    >
      <div className={styles.addProject}>
        <Button href={"/dashboard/projects/add-project"}>Add Project</Button>
        <div
          className={styles.dropdownIcon}
          onClick={() => setActiveFilters(!activeFilters)}
        >
          {activeFilters ? (
            <IoMdArrowDropupCircle />
          ) : (
            <IoMdArrowDropdownCircle />
          )}
        </div>
      </div>
      <div className={styles.sparks}>
        <div>
          <h3>Sparks</h3>
          <Image src={spark} alt="Spark" width={50} height={50}
              loading="eager"
          
          />
          <span>{userData.sparks}</span>
        </div>
        <ul>
          <li>
            <Link href={"/dashboard/transactions/all"}>View Details</Link>
          </li>
          <li>
            <Link href={"/add-sparks"}>Purchase Sparks</Link>
          </li>
        </ul>
      </div>
      <div className={styles.filters}>
        <div>
          <h3>Project Type</h3>
          <div>
            <input
              type="checkbox"
              name="projectType.freelancer"
              id="projectType-freelancer"
              checked={filters.projectType.freelancer}
              onChange={handleChange}
            />
            <label htmlFor="projectType-freelancer">Normal</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="projectType.exchange"
              id="projectType-exchange"
              checked={filters.projectType.exchange}
              onChange={handleChange}
            />
            <label htmlFor="projectType-exchange">Skill Exchange</label>
          </div>
        </div>
        <div>
          <h3>Experience Level</h3>
          <div>
            <input
              type="checkbox"
              name="experienceLevel.beginner"
              id="experienceLevel-beginner"
              checked={filters.experienceLevel["beginner"]}
              onChange={handleChange}
            />
            <label htmlFor="experienceLevel-beginner">Beginner</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="experienceLevel.intermediate"
              id="experienceLevel-intermediate"
              checked={filters.experienceLevel["intermediate"]}
              onChange={handleChange}
            />
            <label htmlFor="experienceLevel-intermediate">Intermediate</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="experienceLevel.expert"
              id="experienceLevel-expert"
              checked={filters.experienceLevel["expert"]}
              onChange={handleChange}
            />
            <label htmlFor="experienceLevel-expert">Expert</label>
          </div>
        </div>
        <div>
          <h3>Embers Amount</h3>
          <div>
            <label htmlFor="budget-min">Min</label>
            <input
              type="number"
              name="budget.min"
              id="budget-min"
              value={filters.budget.min}
              onKeyDown={handleKeyDown}
              max={filters.budget.max}
              onChange={handleChange}
              placeholder="Minimum"
            />
          </div>
          <div>
            <label htmlFor="budget-max">Max</label>
            <input
              type="number"
              name="budget.max"
              id="budget-max"
              value={filters.budget.max}
              onKeyDown={handleKeyDown}
              min={filters.budget.min}
              onChange={handleChange}
              placeholder="Maximum"
            />
          </div>
        </div>
        <div>
          <h3>Proposals Number</h3>
          <div>
            <input
              type="checkbox"
              name="proposals.0-5"
              id="proposals-0-5"
              checked={filters.proposals["0-5"]}
              onChange={handleChange}
            />
            <label htmlFor="proposals-0-5">Less than 5</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="proposals.6-10"
              id="proposals-6-10"
              checked={filters.proposals["6-10"]}
              onChange={handleChange}
            />
            <label htmlFor="proposals-6-10">6 to 10</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="proposals.11-20"
              id="proposals-11-20"
              checked={filters.proposals["11-20"]}
              onChange={handleChange}
            />
            <label htmlFor="proposals-11-20">11 to 20</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="proposals.21-30"
              id="proposals-21-30"
              checked={filters.proposals["21-30"]}
              onChange={handleChange}
            />
            <label htmlFor="proposals-21-30">21 to 30</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="proposals.31-50"
              id="proposals-31-50"
              checked={filters.proposals["31-50"]}
              onChange={handleChange}
            />
            <label htmlFor="proposals-31-50">31 to 50</label>
          </div>
        </div>
        <div>
          <h3>Client Location</h3>
          <select
            name="country"
            id="location"
            value={filters.country}
            onChange={handleChange}
          >
            <option value="">All</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3>Project Length</h3>
          <div>
            <input
              type="checkbox"
              name="projectLength.0-1"
              id="projectLength-0-1"
              checked={filters.projectLength["0-1"]}
              onChange={handleChange}
            />
            <label htmlFor="projectLength-0-1">Less than a month</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="projectLength.1-3"
              id="projectLength-1-3"
              checked={filters.projectLength["1-3"]}
              onChange={handleChange}
            />
            <label htmlFor="projectLength-1-3">1 to 3 months</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="projectLength.3-6"
              id="projectLength-3-6"
              checked={filters.projectLength["3-6"]}
              onChange={handleChange}
            />
            <label htmlFor="projectLength-3-6">3 to 6 months</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="projectLength.6-12"
              id="projectLength-6-12"
              checked={filters.projectLength["6-12"]}
              onChange={handleChange}
            />
            <label htmlFor="projectLength-6-12">6 to 12 months</label>
          </div>
        </div>
        <div>
          <h3>Client History</h3>
          <div>
            <input
              type="checkbox"
              name="clientHistory.0"
              id="clientHistory-0"
              checked={filters.clientHistory[0]}
              onChange={handleChange}
            />
            <label htmlFor="clientHistory-0">No previous hires</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="clientHistory.1-9"
              id="clientHistory-1-9"
              checked={filters.clientHistory["1-9"]}
              onChange={handleChange}
            />
            <label htmlFor="clientHistory-1-9">1 to 9 hires</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="clientHistory.10+"
              id="clientHistory-10+"
              checked={filters.clientHistory["10+"]}
              onChange={handleChange}
            />
            <label htmlFor="clientHistory-10+">10+ hires</label>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
