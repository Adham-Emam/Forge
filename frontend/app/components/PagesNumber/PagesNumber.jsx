"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // added useRouter for navigation
import api from "../../api";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./style.module.css";

const PagesNumber = ({ apiUrl }) => {
  const searchParams = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(searchParams.get("page_size") || 10);
  const router = useRouter(); // Use router for navigation
  const currentPage = parseInt(searchParams.get("page") || 1);

  // Fetch the total number of pages (or projects) from API
  const getProjectsNumber = async () => {
    try {
      const response = await api.get(apiUrl);
      setTotalPages(Math.ceil(response.data.count / pageSize));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectsNumber();
  }, []);

  // Handle page size change
  const handlePageSizeChange = (e) => {
    const newPageSize = parseInt(e.target.value);
    setPageSize(newPageSize);
    const params = new URLSearchParams(searchParams);
    params.set("page_size", newPageSize);
    router.push(`?${params.toString()}`); // Update the URL with new page size
  };

  // Handle page change
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.push(`?${params.toString()}`); // Update the URL with new page number
  };

  // Logic to determine which pages to show
  const pageLimit = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
  const endPage = Math.min(totalPages, startPage + pageLimit - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageSize}>
        <label htmlFor="pageSize">Projects Per Page: </label>
        <select
          name="pageSize"
          id="pageSize"
          onChange={handlePageSizeChange}
          value={pageSize}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      {totalPages > 1 && (
        <ul className={styles.pagination}>
          {/* Previous Button */}
          <li
            className={`${styles.paginationButton} ${
              currentPage === 1 ? styles.disabled : ""
            }`}
            onClick={() => goToPage(currentPage - 1)}
          >
            <IoIosArrowBack />
          </li>

          {/* First Page and Ellipsis */}
          {startPage > 1 && (
            <>
              <li
                className={`${styles.pageNumber} ${
                  currentPage === 1 ? styles.active : ""
                }`}
                onClick={() => goToPage(1)}
              >
                1
              </li>
              {startPage > 2 && <li className={styles.ellipsis}>...</li>}
            </>
          )}

          {/* Page Numbers */}
          {pageNumbers.map((page) => (
            <li
              key={page}
              className={`${styles.pageNumber} ${
                currentPage === page ? styles.active : ""
              }`}
              onClick={() => goToPage(page)}
            >
              {page}
            </li>
          ))}

          {/* Last Page and Ellipsis */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <li className={styles.ellipsis}>...</li>
              )}
              <li
                className={`${styles.pageNumber} ${
                  currentPage === totalPages ? styles.active : ""
                }`}
                onClick={() => goToPage(totalPages)}
              >
                {totalPages}
              </li>
            </>
          )}

          {/* Next Button */}
          <li
            className={`${styles.paginationButton} ${
              currentPage === totalPages ? styles.disabled : ""
            }`}
            onClick={() => goToPage(currentPage + 1)}
          >
            <IoIosArrowForward />
          </li>
        </ul>
      )}
    </div>
  );
};

export default PagesNumber;
