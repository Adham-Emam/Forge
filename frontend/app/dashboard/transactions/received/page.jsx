import React from "react";
import { TransactionsTable } from "../../../components";
import Link from "next/link";
import styles from "../style.module.css";

const ReceivedTransaction = () => {
  return (
    <>
      <ul className={styles.tabs}>
        <li>
          <Link href={"/dashboard/transactions/all"}>All</Link>
        </li>
        <li>
          <Link href={"/dashboard/transactions/payment"}>Payment</Link>
        </li>
        <li>
          <span>Received</span>
        </li>
      </ul>
      <TransactionsTable
        apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/?type=received`}
      />
    </>
  );
};

export default ReceivedTransaction;
