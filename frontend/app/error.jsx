"use client";
import { Error500 } from "./components";

export const metadata = {
  title: "Internal Server Error",
  description:
    "An error occurred while trying to load the page. Please try again later.",
};

export default function Error() {
  return <Error500 />;
}
