"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatedItem } from "../components";

import ember from "../assets/ember.png";
import styles from "./style.module.css";

const Card = ({ embers, price, description, index, isPopular }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    console.log(selectedPackage);
  }, [selectedPackage]);

  return (
    <AnimatedItem
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.3 }}
    >
      <div
        className={
          selectedPackage === index
            ? `${styles.card} ${styles.selected}`
            : styles.card
        }
      >
        {/* Best Value Badge */}
        {isPopular && <div className={styles.popularBadge}>Best Value</div>}
        <div className={styles.embersContainer}>
          <Image
            className={styles.ember}
            src={ember}
            alt="Ember"
            width={200}
            height={200}
          />
          <h2>{embers} Embers</h2>
        </div>
        <div className={styles.price}>
          {price}
          <span>$</span>
        </div>
        <p className={styles.description}>{description}</p>
        <button onClick={() => setSelectedPackage(index)}>
          Select Package
        </button>
      </div>
    </AnimatedItem>
  );
};

const packages = [
  { embers: 100, price: 5, description: "Starter pack for quick exchanges" },
  { embers: 250, price: 12, description: "Perfect for light skill swaps" },
  { embers: 500, price: 22, description: "Ideal for freelancers starting out" },
  { embers: 1000, price: 40, description: "Best value for frequent exchanges" },
  { embers: 2500, price: 95, description: "Pro pack for advanced users" },
  { embers: 5000, price: 180, description: "Ultimate pack for power users" },
];

const PurchaseEmbers = () => {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className="section-title">Power Up with Embers</h1>
        <p>
          Unlock skill exchanges, freelance opportunities, and cash rewards.
        </p>
        <div className={styles.cardContainer}>
          {packages.map((pkg, index) => (
            <Card
              key={index}
              embers={pkg.embers}
              price={pkg.price}
              description={pkg.description}
              index={index}
              isPopular={index === 3}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PurchaseEmbers;
