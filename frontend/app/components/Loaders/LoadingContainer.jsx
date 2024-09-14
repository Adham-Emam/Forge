import React from "react";
import styles from "./style.module.css";

const LoadingContainer = ({ circle = true, borderless = false }) => {
  return (
    <div className={styles.loader} style={borderless ? { border: "none" } : {}}>
      <div className={styles.wrapper}>
        {circle && <div className={styles.circle}></div>}
        <div className={styles.line1} style={!circle ? { left: 0 } : {}}></div>
        <div className={styles.line2} style={!circle ? { left: 0 } : {}}></div>
        <div className={styles.line3}></div>
        <div className={styles.line4}></div>
      </div>
    </div>
  );
};

export default LoadingContainer;
