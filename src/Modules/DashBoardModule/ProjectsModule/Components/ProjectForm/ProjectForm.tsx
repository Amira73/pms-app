import { useLocation, useNavigate } from "react-router-dom"
import styles from './ProjectForm.module.css'
import { useForm } from "react-hook-form";
import { http } from "../../../../../Services/Api/httpInstance";
import { USERS_URL } from "../../../../../Services/Api/ApisUrls";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function ProjectForm() {
  const location = useLocation();
  const { mode, projectIdd } = (location.state as any) || { mode: "add" };
  
  const [isLoadingProject, setIsLoadingProject] = useState(false);

  const isEdit = mode === "edit";
  let navigate=useNavigate()

 

  type FormValues = {
  title: string;
  description: string;
};
 const {register, formState:{errors,isSubmitting},handleSubmit,reset} = useForm<FormValues>({
    defaultValues: { title: "", description: "" },
    mode: "onTouched",
  });



useEffect(() => {
    if (!isEdit || !projectIdd) return;

    const fetchProject = async () => {
      setIsLoadingProject(true);
      try {
        const res = await http.get(USERS_URL.GetAllProjectsById(projectIdd)); 
        const p = res.data;

        reset({
          title: p.title ?? "",
          description: p.description ?? "",
        });
      } catch (e) {
        console.error("failed to load project", e);
      } finally {
        setIsLoadingProject(false);
      }
    };

    fetchProject();
  }, [isEdit, projectIdd, reset]);






const onSubmit = async (data: FormValues) => {
    try {
      if (isEdit) {
        if (!projectIdd) {
          toast.error("Missing project id");
          return;
        }

        await http.put(USERS_URL.UpdateProject(projectIdd), data); 
        toast.success("Project Updated Successfully");

        reset(data);

        navigate("/dashboard/projects-manage");
      } else {
        await http.post(USERS_URL.CreateProject, data);
        toast.success("Project Added Successfully");

        navigate("/dashboard/projects-manage");

      }
    } catch (err) {
      console.log("error", err);
      toast.error("Something went wrong");
    }
  };



//  const onSubmit = async (data: FormValues) => {
//   console.log(data);

//    try {
//         const res = await http.post(USERS_URL.CreateProject, data);
//         console.log(res)
//         toast.success("Project Added Successfuly");
//         navigate('/dashboard/projects-manage')
       
//       } catch (err) {
//         console.log("error", err);
//         toast.error("Something went wrong ");
//       }
//   reset(); 
// };
  return (
    <>
    <div className={styles["page-header"]}>
      <button
        className={styles["back-btn"]}
        onClick={() => navigate('/dashboard/projects-manage')}
      >
        ‹ View All Pages
      </button>

      <h4 className="primary-color2 small">{isEdit ? "Edit Project" : "Add A New Project"}</h4>
    </div>





    <div className="row justify-content-center m-5">
    <div className="col-12 col-md-4 col-lg-6">
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4 p-md-5">
          <form onSubmit={handleSubmit(onSubmit)}>
             <div className="mb-4">
                <label className="form-label text-muted">Title</label>
                <input
                  type="text"
                  className={`form-control rounded-4 py-3 ${errors.title ? "is-invalid" : ""}`}
                  placeholder="Name"
                  {...register("title", {
                    required: "Title is required",
                    minLength: { value: 3, message: "Min 3 characters" },
                  })}
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title.message}</div>
                )}
              </div>

           <div className="mb-4">
                <label className="form-label text-muted">Description</label>
                <textarea
                  className={`form-control rounded-4 py-3 ${errors.description ? "is-invalid" : ""}`}
                  rows={4}
                  placeholder="Description"
                  {...register("description", {
                    required: "Description is required",
                    minLength: { value: 10, message: "Min 10 characters" },
                  })}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description.message}</div>
                )}
              </div>

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
                {isSubmitting ? (isEdit ? "Updating..." : "Saving...") : (isEdit ? "Update" : "Save")}
                </button>
            </div>
          </form>
        </div>
      </div>
   </div>
   </div>
    </>
  )
}
