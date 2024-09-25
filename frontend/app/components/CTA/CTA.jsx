"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import Button from "../Button/Button";
import { AnimatedItem } from "..";
import { ACCESS_TOKEN } from "../../constants";

const CTA = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem(ACCESS_TOKEN) !== null);
  }, []);

  return (
    <section id="cta" className={styles.cta}>
      <div className="container">
        <AnimatedItem
          initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.container}>
            <div>
              <h2 className="section-title">Ready to Forge Your Path?</h2>
              <p>
                The Forge is ready. Are you? Step in, earn Embers, and craft
                your path to mastery.
              </p>
            </div>
            <div className={styles.btnContainer}>
              <Button
                href={
                  isAuthenticated
                    ? "/dashboard/find-work/most-recent"
                    : "/auth/register"
                }
              >
                Enter the Forge
              </Button>
              <Button href="#">Learn More About Forge</Button>
            </div>
          </div>
        </AnimatedItem>
      </div>
    </section>
  );
};

export default CTA;
