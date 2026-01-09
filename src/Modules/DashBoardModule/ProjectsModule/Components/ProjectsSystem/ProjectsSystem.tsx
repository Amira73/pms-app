import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

// المكونات المشتركة
import NoData from "../../../../../SharedComponents/Components/NoData/NoData";
import SearchBox from "../AllProjects/SearchBox";
import PaginationBar from "../AllProjects/PaginationBar";

// الخدمات والستايل
import { getSystemProjectsFun } from "./getSystemProjects";
import styles from "../../../UsersModule/Components/UsersForm.module.css";
export default function ProjectsSystem() {
  // --- التعريفات والـ Types (كما هي في البروجيكت) ---
  type Manager = {
    id: number;
    userName: string;
    email: string;
  };

  type Project = {
    id: number;
    title: string;
    description: string;
    status: string;
    creationDate: string;
    manager: Manager;
  };

  // --- الحالات (States) كما هي في البروجيكت ---
  const [projects, setProectsList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [showMenu, setShowMenu] = useState<number | null>(null); // لإظهار النقاط ⋮ مثل اليوزرز

  // --- دالة التحميل (Logic) كما هي ---
  const load = async () => {
    setIsLoading(true);
    try {
      const res = await getSystemProjectsFun({
        pageSize,
        pageNumber,
        title: search,
      });
      setProectsList(res?.data ?? []);
      setTotalResults(res?.totalNumberOfRecords ?? 0);
    } catch (err) {
      console.error("load projects failed:", err);
      setProectsList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (q: string) => {
    if (q === search) return;
    setSearch(q);
    setPageNumber(1);
  };

  useEffect(() => {
    load();
  }, [search, pageNumber, pageSize]);

  return (
    <>
      <header className="bg-white overflow-hidden rounded rounded-4 my-2">
        <div className="container-fluid px-0">
          <div className="d-flex justify-content-between p-3 text-white">
            <h3 className="text-black   m-3">Projects System</h3>
          </div>
        </div>
      </header>
            <div className={styles.container}>

        <div style={{ marginBottom: "20px" }}>
          <div className={styles.searchSection}>
            <div className={styles.searchContainer} style={{ background: 'none', boxShadow: 'none' }}>
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
                    Title <span className={styles.sortIcon}><i className="fa-solid fa-sort"></i></span>
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Status <span className={styles.sortIcon}><i className="fa-solid fa-sort"></i></span>
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Manager <span className={styles.sortIcon}><i className="fa-solid fa-sort"></i></span>
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Manager Mail <span className={styles.sortIcon}><i className="fa-solid fa-sort"></i></span>
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Date Created <span className={styles.sortIcon}><i className="fa-solid fa-sort"></i></span>
                  </th>
                  <th className={styles.tableHeaderCell}></th>
                </tr>
              </thead>
              
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-5">
                      <Spinner animation="border" variant="success" />
                    </td>
                  </tr>
                ) : projects.length > 0 ? (
                  projects.map((project) => (
                    <tr key={project.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>{project.title}</td>
                      <td className={styles.tableCell}>
                        <span className="primarycolorbg2 px-3 py-1 rounded-pill text-white" style={{fontSize: '0.8rem'}}>
                          Public
                        </span>
                      </td>
                      <td className={styles.tableCell}>{project.manager?.userName ?? "-"}</td>
                      <td className={styles.tableCell}>{project.manager?.email ?? "-"}</td>
                      <td className={styles.tableCell}>
                        {new Date(project.creationDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className={styles.tableCell} style={{ position: "relative" }}>
                        <button 
                          onClick={() => setShowMenu(showMenu === project.id ? null : project.id)}
                          className={styles.actionButton}
                        >
                          ⋮
                        </button>
                        {showMenu === project.id && (
                          <div className={styles.actionMenu}>
                            <button className={styles.menuItem}> View</button>
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

          <div className="mt-4">
            <PaginationBar
              totalResults={totalResults}
              pageNumber={pageNumber}
              pageSize={pageSize}
              onPageChange={(p) => setPageNumber(p)}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPageNumber(1);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}