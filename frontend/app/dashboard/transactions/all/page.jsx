import React from "react";
import { TransactionsTable } from "../../../components";
import Link from "next/link";
import styles from "../style.module.css";

const AllTransactions = () => {
  return (
    <>
      <ul className={styles.tabs}>
        <li>
          <span>All</span>
        </li>
        <li>
          <Link href={"/dashboard/transactions/payment"}>Payment</Link>
        </li>
        <li>
          <Link href={"/dashboard/transactions/received"}>Received</Link>
        </li>
      </ul>
      <TransactionsTable
        apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/transactions`}
      />
    </>
  );
};

export default AllTransactions;
