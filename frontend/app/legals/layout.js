import React from "react";
import { Footer } from "../components";

export default function LegalsLayout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
