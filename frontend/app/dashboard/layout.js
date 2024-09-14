import React from "react";
import { ProtectedRoute } from "../components";

export default function ProfileLayout({ children }) {
  return (
    <>
      <ProtectedRoute>{children}</ProtectedRoute>
    </>
  );
}
