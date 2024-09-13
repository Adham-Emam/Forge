"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Logo from "./assets/logo.png";
import error from "./assets/error-img.svg";
import "./error.css";

export default function Error() {
  const router = useRouter();

  return (
    <div className="error-container">
      <nav>
        <div className="container">
          <Link className="logo" href="/">
            <Image src={Logo} alt="Forge Logo" width={50} height={50} />
            <strong>Forge</strong>
          </Link>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/auth/login">Login</a>
            </li>
            <li>
              <a href="/auth/register">Register</a>
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
          <Image src={error} alt="404" width={400} height={400} />
        </div>
      </div>
    </div>
  );
}
