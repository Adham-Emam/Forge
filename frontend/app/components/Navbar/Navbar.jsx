"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "../../util";

import Logo from "../../assets/logo.png";
import styles from "./style.module.css";
import {
  FaBook,
  FaRocket,
  FaCogs,
  FaPenFancy,
  FaUserPlus,
} from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import Button from "../Button/Button";
import Image from "next/image";
import Link from "next/link";
import { AnimatedItem } from "..";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false); // state to toggle mobile menu
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsAuthenticated(checkAuth());
  }, []);

  const handleMenuToggle = () => {
    setIsActive(!isActive); // toggle the active state
  };

  const handleLinkClick = () => {
    setIsActive(false);
  };

  return (
    <AnimatedItem
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <nav className={`${styles.navbar} ${isActive ? styles.active : ""}`}>
        <Link className={styles.logo} href="/">
          <Image src={Logo} alt="Forge Logo" width={50} height={50} />
          <strong>Forge</strong>
        </Link>
        <ul className={`${styles.navLinks} ${isActive ? styles.active : ""}`}>
          <li>
            <a href="#about" onClick={handleLinkClick}>
              <FaBook /> Forge Story
            </a>
          </li>
          <li>
            <a href="#features" onClick={handleLinkClick}>
              <FaRocket /> Features
            </a>
          </li>
          <li>
            <a href="#how-it-works" onClick={handleLinkClick}>
              <FaCogs /> How Forge Works
            </a>
          </li>
          <li>
            <a href="#testimonials" onClick={handleLinkClick}>
              <FaPenFancy /> Crafted Stories
            </a>
          </li>
          <li className={styles.joinBtn}>
            {isAuthenticated ? (
              <Button
                href="/dashboard/find-work/most-recent"
                onClick={handleLinkClick}
              >
                <RiDashboardFill /> Dashboard
              </Button>
            ) : (
              <Button href="/auth/register" onClick={handleLinkClick}>
                <FaUserPlus /> Join the Forge
              </Button>
            )}
          </li>
        </ul>
        <div
          className={`${styles.navIcon} ${isActive ? styles.active : ""}`}
          onClick={handleMenuToggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </AnimatedItem>
  );
};

export default Navbar;
