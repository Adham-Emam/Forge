"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import Logo from "../../assets/logo.png";
import Button from "../Button/Button";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaDiscord,
  FaReddit,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { checkAuth } from "../../util";
import api from "../../api";

const Footer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const email = e.currentTarget.elements["email"].value;
    try {
      await api.post("http://127.0.0.1:8000/api/subscribe/", {
        email: email,
      });
      setMessage("Subscription successful");
      setErrorMessage("");
    } catch (error) {
      setMessage("");
      // Check if error.response is available and contains data
      if (error.response && error.response.data && error.response.data.email) {
        setErrorMessage(error.response.data.email[0]);
      } else {
        // Fallback for when error.response is undefined
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    setIsAuthenticated(checkAuth());
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div>
          <div className={styles.logo}>
            <div>
              <Link href="/">
                <Image
                  src={Logo}
                  alt="Forge Logo"
                  width={50}
                  height={50}
                  loading="eager"
                />{" "}
                <strong>Forge</strong>
              </Link>
            </div>
            <p>Forge Your Future, One Skill at a Time.</p>
          </div>
          <div className={styles.cta}>
            <h3>Earn Embers, Fuel Your Learning</h3>
            <p>
              Complete tasks, earn Embers, and unlock new opportunities to grow
              your skills. Learn more about how you can start earning today
            </p>
            <Button
              href={
                isAuthenticated
                  ? "/dashboard/find-work/most-recent"
                  : "/auth/register"
              }
            >
              Join
            </Button>
          </div>
          <div className={styles.legals}>
            <h3>Legal Links</h3>
            <ul>
              <li>
                <Link href="/legals/terms-of-service">Terms of Service</Link>
              </li>
              <li>
                <Link href="/legals/privacy-policy/">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/legals/cookie-policy/">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.subscribe}>
          <div>
            <h3>Stay in the Loop</h3>
            <p>
              Get the latest updates, tips, and stories from the Forge community
              delivered straight to your inbox.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
              />
              <button value="submit">Subscribe</button>
            </form>
            {message ? (
              <span className={styles.success}>{message}</span>
            ) : errorMessage ? (
              <span className={styles.error}>{errorMessage}</span>
            ) : (
              <span>We respect your privacy. No spam, ever.</span>
            )}
          </div>
        </div>
        <div className={styles.socialContainer}>
          <div>
            <p>
              © 2024 <span>Forge</span>. All Rights Reserved.
            </p>
            <span>Designed with care by the Forge Team.</span>
          </div>
          <div className={styles.socials}>
            <ul>
              <li>
                <a href="#" aria-label="Facebook">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="#" aria-label="X">
                  <FaXTwitter />
                </a>
              </li>
              <li>
                <a href="#" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a href="#" aria-label="Instagram">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="#" aria-label="Discord">
                  <FaDiscord />
                </a>
              </li>
              <li>
                <a href="#" aria-label="Reddit">
                  <FaReddit />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
