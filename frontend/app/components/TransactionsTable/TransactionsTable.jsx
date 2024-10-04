"use client";
import React, { useState, useEffect } from "react";
import api from "../../api";
import styles from "./style.module.css";
import { LoadingContainer } from "..";

const TransactionsTable = ({ apiUrl }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(apiUrl);
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className={styles.table}>
          <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
              <tr>
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
      ) : (
        <LoadingContainer circle={false} />
      )}
    </>
  );
};

export default TransactionsTable;
