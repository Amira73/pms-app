import axios, { AxiosError } from "axios";
import { http } from "../../../../../Services/Api/httpInstance";
import { USERS_URL } from "../../../../../Services/Api/ApisUrls";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "ToDo" | "InProgress" | "Done" | string;
  creationDate: string;
  modificationDate: string;
};

type Project = {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  task: Task[];
};

type ProjectsResponse = {
  pageNumber: number;
  pageSize: number;
  data: Project[];
  totalNumberOfRecords?: number;
  totalPages?: number;
};

export async function getManagerProjectsFun(params: {
  pageNumber: number;
  pageSize: number;
  title?: string;
}): Promise<ProjectsResponse> {
  try {
    const res = await http.get<ProjectsResponse>(
      USERS_URL.GetAllProjects,
      { params }
    );

    return res.data;
  } catch (err) {
    const error = err as AxiosError<any>;

    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      "Failed to fetch projects";

    console.error("getManagerProjects failed:", {
      status: error.response?.status,
      message,
    });

    throw new Error(message);
  }
}
