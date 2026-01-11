import { useEffect, useState } from "react";

import Header from "../../../../../SharedComponents/Components/Header/Header";

import NoData from "../../../../../SharedComponents/Components/NoData/NoData";

import { useNavigate } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";

import SearchBox from "../AllProjects/SearchBox";

import PaginationBar from "../AllProjects/PaginationBar";

import { getSystemProjectsFun } from "./getSystemProjects";
import styles from "../../../UsersModule/Components/UsersForm.module.css";
import { Button, Modal } from "react-bootstrap";
export default function ProjectsSystem() {
  type Manager = {
    id: number;

    userName: string;

    imagePath?: string | null;

    email: string;

    country?: string | null;

    phoneNumber?: string | null;

    verificationCode?: string | null;

    isVerified?: boolean;

    isActive?: boolean; // كمّلي باقي الحقول اللي عندك
  };

  type Project = {
    id: number;

    title: string;

    description: string;

    status: "ToDo" | "InProgress" | "Done" | string;

    creationDate: string;
      modificationDate: string;
    manager: Manager;
  };

  type ProjectsResponse = {
    pageNumber: number;

    pageSize: number;

    totalPages: number;

    totalNumberOfRecords: number;

    data: Project[];
  };

  const [projects, setProectsList] = useState<Project[]>([]);

  let navigate = useNavigate();

  const [show, setShow] = useState(false);



  const [isDeleting, setIsDeleting] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [pageNumber, setPageNumber] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const [totalResults, setTotalResults] = useState(0);
  const [showMenu, setShowMenu] = useState<number | null>(null); // لإظهار النقاط ⋮ مثل اليوزرز
          const [show2, setShow2] = useState(false);
                const[projectId,setProjectId]=useState(0);
       const[projectName,setProjectName]=useState("");
          const[projectDes,setProjectDesc]=useState("");
             const[projectDate,setProjectDate]=useState("");
                 const[projectDatemod,setProjectDatemod]=useState("");

  const handleShow2 = (project:Project) => {
        setProjectId(project.id)
        setProjectName(project.title)
        setProjectDate(project.creationDate)
        setProjectDatemod(project.modificationDate)
        setProjectDesc(project.description)
      
      
        setShow2(true);
      }
               const handleClose2 = () => setShow2(false);


  const [totalPages, setTotalPages] = useState(1);

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
            {new Date(projectDatemod?? "").toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  </Modal.Body>
      {/* <DeleteConfirmation deleteItem="project " name={projectName}></DeleteConfirmation> */}
        <Modal.Footer>

          
          <Button variant="outline-danger"onClick={handleClose2} >
           Cancle
          </Button>
        </Modal.Footer>
      </Modal>
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
                            <button className={styles.menuItem}   
                             onClick={() => handleShow2(project)}
                            > View</button>
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
