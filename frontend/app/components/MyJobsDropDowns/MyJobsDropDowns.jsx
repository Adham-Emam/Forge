"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "../../api";
import { getTimeDifference } from "../../util";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { AiFillQuestionCircle } from "react-icons/ai";
import styles from "./style.module.css";

const MyJobsDropDowns = ({ title, hint, apiUrl, type }) => {
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await api.get(apiUrl);
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (apiUrl) {
      fetchItems();
    }
  }, [apiUrl]);

  return (
    <div
      className={`${styles.dropdown} ${
        show && items.length > 0 ? styles.show : ""
      }`}
    >
      <div className={styles.head} onClick={() => setShow(!show)}>
        <h3>
          {title} ({items.length})
        </h3>
        {hint && (
          <div className={styles.hint} title={hint}>
            <AiFillQuestionCircle />
          </div>
        )}
        {items.length > 0 && (
          <button
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </button>
        )}
      </div>
      {items.length > 0 && (
        <div className={styles.body}>
          {items.map((item, index) => (
            <div className={styles.item} key={index}>
              <span>{getTimeDifference(item.created_at)}</span>
              <Link
                href={
                  type === "projects"
                    ? `/dashboard/projects/${item.id}?title=${item.title}&description=${item.description}`
                    : `/dashboard/projects/${item.project}?title=${item.project_title}&description=${item.project_description}`
                }
              >
                <h4>{type === "projects" ? item.title : item.project_title}</h4>
              </Link>
              <p>{type === "projects" ? item.description : item.proposal}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobsDropDowns;