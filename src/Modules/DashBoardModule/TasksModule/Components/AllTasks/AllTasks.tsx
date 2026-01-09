import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"; // تأكد من استيراد مكونات Bootstrap
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // تأكد من استيراد toast
import { PROJECT_URLS, TASK_URLS, USERS_URL } from "../../../../../Services/Api/ApisUrls";
import { http } from "../../../../../Services/Api/httpInstance";

// Components
import DeleteConfirmation from "../../../../../SharedComponents/Components/DeleteConfirmation/DeleteConfirmation";
import NoData from "../../../../../SharedComponents/Components/NoData/NoData";
import PaginationBar from "../../../ProjectsModule/Components/AllProjects/PaginationBar";
import SearchBox from "../../../ProjectsModule/Components/AllProjects/SearchBox";

// Styles
import styles from "../../../UsersModule/Components/UsersForm.module.css";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  employee: { id: number; userName?: string } | null;
  project: { id: number; title?: string } | null;
  creationDate: string;
};

type User = { id: number; userName: string };
type Project = { id: number; title: string };

export default function AllTasks() {
  const navigate = useNavigate();
  
  // States الأساسية
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  
  // States للباجينيشن والبحث (تم توحيدهم ومنع التكرار)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  
  // UI States
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskId, setTaskId] = useState(0);
  const [taskName, setTaskName] = useState('');

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTask, setViewTask] = useState<any>(null);
  const [loadingView, setLoadingView] = useState(false);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newStatus, setNewStatus] = useState("");

  // 1. جلب المهمات
  const getAllTasks = async () => {
    try {
      const response = await http.get(TASK_URLS.GET_TASKS_BY_MANAGER, {
        params: { 
          pageNumber: currentPage, 
          pageSize: pageSize,
          title: searchTerm 
        },
      });
      setTasksList(response.data.data ?? []);
      setTotalResults(response.data.totalNumberOfRecords ?? 0);
    } catch (error) {
      console.error("Failed to load tasks", error);
      toast.error("Failed to load tasks");
    }
  };

  // 2. جلب المستخدمين والمشاريع
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

  // 3. حذف مهمة
  const deleteTask = async () => {
    try {
      await http.delete(TASK_URLS.DELETE_TASK(taskId));
      toast.success("Task deleted successfully");
      setShowDeleteModal(false);
      getAllTasks(); // إعادة تحميل البيانات
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  // 4. تغيير الحالة
  const changeTaskStatus = async () => {
    if (!selectedTask) return;
    try {
      await http.put(TASK_URLS.CHANGE_STATUS(selectedTask.id), { status: newStatus });
      setTasksList((prev) =>
        prev.map((t) => (t.id === selectedTask.id ? { ...t, status: newStatus } : t))
      );
      toast.success("Status updated successfully");
      setShowStatusModal(false);
    } catch (err) {
      toast.error("Failed to change status");
    }
  };

  // UseEffects
  useEffect(() => {
    getAllTasks();
  }, [currentPage, pageSize, searchTerm]);

  useEffect(() => {
    getUsersAndProjects();
  }, []);

  // Handlers
  const handleSearch = (q: string) => {
    setSearchTerm(q);
    setCurrentPage(1);
  };

  const getUserName = (id: number | undefined) =>
    users.find((u) => u.id === id)?.userName ?? "-";

  const getProjectTitle = (id: number | undefined) =>
    projects.find((p) => p.id === id)?.title ?? "-";

  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "todo": return styles.statusTodo;
      case "inprogress": return styles.statusProgress;
      case "done": return styles.statusDone;
      default: return styles.statusDefault;
    }
  };

  return (
    <>
      <header className="bg-white overflow-hidden rounded rounded-4 my-2">
        <div className="d-flex justify-content-between align-items-center p-3">
          <h3 className="text-black m-0 ms-3">Tasks</h3>
          <button className="btn btn-warning rounded-5 px-4 me-3" onClick={() => navigate("/dashboard/tasks/add")}>
            + Add New Task
          </button>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.searchSection}>
          <div className={styles.searchContainer} style={{ background: "none", boxShadow: "none" }}>
            <SearchBox onSearch={handleSearch} debounceMs={400} />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>Title</th>
                <th className={styles.tableHeaderCell}>Status</th>
                <th className={styles.tableHeaderCell}>User</th>
                <th className={styles.tableHeaderCell}>Project</th>
                <th className={styles.tableHeaderCell}>Date Created</th>
                <th className={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasksList.length > 0 ? (
                tasksList.map((task) => (
                  <tr key={task.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{task.title}</td>
                    <td className={styles.tableCell}>
                      <span 
                        onClick={() => { setSelectedTask(task); setNewStatus(task.status); setShowStatusModal(true); }}
                        className={`${styles.statusBadge} ${task.status === 'Done' ? styles.statusActive : styles.statusNotActive}`}
                        style={{ cursor: 'pointer' }}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className={styles.tableCell}>{getUserName(task.employee?.id)}</td>
                    <td className={styles.tableCell}>{getProjectTitle(task.project?.id)}</td>
                    <td className={styles.tableCell}>{new Date(task.creationDate).toLocaleDateString("en-GB")}</td>
                    <td className={styles.tableCell} style={{ position: "relative" }}>
                      <button onClick={() => setShowMenu(showMenu === task.id ? null : task.id)} className={styles.actionButton}>⋮</button>
                      {showMenu === task.id && (
                        <div className={styles.actionMenu}>
                          <button className={styles.menuItem} onClick={() => { setViewTask(task); setShowViewModal(true); }}>👁️ View</button>
                          <button className={styles.menuItem} onClick={() => navigate(`/dashboard/tasks/edit/${task.id}`)}>📝 Edit</button>
                          <button className={`${styles.menuItem} text-danger`} onClick={() => { setTaskId(task.id); setTaskName(task.title); setShowDeleteModal(true); }}>🗑️ Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="text-center py-5"><NoData /></td></tr>
              )}
            </tbody>
          </table>
        </div>

        <PaginationBar
          totalResults={totalResults}
          pageNumber={currentPage}
          pageSize={pageSize}
          onPageChange={(p) => setCurrentPage(p)}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
        />
      </div>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Delete Task</Modal.Title></Modal.Header>
        <Modal.Body><DeleteConfirmation name={taskName} deleteItem="Task" /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={deleteTask}>Delete</Button>
        </Modal.Footer>
      </Modal>

      {/* Status Modal */}
      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)} centered size="sm">
        <Modal.Header closeButton><Modal.Title>Update Status</Modal.Title></Modal.Header>
        <Modal.Body>
          <select className="form-select" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            <option value="ToDo">To Do</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={changeTaskStatus}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}