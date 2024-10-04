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
          <Link href={"/dashboard/transactions/sent"}>Sent</Link>
        </li>
        <li>
          <span>Received</span>
        </li>
      </ul>
      <TransactionsTable
        apiUrl={"http://127.0.0.1:8000/api/transactions/?type=received"}
      />
    </>
  );
};

export default ReceivedTransaction;
