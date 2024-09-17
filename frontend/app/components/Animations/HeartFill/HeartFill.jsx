import React from "react";
import styles from "./style.module.css";

const HeartFill = ({ isSaved }) => {
  return (
    <>
      <svg id="heart" height="0" width="0">
        <defs>
          <clipPath id="svgPath">
            <path d="M20,35.09,4.55,19.64a8.5,8.5,0,0,1-.13-12l.13-.13a8.72,8.72,0,0,1,12.14,0L20,10.79l3.3-3.3a8.09,8.09,0,0,1,5.83-2.58,8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.13,12l-.13.13Z" />
          </clipPath>
        </defs>
      </svg>

      <div className={styles.heartContainer}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          className={styles.heartStroke}
        >
          <path d="M20,35.07,4.55,19.62a8.5,8.5,0,0,1-.12-12l.12-.12a8.72,8.72,0,0,1,12.14,0L20,10.77l3.3-3.3A8.09,8.09,0,0,1,29.13,4.9a8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.12,12l-.12.12ZM10.64,7.13A6.44,6.44,0,0,0,6.07,18.19L20,32.06,33.94,18.12A6.44,6.44,0,0,0,34,9l0,0a6.44,6.44,0,0,0-4.77-1.85A6,6,0,0,0,24.83,9L20,13.78,15.21,9A6.44,6.44,0,0,0,10.64,7.13Z" />
        </svg>

        <span
          className={`${styles.heartClip} ${isSaved ? styles.active : ""}`}
        ></span>
      </div>
    </>
  );
};

export default HeartFill;
