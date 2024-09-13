"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import api from "../../api";
import styles from "./style.module.css";

import logo from "../../assets/logo.png";
import ember from "../../assets/ember.png";
import { IoIosNotificationsOutline, IoMdBriefcase } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { FaHome, FaUser, FaFire, FaPlus } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";


const DashboardNavbar = () => {
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");
  const [notification, setNotification] = useState(0);

  const [menuClicked, setMenuClicked] = useState(false);

  const fetchUserName = async () => {
    await api
      .get("http://127.0.0.1:8000/api/current-user/")
      .then((res) => {
        setUser(res.data);
        setUserName(`${res.data.first_name[0]}${res.data.last_name[0]}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
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
            <span className={styles.emberCount}>50</span>
            <Link href="/add-embers">
              <FaPlus />
            </Link>
          </span>
          <span
            className={styles.userImg}
            onClick={() => setMenuClicked(!menuClicked)}
          >
            {userName}
            <ul
              className={`${styles.userMenu} ${
                menuClicked ? styles.active : ""
              }`}
            >
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
                  <span className={styles.emberCount}>50</span>
                  <Link href="/add-embers">
                    <FaPlus />
                  </Link>
                </span>
              </li>
              <li>
                <Link href={`/dashboard/profile/me/${user.username}`}>
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
                <Link href="/">
                  <IoMdBriefcase /> My Jobs
                </Link>
              </li>
              <li>
                <Link href="/">
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
          </span>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNavbar;
