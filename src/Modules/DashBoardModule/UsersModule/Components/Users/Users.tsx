import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "../UsersForm.module.css";

// المكونات المشتركة من البروجيكت
import SearchBox from "../../../ProjectsModule/Components/AllProjects/SearchBox";
import PaginationBar from "../../../ProjectsModule/Components/AllProjects/PaginationBar";
import NoData from "../../../../../SharedComponents/Components/NoData/NoData";

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
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [showMenu, setShowMenu] = useState<number | null>(null);

  const fetchUsers = () => {
    try {
      // بيانات تجريبية (سيتم استبدالها بطلب API لاحقاً)
      const allData: User[] = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name:
          index % 3 === 0
            ? "Ahmed"
            : index % 2 === 0
            ? "Upskilling"
            : "Mohamed",
        status: index % 4 === 0 ? "Not Active" : "Active",
        phone: `0112432${100 + index}`,
        email: "user@example.com",
        dateCreated: "09-23-2023",
      }));

      // منطق البحث الشامل (اسم، تليفون، حالة)
      const filteredData = allData.filter((user) => {
        const term = searchTerm.toLowerCase();
        return (
          user.name.toLowerCase().includes(term) ||
          user.phone.includes(term) ||
          user.status.toLowerCase().includes(term)
        );
      });

      // تقسيم البيانات بناءً على الصفحة الحالية (Pagination Logic)
      const startIndex = (currentPage - 1) * pageSize;
      const paginatedData = filteredData.slice(
        startIndex,
        startIndex + pageSize
      );

      setUsers(paginatedData);
      setTotalResults(filteredData.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, pageSize, currentPage]);

  const handleSearch = (q: string) => {
    setSearchTerm(q);
    setCurrentPage(1); // تصفير الصفحة عند البحث
  };

  const getStatusStyle = (status: "Active" | "Not Active") => {
    return `${styles.statusBadge} ${
      status === "Active" ? styles.statusActive : styles.statusNotActive
    }`;
  };

  return (
    <>
      <header className="bg-white overflow-hidden rounded rounded-4 my-2">
        <div className="container-fluid px-0">
          <div className="d-flex justify-content-between p-3 text-white">
            <h3 className="text-black  m-3">Users</h3>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <div style={{ marginBottom: "20px" }}>
          <div className={styles.searchSection}>
            <div
              className={styles.searchContainer}
              style={{ background: "none", boxShadow: "none" }}
            >
              {/* السيرش بوكس الخاص بالسيستم */}
              <SearchBox onSearch={handleSearch} debounceMs={400} />

              <button className={styles.filterButton}>
                <i className="fa-solid fa-filter"></i> Filter
              </button>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableHeaderCell}>
                    User Name{" "}
                    <span className={styles.sortIcon}>
                      <i className="fa-solid fa-sort"></i>
                    </span>
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Statuses{" "}
                    <span className={styles.sortIcon}>
                      <i className="fa-solid fa-sort"></i>
                    </span>
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Phone Number{" "}
                    <span className={styles.sortIcon}>
                      <i className="fa-solid fa-sort"></i>
                    </span>
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Email{" "}
                    <span className={styles.sortIcon}>
                      <i className="fa-solid fa-sort"></i>
                    </span>
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Date Created{" "}
                    <span className={styles.sortIcon}>
                      <i className="fa-solid fa-sort"></i>
                    </span>
                  </th>
                  <th className={styles.tableHeaderCell}></th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
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
                            <button className={styles.menuItem}> View</button>
                            <button className={styles.menuItem}>
                               Block
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-5">
                      <NoData />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* الباجينيشن بار الموحد (هيظهر الأرقام 1, 2, 3...) */}
          <div className="mt-4">
            <PaginationBar
              totalResults={totalResults}
              pageNumber={currentPage}
              pageSize={pageSize}
              onPageChange={(p) => setCurrentPage(p)}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
