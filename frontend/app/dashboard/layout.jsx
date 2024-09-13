import React from "react";
import { ProtectedRoute } from "../components";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProtectedRoute>{children}</ProtectedRoute>
      </body>
    </html>
  );
}
