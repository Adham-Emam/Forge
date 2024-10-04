import React from "react";
import { TransactionsTable } from "../../../components";
import Link from "next/link";
import styles from "../style.module.css";

const SentTransaction = () => {
  return (
    <>
      <ul className={styles.tabs}>
        <li>
          <Link href={"/dashboard/transactions/all"}>All</Link>
        </li>
        <li>
          <span>Sent</span>
        </li>
        <li>
          <Link href={"/dashboard/transactions/received"}>Received</Link>
        </li>
      </ul>
      <TransactionsTable
        apiUrl={"http://127.0.0.1:8000/api/transactions/?type=sent"}
      />
    </>
  );
};

export default SentTransaction;
