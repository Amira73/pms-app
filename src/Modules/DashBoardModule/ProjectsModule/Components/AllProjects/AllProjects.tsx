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
  let navigate=useNavigate()
      const [show, setShow] = useState(false);
      const[projectId,setProjectId]=useState(0);
       const[projectName,setProjectName]=useState("");
const [isDeleting, setIsDeleting] = useState(false)!;

 async function load() {
      const res = await getManagerProjectsFun({
        pageSize,
        pageNumber,
        title: search,
      });

      setProectsList(res?.data ?? []);
        setTotalResults(res?.totalNumberOfRecords ?? 0);
    setTotalPages(res?.totalPages ?? 1);
    }
       const handleClose = () => setShow(false);
      const handleShow = (project:Project) => {
        setProjectId(project.id)
        setProjectName(project.title)
      
      
        setShow(true);
      }

    
const handleDelete = async () => {
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
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
const [totalResults, setTotalResults] = useState(0);
const [totalPages, setTotalPages] = useState(1);

  const [projects, setProectsList] = useState<Project[]>([]);

  const handleSearch = (q: string) => {
    setSearch(q);
    setPageNumber(1);
  };

  useEffect(() => {
   

    load();
  }, [search, pageNumber, pageSize]);

  return (
    <>

    <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
       <DeleteConfirmation deleteItem="project " name={projectName}></DeleteConfirmation>
        <Modal.Footer>
          
          <Button variant="outline-danger"onClick={handleDelete} >
           Delete This item
          </Button>
        </Modal.Footer>
      </Modal>
      <Header btn_text="Add New Project" title="Projects" onBtnClick={() => navigate("/dashboard/projects/add")} />

      <SearchBox onSearch={handleSearch} debounceMs={400} />

      <div className="table-responsive mx-4">
        <table className="table table-striped">
          <thead className="">
            <tr className="table-header-row primary-color-bg2">
             <th>
  <div className="d-flex align-items-center gap-2">
    <span>Title</span>
    <i className="fa-solid fa-sort text-white"></i>
  </div>
</th>
                     <th>
  <div className="d-flex align-items-center gap-2">
    <span>Status</span>
    <i className="fa-solid fa-sort text-white"></i>
  </div>
</th>
                      <th>
  <div className="d-flex align-items-center gap-2">
    <span>Num Users</span>
    <i className="fa-solid fa-sort text-white"></i>
  </div>
</th>
                      <th>
  <div className="d-flex align-items-center gap-2">
    <span>Num Tasks</span>
    <i className="fa-solid fa-sort text-white"></i>
  </div>
</th>
                      <th>
  <div className="d-flex align-items-center gap-2">
    <span>Date Created</span>
    <i className="fa-solid fa-sort text-white"></i>
  </div>
</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {projects.length > 0 ? (
              projects.map((project, idx) => (
                <tr key={project.id || idx}>
                  <td>{project.title}</td>
                  <td>Public</td>
                  <td>2</td>
                  <td>{project.task.length}</td>
                  <td>{project.creationDate}</td>

                  <td>
                    <div className="dropdown">
                      <button
                        className="btn btn-link p-0 text-dark"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa-solid fa-ellipsis"></i>
                      </button>

                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <button
                            className="dropdown-item primary-color2"
                            onClick={() => console.log("View")}
                          >
                            <i className="fa-regular fa-eye me-2"></i> View
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item primary-color2"
                            onClick={() => console.log("Edit")}
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
                  </td>
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>
      </div>

    <PaginationBar
  totalResults={totalResults}
  
  pageNumber={pageNumber}
  pageSize={pageSize}
  onPageChange={setPageNumber}
  onPageSizeChange={(size) => {
    setPageSize(size);
    setPageNumber(totalPages);
  }}
/>
    </>
  );
}

