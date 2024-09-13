"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    checkAuth().catch((error) => {
      setIsAuthenticated(false);
      console.error("Error checking authentication:", error);
    });
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const response = await api.post(
        "http://127.0.0.1:8000/api/token/refresh/",
        {
          refresh: refreshToken,
        }
      );
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setIsAuthenticated(false);
    }
  };

  const checkAuth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthenticated(false);
      return;
    } else {
      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthenticated(true);
      }
    }
  };


  return isAuthenticated ? children : redirect("/auth/login");
}

export default ProtectedRoute;
