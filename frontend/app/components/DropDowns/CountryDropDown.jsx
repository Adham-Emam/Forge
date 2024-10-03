import React from "react";
import styles from "./style.module.css";
import { countries } from "./constants";

const CountryDropdown = ({ selectedCountry, handleChange }) => {
  return (
    <select
      className={styles.dropdown}
      id="country"
      name="country"
      value={selectedCountry}
      onChange={handleChange}
    >
      <option value="">Please choose a country</option>
      {countries.map((country, index) => (
        <option key={index} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
};

export default CountryDropdown;
