import { useEffect, useState } from "react";
import Header from "../../../../../SharedComponents/Components/Header/Header";
import NoData from "../../../../../SharedComponents/Components/NoData/NoData";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import SearchBox from "../AllProjects/SearchBox";
import PaginationBar from "../AllProjects/PaginationBar";
import { getSystemProjectsFun } from "./getSystemProjects";
import styles from "../../../UsersModule/Components/UsersForm.module.css";
// استيراد التنسيقات العالمية
import globalStyles from "../../../../../GlobalTable.module.css";
import { Button, Modal } from "react-bootstrap";
import { useMode } from "../../../../../Context/ModeContext";

export default function ProjectsSystem() {
  // ... (نفس التعريفات والـ States بدون تغيير) ...
  const [projects, setProectsList] = useState<any[]>([]);
  const { darkMode } = useMode();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [show2, setShow2] = useState(false);
  // ... باقي الـ states ...

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
      setProectsList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [search, pageNumber, pageSize]);

  // متغيرات الثيم للـ Scrollbar
  const themeVars = {
    "--scrollbar-track": darkMode ? "#212529" : "#f1f1f1",
    "--scrollbar-thumb": darkMode ? "#495057" : "#888",
  } as React.CSSProperties;

  return (
    <div style={themeVars} className={globalStyles.marginFix}>
      {/* ... (Modal Details بدون تغيير) ... */}

      <header className="bg-white overflow-hidden rounded rounded-4 my-2">
        <div className="container-fluid px-0">
          <div className="d-flex justify-content-between p-3 text-white">
            <h3 className={`text-black m-3 ${globalStyles.title}`}>
              Projects System
            </h3>
          </div>
        </div>
      </header>

      <SearchBox
        onSearch={(q) => {
          setSearch(q);
          setPageNumber(1);
        }}
        debounceMs={400}
      />

      {/* الحاوية المتجاوبة للجدول */}
      <div className={`${globalStyles.tableResponsive} table-responsive mx-4`}>
        <table className="table table-striped">
          <thead className="py-3">
            <tr className="table-header-row primary-color-bg2 py-3">
              <th className={styles.tableHeaderCell}>
                Title <i className="fa-solid fa-sort ms-2"></i>
              </th>
              <th className={styles.tableHeaderCell}>
                Status <i className="fa-solid fa-sort ms-2"></i>
              </th>
              <th className={styles.tableHeaderCell}>
                Manager <i className="fa-solid fa-sort ms-2"></i>
              </th>
              <th className={styles.tableHeaderCell}>
                Manager Mail <i className="fa-solid fa-sort ms-2"></i>
              </th>
              <th className={styles.tableHeaderCell}>
                Date Created <i className="fa-solid fa-sort ms-2"></i>
              </th>
              <th className={styles.tableHeaderCell}></th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6}>
                  {/* استخدام الـ Overlay للتوسط المريح */}
                  <div className={globalStyles.emptyState}>
                    <Spinner animation="border" variant="success" />
                  </div>
                </td>
              </tr>
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{project.title}</td>
                  <td className={styles.tableCell}>
                    <span
                      className="primarycolorbg2 px-3 py-1 rounded-pill text-white"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Public
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    {project.manager?.userName ?? "-"}
                  </td>
                  <td className={styles.tableCell}>
                    {project.manager?.email ?? "-"}
                  </td>
                  <td className={styles.tableCell}>
                    {new Date(project.creationDate).toLocaleDateString(
                      "en-GB",
                      { day: "2-digit", month: "short", year: "numeric" }
                    )}
                  </td>
                  <td
                    className={styles.tableCell}
                    style={{ position: "relative" }}
                  >
                    <button
                      onClick={() =>
                        setShowMenu(showMenu === project.id ? null : project.id)
                      }
                      className={`${styles.actionButton} ${
                        darkMode ? styles.actionButtonDark : ""
                      }`}
                    >
                      <i className="fa-solid fa-ellipsis-vertical" />
                    </button>
                    {showMenu === project.id && (
                      <div className={styles.actionMenu}>
                        <button
                          className={styles.menuItem}
                          onClick={() => {
                            /* handleShow2 */
                          }}
                        >
                          View
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

      <div className="mt-4 my-0 mt-0">
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
  );
}
