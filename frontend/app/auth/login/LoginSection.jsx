"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../api";
import { checkAuth } from "../../util";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

import styles from "../style.module.css";
import Button from "../../components/Button/Button";
import Link from "next/link";
import Image from "next/image";

import Logo from "../../assets/logo.png";
import { SlEnvolope } from "react-icons/sl";
import { CiLock } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FaGoogle, FaGithub } from "react-icons/fa";

const LoginSection = () => {
  const router = useRouter();

  useEffect(() => {
    if (checkAuth()) {
      router.push("/dashboard/find-work/most-recent");
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();

  const googleSignIn = () => {};
  const githubSignIn = () => {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const getUsername = await api.post(
      //   "http://127.0.0.1:8000/api/get_username/",
      //   {
      //     email: formData.email,
      //   }
      // );

      fetch("http://127.0.0.1:8000/api/get_username/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setFormData((prevState) => ({
            ...prevState,
            username: data.username,
          }));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const Login = async () => {
      try {
        const response = await api.post("http://127.0.0.1:8000/api/token/", {
          username: formData.username,
          password: formData.password,
        });

        if (response.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, response.data.access);
          localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

          // Check if the current user have first_name
          const userResponse = await api.get(
            "http://127.0.0.1:8000/api/current-user/"
          );
          if (userResponse.data.first_name && userResponse.data.last_name) {
            router.push("/dashboard/find-work/most-recent");
          } else {
            router.push("/dashboard/forge-profile");
          }
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

    Login();
  }, [formData.username]);

  return (
    <>
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
          <h2>Create An Account</h2>
          <p>Join the Forge and Ignite Your Path to Mastery</p>
          <Button href="/auth/register">Register</Button>
        </div>
        <div className={styles.registerContainer}>
          <h2 className="section-title">Enter The Forge</h2>
          <p>
            Reconnect with Your Workshop and Continue Your Journey Towards
            Mastery and Innovation.
          </p>
          <div className={styles.authProviders}>
            <button onClick={googleSignIn} aria-label="Login using Google">
              <FaGoogle />
            </button>
            <button onClick={githubSignIn} aria-label="Login using Github">
              <FaGithub />
            </button>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <p>Or use your Username for Login.</p>
            {error && (
              <p style={{ color: "#ff5555", textAlign: "center" }}>{error}</p>
            )}
            <div>
              <SlEnvolope />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
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
            <button type="submit">Login</button>
            <p className={styles.login}>
              Don&apos;t have an account?{" "}
              <Link href={"/auth/register"}>Register</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSection;
