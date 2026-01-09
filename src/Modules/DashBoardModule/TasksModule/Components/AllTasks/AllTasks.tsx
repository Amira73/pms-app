import { useEffect, useState } from "react";
import { TASK_URLS, USERS_URL, PROJECT_URLS } from "../../../../../Services/Api/ApisUrls";
import { http } from "../../../../../Services/Api/httpInstance";
import { useNavigate } from "react-router-dom";

// استيراد المكونات المشتركة بنفس الطريقة
import SearchBox from "../../../ProjectsModule/Components/AllProjects/SearchBox";
import PaginationBar from "../../../ProjectsModule/Components/AllProjects/PaginationBar";
import NoData from "../../../../../SharedComponents/Components/NoData/NoData";

// استيراد الـ CSS الخاص باليوزرز لتوحيد التصميم
import styles from "../../../UsersModule/Components/UsersForm.module.css"; 

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  employee: { id: number } | null;
  project: { id: number } | null;
  creationDate: string;
};

type User = { id: number; userName: string };
type Project = { id: number; title: string };

export default function AllTasks() {
  const navigate = useNavigate();
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  
  // States للباجينيشن والبحث مثل اليوزرز
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState<number | null>(null);

  const getAllTasks = async () => {
    try {
      const response = await http.get(TASK_URLS.GET_TASKS_BY_MANAGER, {
        params: { 
          pageNumber: currentPage, 
          pageSize: pageSize,
          title: searchTerm // نمرر كلمة البحث للـ API
        },
      });
      setTasksList(response.data.data ?? []);
      setTotalResults(response.data.totalNumberOfRecords ?? 0);
    } catch (error) {
      console.error("Failed to load tasks", error);
    }
  };

  const getUsersAndProjects = async () => {
    try {
      const [usersRes, projectsRes] = await Promise.all([
        http.get(USERS_URL.GET_ALL_USERS),
        http.get(PROJECT_URLS.GET_ALL_PROJECTS),
      ]);
      setUsers(usersRes.data.data ?? []);
      setProjects(projectsRes.data.data ?? []);
    } catch (err) {
      console.error("Failed to load users/projects", err);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [currentPage, pageSize, searchTerm]);

  useEffect(() => {
    getUsersAndProjects();
  }, []);

  const handleSearch = (q: string) => {
    setSearchTerm(q);
    setCurrentPage(1);
  };

  const getUserName = (id: number | undefined) =>
    users.find((u) => u.id === id)?.userName ?? "-";

  const getProjectTitle = (id: number | undefined) =>
    projects.find((p) => p.id === id)?.title ?? "-";

  return (
    <>
      {/* الهيدر بنفس تصميم اليوزرز */}
      <header className="bg-white overflow-hidden rounded rounded-4 my-2">
        <div className="container-fluid px-0">
          <div className="d-flex justify-content-between align-items-center p-3">
            <h3 className="text-black m-0 ms-3">Tasks</h3>
            <button
              className="btn btn-warning rounded-5 px-4 me-3"
              onClick={() => navigate("/dashboard/tasks/add")}
            >
              + Add New Task
            </button>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <div style={{ marginBottom: "20px" }}>
          {/* قسم البحث والفلتر الموحد */}
          <div className={styles.searchSection}>
            <div
              className={styles.searchContainer}
              style={{ background: "none", boxShadow: "none" }}
            >
              <SearchBox onSearch={handleSearch} debounceMs={400} />
              <button className={styles.filterButton}>
                <i className="fa-solid fa-filter"></i> Filter
              </button>
            </div>
          </div>

          {/* الجدول بنفس كلاسات اليوزرز */}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableHeaderCell}>Title <i className="fa-solid fa-sort ms-1"></i></th>
                  <th className={styles.tableHeaderCell}>Status <i className="fa-solid fa-sort ms-1"></i></th>
                  <th className={styles.tableHeaderCell}>User <i className="fa-solid fa-sort ms-1"></i></th>
                  <th className={styles.tableHeaderCell}>Project <i className="fa-solid fa-sort ms-1"></i></th>
                  <th className={styles.tableHeaderCell}>Date Created <i className="fa-solid fa-sort ms-1"></i></th>
                  <th className={styles.tableHeaderCell}></th>
                </tr>
              </thead>
              <tbody>
                {tasksList.length > 0 ? (
                  tasksList.map((task) => (
                    <tr key={task.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>{task.title}</td>
                      <td className={styles.tableCell}>
                        {/* استخدام الـ Badge حسب الحالة */}
                        <span className={`${styles.statusBadge} ${task.status === 'Done' ? styles.statusActive : styles.statusNotActive}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className={styles.tableCell}>{getUserName(task.employee?.id)}</td>
                      <td className={styles.tableCell}>{getProjectTitle(task.project?.id)}</td>
                      <td className={styles.tableCell}>
                        {new Date(task.creationDate).toLocaleDateString("en-GB")}
                      </td>
                      <td className={styles.tableCell} style={{ position: "relative" }}>
                        <button
                          onClick={() => setShowMenu(showMenu === task.id ? null : task.id)}
                          className={styles.actionButton}
                        >
                          ⋮
                        </button>
                        {showMenu === task.id && (
                          <div className={styles.actionMenu}>
                            <button className={styles.menuItem} onClick={() => navigate(`/dashboard/tasks/view/${task.id}`)}>
                              👁️ View
                            </button>
                            <button className={styles.menuItem}>
                              📝 Edit
                            </button>
                            <button className={`${styles.menuItem} text-danger`}>
                              🗑️ Delete
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

          {/* الباجينيشن بار الموحد */}
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