import React from "react";
import { DashboardNavbar } from "../../components";

export const metadata = {
  title: "Transactions | Forge - Skill Exchange Platform",
  description:
    "View your transactions. Choose between skill exchange or hiring a freelancer for your project and set your budget, bid amount, and preferred experience level.",
  keywords:
    "transactions, skill exchange, project form, bid amount, budget, Forge platform",
  robots: "index, follow",
};

const Transactions = ({ children }) => {
  return (
    <>
      <DashboardNavbar />
      <div className="container">
        <h2 className="section-title">Transactions</h2>
        {children}
      </div>
    </>
  );
};

export default Transactions;
