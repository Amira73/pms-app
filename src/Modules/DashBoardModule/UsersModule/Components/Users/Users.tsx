import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "../UsersForm.module.css";

interface User {
  id: number;
  name: string;
  status: "Active" | "Not Active";
  phone: string;
  email: string;
  dateCreated: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(10);
  const [totalResults] = useState(102);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const fetchUsers = () => {
    try {
      const simulatedUsers: User[] = Array.from(
        { length: pageSize },
        (_, index) => {
          const globalIndex = (currentPage - 1) * pageSize + index + 1;
          const status = globalIndex % 4 === 0 ? "Not Active" : "Active";
          return {
            id: globalIndex,
            name: globalIndex === 1 ? "Upskilling" : `User ${globalIndex}`,
            status: status as "Active" | "Not Active",
            phone: "01124323245",
            email: "Upskilling.egl@gmail.com",
            dateCreated: "09-23-2023",
          };
        }
      );
      setUsers(simulatedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setShowMenu(null);
    }
  };

  const getStatusStyle = (status: "Active" | "Not Active") => {
    return `${styles.statusBadge} ${
      status === "Active" ? styles.statusActive : styles.statusNotActive
    }`;
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.header}>Users</h2>

        <div style={{ marginBottom: "20px" }}>
          <div className={styles.searchSection}>
            <div className={styles.searchContainer}>
              <div className={styles.searchInputWrapper}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <button className={styles.filterButton}><i className="fa-solid fa-filter"></i> Filter</button>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableHeaderCell}>
                    User Name{" "}
                    <span className={styles.sortIcon}>
                      <i className="fa-solid fa-sort text-white"></i>
                    </span>
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Statuses{" "}
                    <span className={styles.sortIcon}>
                      <i className="fa-solid fa-sort text-white"></i>
                    </span>
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Phone Number{" "}
                    <span className={styles.sortIcon}>
                      <i className="fa-solid fa-sort text-white"></i>
                    </span>
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Email{" "}
                    <span className={styles.sortIcon}>
                      <i className="fa-solid fa-sort text-white"></i>
                    </span>
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Date Created{" "}
                    <span className={styles.sortIcon}>
                      <i className="fa-solid fa-sort text-white"></i>
                    </span>
                  </th>
                  <th className={styles.tableHeaderCell}></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{user.name}</td>
                    <td className={styles.tableCell}>
                      <span className={getStatusStyle(user.status)}>
                        {user.status}
                      </span>
                    </td>
                    <td className={styles.tableCell}>{user.phone}</td>
                    <td className={styles.tableCell}>{user.email}</td>
                    <td className={styles.tableCell}>{user.dateCreated}</td>
                    <td
                      className={styles.tableCell}
                      style={{ position: "relative" }}
                    >
                      {/* النقط ستصبح خضراء الآن بسبب التعديل في ملف الـ CSS */}
                      <button
                        onClick={() =>
                          setShowMenu(showMenu === user.id ? null : user.id)
                        }
                        className={styles.actionButton}
                      >
                        ⋮
                      </button>
                      {showMenu === user.id && (
                        <div className={styles.actionMenu}>
                          <button
                            onClick={() => setShowMenu(null)}
                            className={styles.menuItem}
                          >
                            👁️ View
                          </button>
                          <button
                            onClick={() => setShowMenu(null)}
                            className={styles.menuItem}
                          >
                            🚫 Block
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.paginationContainer}>
            <div className={styles.paginationLeft}>
              <span>Showing</span>
              <div className={styles.pageSizeWrapper}>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className={styles.pageSizeSelect}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className={styles.chevronIcon}>⌄</span>
              </div>
              <span>of {totalResults} Results</span>
            </div>

            <div className={styles.paginationRight}>
              <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
              <div className={styles.paginationControls}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.pageArrow}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.pageArrow}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
