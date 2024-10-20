import React from "react";
import {
  DashboardNavbar,
  MessagesSidebar,
  MessagesContent,
} from "../../../components";
import styles from "./style.module.css";

export const metadata = {
  title: "Messages | Forge - Skill Exchange Platform",
  description:
    "Find work for your skills. Choose between skill exchange or hiring a freelancer for your project and set your budget, bid amount, and preferred experience level.",
  keywords:
    "find work, skill exchange, project form, bid amount, budget, Forge platform",
  robots: "index, follow",
};

const Messages = () => {
  return (
    <>
      <DashboardNavbar />
      <div className={`container ${styles.container}`}>
        <MessagesSidebar />
        <MessagesContent />
      </div>
    </>
  );
};

export default Messages;
