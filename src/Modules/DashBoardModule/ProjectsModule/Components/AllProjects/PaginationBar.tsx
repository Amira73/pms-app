
import styles from "./PaginationBar.module.css";
import { useMode } from "../../../../../Context/ModeContext";

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

      const { darkMode } = useMode();
  

  return (
   <div className={`${styles.bar} ${darkMode ? styles.barDark : ""}`}>
  <div className={styles.left}>
    <span>Showing </span>

    <div className={`${styles.customSelect} ${darkMode ? styles.customSelectDark : ""}`}>
      <select
        className={`${styles.selectField} ${darkMode ? styles.selectFieldDark : ""}`}
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        {pageSizeOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <i
        className={`fa-solid fa-chevron-down ${darkMode ? styles.iconWhite : "text-black"}`}
      ></i>
    </div>

    <span>of {totalResults} Results</span>
  </div>

  <div>
    <span>Page {pageNumber} of {totalPages}</span>

    <button
      className={`${styles.iconBtn} ${darkMode ? styles.iconBtnDark : ""}`}
      onClick={handlePrev}
      disabled={!canPrev}
      aria-label="Previous page"
    >
      <i className={`fa-solid fa-chevron-left ${darkMode ? styles.iconWhite : ""}`} />
    </button>

    <button
      className={`${styles.iconBtn} ${darkMode ? styles.iconBtnDark : ""}`}
      onClick={handleNext}
      disabled={!canNext}
      aria-label="Next page"
    >
      <i className={`fa-solid fa-chevron-right ${darkMode ? styles.iconWhite : ""}`} />
    </button>
  </div>
</div>

  );
}
