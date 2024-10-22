import React from "react";
import { TransactionsTable } from "../../../components";
import Link from "next/link";
import styles from "../style.module.css";

const PaymentTransaction = () => {
  return (
    <>
      <ul className={styles.tabs}>
        <li>
          <Link href={"/dashboard/transactions/all"}>All</Link>
        </li>
        <li>
          <span>Payment</span>
        </li>
        <li>
          <Link href={"/dashboard/transactions/received"}>Received</Link>
        </li>
      </ul>
      <TransactionsTable
        apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/?type=payment`}
      />
    </>
  );
};

export default PaymentTransaction;
