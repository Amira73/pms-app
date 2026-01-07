
import React, { useEffect } from "react";

import styles from "./PaginationBar.module.css";

type PaginationBarProps = {
  totalResults: number;       
  pageNumber: number;          
  pageSize: number;            
  pageSizeOptions?: number[];  
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function PaginationBar({
  totalResults,
  pageNumber,
  pageSize,
  pageSizeOptions = [10, 20, 50],
  onPageChange,
  onPageSizeChange,
}: PaginationBarProps) {
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
  const canPrev = pageNumber > 1;
  const canNext = pageNumber < totalPages;

  const handlePrev = () => {
    if (canPrev) onPageChange(pageNumber - 1);
  };

  const handleNext = () => {
    if (canNext) onPageChange(pageNumber + 1);
  };

 

  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <span>Showing</span>

        <select
          className={styles.select}
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <span>of {totalResults} Results</span>
      </div>

      <div className={styles.right}>
        <span>
          Page {pageNumber} of {totalPages}
        </span>

        <button
          className={styles.iconBtn}
          onClick={handlePrev}
          disabled={!canPrev}
          aria-label="Previous page"
        >
          <i className="fa-solid fa-chevron-left" />
        </button>

        <button
          className={styles.iconBtn}
          onClick={handleNext}
          disabled={!canNext}
          aria-label="Next page"
        >
          <i className="fa-solid fa-chevron-right" />
        </button>
      </div>
    </div>
  );
}
