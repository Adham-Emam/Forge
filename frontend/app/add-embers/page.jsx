import React from "react";
import { DashboardNavbar, ProtectedRoute } from "../components";
import PurchaseEmbers from "./PurchaseEmbers";

export const metadata = {
  title: "Purchase Embers | Forge Skill Exchange",
  description:
    "Buy embers on Forge to trade skills, freelance, and redeem for real-world cash. Unlock your potential by purchasing embers today!",
  keywords: [
    "Forge",
    "purchase embers",
    "skill exchange",
    "buy embers",
    "trade skills",
    "freelance for embers",
    "cash redemption",
  ],
  robots: "index, follow",
};

const PurchaseEmber = () => {
  return (
    <ProtectedRoute>
      <DashboardNavbar />
      <div>
        <div className="container">
          <PurchaseEmbers />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PurchaseEmber;
