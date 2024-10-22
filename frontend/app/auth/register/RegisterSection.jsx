"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../api";
import { checkAuth } from "../../util";

import styles from "../style.module.css";
import Button from "../../components/Button/Button";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/logo.png";

import { CiUser, CiMail, CiLock, CiUnlock } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FaGoogle, FaGithub, FaCheck } from "react-icons/fa";

function RegisterSection() {
  const router = useRouter();

  useEffect(() => {
    if (checkAuth()) {
      router.push("/dashboard/find-work/most-recent");
    }
  }, []);

  const googleSignIn = () => {};
  const githubSignIn = () => {};

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (type == "checkbox") {
      setTermsAccepted(checked);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    localStorage.clear();

    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (formData.password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    } else if (!/[A-Z]/.test(formData.password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return;
    } else if (!/[a-z]/.test(formData.password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return;
    } else if (!/[0-9]/.test(formData.password)) {
      setPasswordError("Password must contain at least one number");
      return;
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      setPasswordError(
        "Password must contain at least one special character (e.g., !@#$%^&*)"
      );
      return;
    } else {
      setPasswordError("");
    }

    if (!termsAccepted) {
      setError("You must accept the Terms of Service and Privacy Policy");
      return;
    } else {
      setError("");
    }

    try {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/register/`,
        { ...formData }
      );
      if (response.status === 201) {
        router.push("/auth/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Extract and combine error messages
        const errorMessages = Object.values(error.response.data).flat();
        setError(errorMessages.join(" "));
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.greeting}>
        <div className={styles.logo}>
          <Image
            src={Logo}
            alt="Logo Image"
            width={50}
            height={50}
            loading="eager"
          />
          <strong>Forge</strong>
        </div>
        <h2>Welcome Back!</h2>
        <p>
          Reconnect with Your Workshop and Continue Your Journey Towards Mastery
          and Innovation
        </p>
        <Button href="/auth/login">Login</Button>
      </div>
      <div className={styles.registerContainer}>
        <h2 className="section-title">Create Account</h2>
        <p>Join the Forge and Ignite Your Path to Mastery</p>
        <div className={styles.authProviders}>
          <button onClick={googleSignIn} aria-label="Login using Google">
            <FaGoogle />
          </button>
          <button onClick={githubSignIn} aria-label="Login using Github">
            <FaGithub />
          </button>
        </div>
        <form className={styles.form} method="POST" onSubmit={handleSubmit}>
          <p>Or use your email for registration.</p>
          {error && (
            <p style={{ color: "#ff5555", textAlign: "center" }}>{error}</p>
          )}
          <div>
            <CiUser />
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <CiMail />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {emailError && <p style={{ color: "#ff5555" }}>{emailError}</p>}
          </div>
          <div>
            <CiLock />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {showPassword ? (
              <IoEyeOutline
                className={styles.showPassword}
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <IoEyeOffOutline
                className={styles.showPassword}
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <div>
            <CiUnlock />
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {showConfirmPassword ? (
              <IoEyeOutline
                className={styles.showPassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            ) : (
              <IoEyeOffOutline
                className={styles.showPassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          </div>
          {passwordError && <p style={{ color: "#ff5555" }}>{passwordError}</p>}
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className={styles.hiddenCheckbox}
            />
            <label htmlFor="termsAccepted" className={styles.customCheckbox}>
              <span className={styles.checkmark}>
                <FaCheck />
              </span>
              I agree to the{" "}
              <Link href="/terms-of-service">Terms of Service</Link> and{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>
            </label>
          </div>
          <button type="submit">Register</button>
          <p className={styles.login}>
            Already have an account? <Link href={"/auth/login"}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterSection;
