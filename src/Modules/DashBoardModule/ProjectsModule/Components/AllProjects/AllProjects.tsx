import { useEffect, useState } from "react";
import { getManagerProjectsFun } from "./getManagerProjects";
import Header from "../../../../../SharedComponents/Components/Header/Header";
import NoData from "../../../../../SharedComponents/Components/NoData/NoData";
import SearchBox from "./SearchBox";
import PaginationBar from "./PaginationBar";
import { Button, Modal } from "react-bootstrap";
import DeleteConfirmation from "../../../../../SharedComponents/Components/DeleteConfirmation/DeleteConfirmation";
import { http } from "../../../../../Services/Api/httpInstance";
import { USERS_URL } from "../../../../../Services/Api/ApisUrls";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { useMode } from "../../../../../Context/ModeContext";
import { useAuth } from "../../../../../Context/AuthContext";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
};

type Project = {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  status?: string;
  task: Task[];
};

export default function AllProjects() {
  const auth = useAuth();
  if (!auth) return null; // أو Loading / Error UI

  // const { loginData} = auth;
  const role = localStorage.getItem("userGroup");
  const isManager = role === "Manager";
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [projectDes, setProjectDesc] = useState("");
  const [projectDate, setProjectDate] = useState("");
  const [projectDatemod, setProjectDatemod] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [projects, setProectsList] = useState<Project[]>([]);
  const { darkMode } = useMode();

  const load = async () => {
    setIsLoading(true);

    try {
      const res = await getManagerProjectsFun(
        {
          pageSize,
          pageNumber,
          title: search,
        },
        role
      );

      setProectsList(res?.data ?? []);
      setTotalResults(res?.totalNumberOfRecords ?? 0);
      setTotalPages(res?.totalPages ?? 1);
    } catch (err) {
      console.error("load projects failed:", err);
      setProectsList([]);
      setTotalResults(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleShow = (project: Project) => {
    setProjectId(project.id);
    setProjectName(project.title);

    setShow(true);
  };
  const handleShow2 = (project: Project) => {
    setProjectId(project.id);
    setProjectName(project.title);
    setProjectDate(project.creationDate);
    setProjectDatemod(project.modificationDate);
    setProjectDesc(project.description);

    setShow2(true);
  };

  const handleDelete = async () => {
    //alert(projectId)
    if (!projectId) return;

    setIsDeleting(true);
    try {
      await http.delete(USERS_URL.DeleteProject(projectId));

      handleClose();
      await load();
    } catch (err) {
      const error = err as AxiosError<any>;

      const message =
        error.response?.data?.message ??
        error.response?.data?.error ??
        error.message ??
        "Failed to delete project";

      console.error("deleteProject failed:", {
        status: error.response?.status,
        message,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSearch = (q: string) => {
    if (q === search) return;
    setSearch(q);
    setPageNumber(1);
  };

  useEffect(() => {
    console.log("pageNumber changed to:", pageNumber);
    load();
  }, [search, pageNumber, pageSize]);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <DeleteConfirmation
          deleteItem="project "
          name={projectName}
        ></DeleteConfirmation>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete This item
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2} size="lg">
        <Modal.Header closeButton>
          <Modal.Title> Project Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="p-3 rounded-4 bg-light">
            {/* Header Card */}
            <div className="bg-white rounded-4 p-3 shadow-sm mb-3">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <h5 className="mb-1">{projectName}</h5>
                  <p className="text-muted mb-0">{projectDes}</p>
                </div>

                <span className="badge text-bg-secondary px-3 py-2 rounded-pill">
                  Info
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-4 p-3 shadow-sm">
              <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                <span className="text-muted fw-semibold">Title</span>
                <span className="fw-medium text-end">{projectName}</span>
              </div>

              <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                <span className="text-muted fw-semibold">Description</span>
                <span className="fw-medium text-end" style={{ maxWidth: 420 }}>
                  {projectDes}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                <span className="text-muted fw-semibold">Created At</span>
                <span className="fw-medium text-end">
                  {new Date(projectDate ?? "").toLocaleString()}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-start py-2">
                <span className="text-muted fw-semibold">Last Updated</span>
                <span className="fw-medium text-end">
                  {new Date(projectDatemod ?? "").toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </Modal.Body>
        {/* <DeleteConfirmation deleteItem="project " name={projectName}></DeleteConfirmation> */}
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose2}>
            Cancle
          </Button>
        </Modal.Footer>
      </Modal>
      <Header
        title="Projects"
        btn_text={isManager ? "Add New Project" : undefined}
        onBtnClick={() =>
          navigate("/dashboard/projects/add", {
            state: { mode: "add" },
          })
        }
      />

      <SearchBox onSearch={handleSearch} debounceMs={400} />

      <div className="table-responsive mx-4">
        <table className="table table-striped">
          <thead className="py-3">
            <tr className="table-header-row primary-color-bg2 py-3">
              <th className="py-2">
                <div className="d-flex align-items-center gap-2">
                  <span>Title</span>
                  <i className="fa-solid fa-sort text-white"></i>
                </div>
              </th>
              <th className="py-2">
                <div className="d-flex align-items-center gap-2">
                  <span>Status</span>
                  <i className="fa-solid fa-sort text-white"></i>
                </div>
              </th>
              <th className="py-2">
                <div className="d-flex align-items-center gap-2">
                  <span>Num Users</span>
                  <i className="fa-solid fa-sort text-white"></i>
                </div>
              </th>
              <th className="py-2">
                <div className="d-flex align-items-center gap-2">
                  <span>Num Tasks</span>
                  <i className="fa-solid fa-sort text-white"></i>
                </div>
              </th>
              <th className="py-2">
                <div className="d-flex align-items-center gap-2">
                  <span>Date Created</span>
                  <i className="fa-solid fa-sort text-white"></i>
                </div>
              </th>
              <th className="py-é"></th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  <Spinner animation="border" role="status" />
                </td>
              </tr>
            ) : projects.length > 0 ? (
              projects.map((project, idx) => (
                <tr key={project.id || idx}>
                  <td>{project.title}</td>
                  <td>
                    <span className="primarycolorbg2 px-3 py-1 rounded-pill text-white">
                      Public
                    </span>
                  </td>

                  <td>2</td>
                  <td>{project.task.length}</td>
                  <td>
                    {new Date(project.creationDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  <td>
                    {isManager && (
                      <div className="dropdown">
                        <button
                          className="btn btn-link p-0 text-dark"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i
                            className={`fa-solid fa-ellipsis ${
                              darkMode ? "text-white" : "text-dark"
                            }`}
                          ></i>
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <button
                              className="dropdown-item primary-color2"
                              onClick={() => handleShow2(project)}
                            >
                              <i className="fa-regular fa-eye me-2"></i>
                              View
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item primary-color2"
                              onClick={() =>
                                navigate("/dashboard/projects/add", {
                                  state: {
                                    mode: "edit",
                                    projectIdd: project.id,
                                  },
                                })
                              }
                            >
                              <i className="fa-regular fa-pen-to-square me-2"></i>{" "}
                              Edit
                            </button>
                          </li>

                          <li>
                            <button
                              className="dropdown-item primary-colo2r"
                              onClick={() => handleShow(project)}
                            >
                              <i className="fa-regular fa-trash-can me-2"></i>{" "}
                              Delete
                            </button>
                          </li>
                        </ul>
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
    </>
  );
}
