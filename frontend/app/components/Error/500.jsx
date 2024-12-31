"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/logo.png";
import error from "../../assets/error-img.svg";
import "./error.css";

const Error500 = () => {
  const router = useRouter();

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
          <h1 className="section-title">Oops!</h1>
          <h3>500 - Something Went Wrong on Our End.</h3>
          <p>
            Looks like our servers are taking a coffee break.
            <br /> We're working hard to get things back on track, but for now,
            things might be a little off.
          </p>
          <button onClick={() => router.back()}>Go Back</button>
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

export default Error500;
