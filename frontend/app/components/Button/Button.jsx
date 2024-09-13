// "use client";
import styles from "./style.module.css";
import Link from "next/link";

const Button = ({ href, children, className = "" }) => {
  return (
    <Link href={href} className={`${styles.btn} ${className}`}>
      {children}
    </Link>
  );
};

export default Button;
