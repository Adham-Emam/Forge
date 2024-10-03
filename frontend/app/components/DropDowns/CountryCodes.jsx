import React from "react";
import { countryCodes } from "./constants";
import styles from "./style.module.css";

const CountryCodes = ({ selectedCountry, handleChange }) => {
  return (
    <select
      className={styles.dropdown}
      id="countryCode"
      name="country_code"
      value={selectedCountry}
      onChange={handleChange}
    >
      <option value="">Please choose a country code</option>
      {countryCodes.map((countryCode, index) => (
        <option key={index} value={countryCode.code}>
          {countryCode.country} ({countryCode.code})
        </option>
      ))}
    </select>
  );
};

export default CountryCodes;
