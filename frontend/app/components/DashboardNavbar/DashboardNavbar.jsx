"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import api from "../../api";
import styles from "./style.module.css";

import logo from "../../assets/logo.png";
import ember from "../../assets/ember.png";
import { IoIosNotificationsOutline, IoMdBriefcase } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FaHome, FaUser, FaFire, FaPlus } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";

const DashboardNavbar = () => {
  const [user, setUser] = useState({});
  const [notification, setNotification] = useState(0);

  const [menuClicked, setMenuClicked] = useState(false);

  const fetchUserName = async () => {
    try {
      const response = await api.get("http://127.0.0.1:8000/api/current-user/");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <>
      <div className="container">
        <nav className={styles.navbar}>
          <Link className={styles.logo} href="/">
            <Image
              src={logo}
              alt="ember"
              width={50}
              height={50}
              priority={true}
            />
            <strong>Forge</strong>
          </Link>
          <div className={styles.navMenu}>
            <button className={styles.notifications} type="button">
              <IoIosNotificationsOutline />
            </button>
            <span className={styles.ember}>
              <Image
                src={ember}
                alt="ember"
                width={40}
                height={40}
                quality={100}
                priority={true}
              />
              <span className={styles.emberCount}>{user.credits}</span>
              <Link href="/add-embers">
                <FaPlus />
              </Link>
            </span>
            <span
              className={styles.userImg}
              onClick={() => setMenuClicked(!menuClicked)}
            >
              {user.profile_image ? (
                <Image
                  src={`http://127.0.0.1:8000/${user.profile_image}`}
                  alt="profile"
                  sizes="(40px, 40px)"
                  fill
                />
              ) : user.first_name ? (
                `${user.first_name?.[0]}${user.last_name?.[0]}`
              ) : (
                ""
              )}
            </span>
          </div>
        </nav>
      </div>
      <div
        className={`${styles.userMenuOverlay} ${
          menuClicked ? styles.active : ""
        }`}
        onClick={() => setMenuClicked(false)}
      ></div>
      <ul className={`${styles.userMenu} ${menuClicked ? styles.active : ""}`}>
        <IoCloseOutline onClick={() => setMenuClicked(false)} />
        <li>
          <span className={styles.ember}>
            <Image
              src={ember}
              alt="ember"
              width={40}
              height={40}
              quality={100}
              priority={true}
            />
            <span className={styles.emberCount}>{user.credits}</span>
            <Link href="/add-embers">
              <FaPlus />
            </Link>
          </span>
        </li>
        <li>
          <Link
            href={{
              pathname: `/dashboard/profile/${user.id}`,
              query: {
                username: user.first_name + " " + user.last_name,
                title: user.user_title,
              },
            }}
          >
            <FaUser /> My Profile
          </Link>
        </li>
        <li>
          <Link href="/">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link href="/dashboard">
            <RiDashboardFill /> Dashboard
          </Link>
        </li>
        <li>
          <Link href="/my-jobs">
            <IoMdBriefcase /> My Jobs
          </Link>
        </li>
        <li>
          <Link href="/bonfire">
            <FaFire />
            Forge Bonfire
          </Link>
        </li>
        <li>
          <Link href="/auth/logout">
            <MdLogout />
            Logout
          </Link>
        </li>
      </ul>
    </>
  );
};

export default DashboardNavbar;
