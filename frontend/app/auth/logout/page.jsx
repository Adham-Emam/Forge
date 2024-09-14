"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        localStorage.clear();
      } catch (error) {
        console.log(error);
      } finally {
        router.push("/auth/login");
      }
    };

    performLogout();
  }, [router]);
};

export default Logout;
