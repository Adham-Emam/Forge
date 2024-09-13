import React from "react";
import { Footer } from "../components";

export default function LegalsLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
