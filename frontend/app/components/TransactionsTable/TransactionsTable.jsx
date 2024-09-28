"use client";
import React, { useState, useEffect } from "react";
import api from "../../api";
import styles from "./style.module.css";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const response = await api.get("http://127.0.0.1:8000/api/transactions/");
      setTransactions(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className={styles.table}>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>User</th>
            <th>Currency</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Description</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.user}</td>
                <td>{transaction.currency}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.type}</td>
                <td>{transaction.description || "N/A"}</td>
                <td>{new Date(transaction.created_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No transactions yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
