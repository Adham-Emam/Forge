import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.png";
import error from "../assets/error-img.svg";
import "../components/Error/error.css";

export const metadata = {
  title: "Forge Bonfire",
  description:
    "Bonfire, the platform that allows you to exchange skills for embers. Join our community of freelancers and clients and start monetizing your skills today.",
};

const bonfire = () => {
  return (
    <div className="error-container">
      <nav>
        <div className="container">
          <Link className="logo" href="/">
            <Image
              src={Logo}
              alt="Forge Logo"
              width={50}
              height={50}
              loading="eager"
            />
            <strong>Forge</strong>
          </Link>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/dashboard/find-work/most-recent">Dashboard</a>
            </li>
            <li>
              <a href="/bonfire">Bonfire</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <div>
          <h1 className="section-title">Coming Soon...</h1>
          <h3>This page is under construction</h3>
          <p>
            Looks like our developers taking a coffee break.
            <br /> We're working hard to get it ready on track, but for now,
            things might be a little off.
          </p>
        </div>
        <div className="image">
          <Image
            src={error}
            alt="404"
            width={400}
            height={400}
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default bonfire;
