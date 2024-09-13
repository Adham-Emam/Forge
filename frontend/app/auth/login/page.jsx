"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

import styles from "../style.module.css";
import Button from "../../components/Button/Button";
import Link from "next/link";
import Image from "next/image";

import Logo from "../../assets/logo.png";
import { CiUser, CiLock } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FaGoogle, FaGithub } from "react-icons/fa";
import api from "../../api";


const Login = () => {
  const router = useRouter();

  const [formData, SetFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();

  const googleSignIn = () => {};
  const githubSignIn = () => {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("http://127.0.0.1:8000/api/token/", {
        ...formData,
      });
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

        // Check if the current user have first_name
        const userResponse = await api.get(
          "http://127.0.0.1:8000/api/current-user/"
        );
        if (userResponse.data.first_name && userResponse.data.last_name) {
          router.push("/dashboard");
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

  return (
    <>

      <div className={`containe ${styles.container}`}>
        <div className={styles.greeting}>
          <div className={styles.logo}>
            <Image src={Logo} alt="Logo Image" width={50} height={50} />
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
            <button onClick={googleSignIn}>
              <FaGoogle />
            </button>
            <button onClick={githubSignIn}>
              <FaGithub />
            </button>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <p>Or use your Username for Login.</p>
            {error && (
              <p style={{ color: "#ff5555", textAlign: "center" }}>{error}</p>
            )}
            <div>
              <CiUser />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
                value={formData.username}
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

export default Login;
