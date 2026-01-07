import { useEffect, useState } from "react";
import { TASK_URLS, USERS_URL, PROJECT_URLS } from "../../../../../Services/Api/ApisUrls";
import { http } from "../../../../../Services/Api/httpInstance";
import { useNavigate } from "react-router-dom";
import NoData from "../../../../../SharedComponents/Components/NoData/NoData";
import styles from "./AllTasks.module.css";

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

  const getAllTasks = async () => {
    try {
      const response = await http.get(TASK_URLS.GET_TASKS_BY_MANAGER, {
        params: { pageNumber: 1, pageSize: 10 },
      });
      setTasksList(response.data.data ?? []);
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
    getUsersAndProjects();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  // Helper to map IDs to names
  const getUserName = (id: number | undefined) =>
    users.find((u) => u.id === id)?.userName ?? "-";

  const getProjectTitle = (id: number | undefined) =>
    projects.find((p) => p.id === id)?.title ?? "-";

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center bg-white border border-1 p-3">
          <h1>Tasks</h1>
          <button
            className="p-2 px-5 bg-warning rounded-5 border-0"
            onClick={() => navigate("/dashboard/tasks/add")}
          >
            + Add New Task
          </button>
        </div>
      </div>

      <div className={`container-fluid ${styles.backgroundPage}`}>
        {/* Search & Filter */}
        <div className="container d-flex justify-content-start align-items-center bg-white rounded-3 p-3 mb-3">
          <div className={`${styles.searchWrapper} me-3`}>
            <i className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`}></i>
            <input
              type="text"
              placeholder="Search tasks"
              className={`form-control rounded-4 ms-2 ${styles.searchInput}`}
            />
          </div>
          <button className="rounded-5 bg-white px-4">Filter</button>
        </div>

        {/* Tasks Table */}
        <div className="container bg-white rounded-3 p-3">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className={`${styles.tableHeader}`}>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">User</th>
                  <th scope="col">Project</th>
                  <th scope="col">Date Created</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasksList.length > 0 ? (
                  tasksList.map((task) => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.status}</td>
                      <td>{getUserName(task.employee?.id)}</td>
                      <td>{getProjectTitle(task.project?.id)}</td>
                      <td>{formatDate(task.creationDate)}</td>
                      <td>
                        <div className="dropdown">
                          <i
                            className="fa-solid fa-ellipsis-vertical cursor-pointer"
                            data-bs-toggle="dropdown"
                          />
                          <ul className="dropdown-menu">
                            <li>
                              <button className="dropdown-item">
                                <i className="fa-solid fa-eye"></i> View
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item">
                                <i className="fa-solid fa-edit"></i> Edit
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item text-danger">
                                <i className="fa-solid fa-trash"></i> Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <NoData />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
