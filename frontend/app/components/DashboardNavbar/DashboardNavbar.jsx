"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import api from "../../api";
import { getTimeDifference } from "../../util";
import styles from "./style.module.css";

import logo from "../../assets/logo.png";
import ember from "../../assets/ember.png";
import { IoIosNotificationsOutline, IoMdBriefcase } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { GiPartyPopper } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { FaHome, FaUser, FaFire, FaPlus, FaEnvelope } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { FaMessage } from "react-icons/fa6";

const DashboardNavbar = () => {
  const [user, setUser] = useState({});
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const [menuClicked, setMenuClicked] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/`
      );
      setNotifications(response.data);
      setNotificationCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotificationClick = async (notificationId) => {
    try {
      await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/${notificationId}/`,
        {
          is_read: true,
        }
      );
      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserName = async () => {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/current-user/`
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserName();
    fetchNotifications();
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
              priority
              loading="eager"
            />
            <strong>Forge</strong>
          </Link>
          <div className={styles.navMenu}>
            <div
              className={`${styles.notifications} ${
                menuOpen ? styles.active : ""
              }`}
            >
              <button
                aria-label="Notifications"
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <IoIosNotificationsOutline />
              </button>
              {notificationCount > 0 && (
                <span className={styles.notificationCount}>
                  {notificationCount}
                </span>
              )}
              <ul>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <li key={notification.id}>
                      <div>
                        <br />
                        <Link
                          href={notification.url}
                          onClick={() =>
                            handleNotificationClick(notification.id)
                          }
                        >
                          <span>
                            {getTimeDifference(notification.created_at)}
                          </span>
                          {notification.type === "message" ? (
                            <FaEnvelope />
                          ) : notification.type === "project" ? (
                            <GiPartyPopper />
                          ) : (
                            <FaUser />
                          )}
                          <span>{notification.message}</span>
                        </Link>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className={styles.noNotifications}>No notifications</li>
                )}
              </ul>
            </div>

            <span className={styles.ember}>
              <Image
                src={ember}
                alt="ember"
                width={40}
                height={40}
                quality={100}
                priority
                loading="eager"
              />
              <span className={styles.emberCount}>{user.credits}</span>
              <Link href="/add-embers">
                <FaPlus />
              </Link>
            </span>
            <span
              className={styles.userImg}
              onClick={() => {
                setMenuClicked(!menuClicked);
                setMenuOpen(false);
              }}
            >
              {user.profile_image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${user.profile_image}`}
                  alt="profile"
                  sizes="(40px, 40px)"
                  fill
                  loading="eager"
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
              priority
              loading="eager"
            />
            <span className={styles.emberCount}>{user.credits}</span>
            <Link href="/add-embers">
              <FaPlus />
            </Link>
          </span>
        </li>
        <li>
          <Link href="/">
            <FaHome /> Home
          </Link>
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
          <Link href="/dashboard/find-work/most-recent">
            <RiDashboardFill /> Dashboard
          </Link>
        </li>
        <li>
          <Link href="/dashboard/my-jobs">
            <IoMdBriefcase /> My Jobs
          </Link>
        </li>
        <li>
          <Link href="/dashboard/messages/rooms">
            <FaMessage /> Messages
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
