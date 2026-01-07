import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

import { http } from "../../../../../Services/Api/httpInstance";
import { TASK_URLS, USERS_URL, PROJECT_URLS } from "../../../../../Services/Api/ApisUrls";
import styles from "./TaskForm.module.css";

type User = {
  id: number;
  userName: string;
};

type Project = {
  id: number;
  title: string;
};

type FormValues = {
  title: string;
  description: string;
  employeeId: number;
  projectId: number;
};

export default function TaskForm() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loaded = useRef(false); // prevent double fetch in StrictMode

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();

  // Load users & projects
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const fetchData = async () => {
      try {
        const [usersRes, projectsRes] = await Promise.all([
          http.get(USERS_URL.GET_ALL_USERS),
          http.get(PROJECT_URLS.GET_ALL_PROJECTS),
        ]);

        setUsers(usersRes.data.data ?? []);
        setProjects(projectsRes.data.data ?? []);
      } catch (err) {
        console.error("Failed to load users/projects:", err);
        toast.error("Failed to load users or projects");
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: FormValues) => {
    if (!data.employeeId || !data.projectId) {
      toast.error("Please select both a user and a project");
      return;
    }

    setIsSubmitting(true);

    try {
      await http.post(TASK_URLS.CREATE_TASK, data);
      toast.success("Task created successfully!");
      reset();
      navigate("/dashboard/tasks");
    } catch (err: any) {
      console.error("Task creation failed:", err);
      toast.error(
        err.response?.data?.message || 
        "Failed to create task. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="bg-white border border-1 p-3 mb-4">
        <h5>View All Tasks</h5>
        <h1>Add a New Task</h1>
      </div>

      <div className={`container w-75 ${styles.backgroundPage}`}>
        <div className="bg-white p-4 rounded shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            
            {/* Title */}
            <div className="mb-4">
              <label className="form-label text-muted">Title *</label>
              <input
                type="text"
                className={`form-control rounded-4 py-3 ${errors.title ? "is-invalid" : ""}`}
                placeholder="Enter task title"
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 3, message: "Title must be at least 3 characters" },
                  maxLength: { value: 150, message: "Title is too long" }
                })}
              />
              {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="form-label text-muted">Description *</label>
              <textarea
                rows={4}
                className={`form-control rounded-4 py-3 ${errors.description ? "is-invalid" : ""}`}
                placeholder="Describe the task..."
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 10, message: "Description must be at least 10 characters" }
                })}
              />
              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
            </div>

            {/* User & Project */}
            <div className="row mb-4 g-4">
              {/* User */}
              <div className="col-md-6">
                <label className="form-label text-muted">Assigned To *</label>
                <select
                  className={`form-select ${errors.employeeId ? "is-invalid" : ""}`}
                  {...register("employeeId", { required: "Please select an assignee", valueAsNumber: true })}
                >
                  <option value="">Select team member...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.userName}
                    </option>
                  ))}
                </select>
                {errors.employeeId && <div className="invalid-feedback">{errors.employeeId.message}</div>}
              </div>

              {/* Project */}
              <div className="col-md-6">
                <label className="form-label text-muted">Project *</label>
                <select
                  className={`form-select ${errors.projectId ? "is-invalid" : ""}`}
                  {...register("projectId", { required: "Please select a project", valueAsNumber: true })}
                >
                  <option value="">Select project...</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
                {errors.projectId && <div className="invalid-feedback">{errors.projectId.message}</div>}
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between align-items-center pt-4 border-top">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn rounded-pill px-5 text-white border-0"
                style={{ backgroundColor: "#f59e0b" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Saving...
                  </>
                ) : (
                  "Save Task"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
