import React, { useEffect, useState } from "react";
import styles from './AllProject.module.css'


type SearchBoxProps = {
  /** Called when user triggers search (button click / Enter / debounce if enabled) */
  onSearch?: (query: string) => void;

  /** Enable auto-search while typing */
  debounceMs?: number;

  /** Optional initial value */
  defaultValue?: string;

  /** Placeholder text */
  placeholder?: string;
};

export default function SearchBox({
  onSearch,
  debounceMs,
  defaultValue = "",
  placeholder = "Search By Title",
}: SearchBoxProps) {
  const [query, setQuery] = useState<string>(defaultValue);

  const triggerSearch = () => {
    onSearch?.(query.trim());
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") triggerSearch();
  };

  // Optional debounce (only if debounceMs is provided)
  useEffect(() => {
    if (!debounceMs) return;

    const t = window.setTimeout(() => {
      onSearch?.(query.trim());
    }, debounceMs);

    return () => window.clearTimeout(t);
  }, [query, debounceMs, onSearch]);

  return (
 
    <div className={`  ${styles.searchContainer}`}>
      <div className={styles.searchBox}>
<i className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`}></i>

        <input
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          onKeyDown={onKeyDown}
        />

     
      </div>
    </div>
  );
}
