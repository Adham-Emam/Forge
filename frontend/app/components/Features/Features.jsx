"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.css"; // import styles from style.module.css
import Button from "../Button/Button";
import {
  FaTools,
  FaHandshake,
  FaMedal,
  FaCampground,
  FaFire,
  FaGlobe,
} from "react-icons/fa";
import { AnimatedItem } from "..";

const features = [
  {
    title: "Skill Crafting",
    text: "Whether you’re learning or teaching, Forge gives you the tools to hone your skills. Create your own workshops, share knowledge, and grow in a community of like-minded artisans.",
    icon: <FaTools />,
  },
  {
    title: "Forge Bonds",
    text: "Forge brings together masters and apprentices from around the world. Find the perfect match for your skill exchange, schedule sessions, and communicate effortlessly.",
    icon: <FaHandshake />,
  },
  {
    title: "Your Forge, Your Rules",
    text: "Connect with a global network of artisans, learners, and teachers. Share and gain skills across cultures and disciplines, expanding your horizons and forging new paths.",
    icon: <FaGlobe />,
  },
  {
    title: "Fuel Your Journey With Embers",
    text: "Can’t find the perfect match? Forge still has you covered. Earn Embers by completing tasks for others in the community, and redeem them for learning opportunities that match your interests. Your efforts are never wasted in the forge.",
    icon: <FaFire />,
  },
  {
    title: "Earn Your Marks",
    text: "Every exchange on Forge is an opportunity to build your reputation. Earn ratings and feedback from peers, showcasing your expertise and reliability.",
    icon: <FaMedal />,
  },
  {
    title: "Rest at the Bonfire",
    text: "Relax your mind and recharge at the bonfire. Explore our blog, read articles, and connect with fellow forgers by sharing stories and experiences. It's your moment to reflect and inspire.",
    icon: <FaCampground />,
  },
];

const Features = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("access") !== null);
  }, []);
  return (
    <section id="features" className={styles.features}>
      <div className={`container ${styles.container}`}>
        <AnimatedItem
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.featuresHeader}>
            <span>Features</span>
            <h2 className="section-title">What Makes Forge Unique</h2>
            <p>
              Forge is more than just a platform, it’s your workshop for
              building and sharing skills. Here’s how we make that happen
            </p>
            <Button
              href={
                isAuthenticated
                  ? "/dashboard/find-work/most-recent"
                  : "/auth/register"
              }
            >
              Enter The Forge
            </Button>
          </div>
        </AnimatedItem>
        <div className={styles.featuresContainer}>
          {features.map((feature, index) => (
            <AnimatedItem
              initial={{ y: 50, opacity: 0, filter: "blur(5px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
            >
              <div className={styles.featureItem}>
                {feature.icon}
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
