import { useEffect, useState } from "react";

import Header from "../../../../../SharedComponents/Components/Header/Header";

import NoData from "../../../../../SharedComponents/Components/NoData/NoData";

import { useNavigate } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";

import SearchBox from "../AllProjects/SearchBox";

import PaginationBar from "../AllProjects/PaginationBar";

import { getSystemProjectsFun } from "./getSystemProjects";

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

  const [projectId, setProjectId] = useState(0);

  const [projectName, setProjectName] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [pageNumber, setPageNumber] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const [totalResults, setTotalResults] = useState(0);

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
                  <span>Manager</span>

                  <i className="fa-solid fa-sort text-white"></i>
                </div>
              </th>

              <th className="py-2">
                <div className="d-flex align-items-center gap-2">
                  <span>Manager Mail</span>

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

                  <td>{project.manager?.userName ?? "-"}</td>

                  <td>{project.manager?.email ?? "-"}</td>

                  {/* <td>{project.task.length}</td> */}

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
        onPageChange={(p) => setPageNumber(p)}
        onPageSizeChange={(size) => {
          setPageSize(size);

          setPageNumber(1);
        }}
      />
    </>
  );
}
