import React from "react";
import { Error404 } from "./components";

export const metadata = {
  title: "404 - Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return <Error404 />;
}
