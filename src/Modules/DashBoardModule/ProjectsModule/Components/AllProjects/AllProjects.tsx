import { useEffect,  useState } from "react";
import { getManagerProjectsFun } from "./getManagerProjects";
import Header from "../../../../../SharedComponents/Components/Header/Header";
import NoData from "../../../../../SharedComponents/Components/NoData/NoData";
import SearchBox from "./SearchBox";


export default function AllProjects() {
const [search, setSearch] = useState("");

type Project = {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  status?:string
    task: Task[];
 
};

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
};
  const[projects ,setProectsList]=useState<Project[]>([]);



 useEffect(() => {
  async function load() {
    const res = await getManagerProjectsFun({
      pageSize: 10,
      pageNumber: 1,
      title: search,
    });

    setProectsList(res?.data ?? []);
  }

  load();
}, [search]);
  return (
   <>
<Header btn_text="Add New Project" title="Projects"/>

 <SearchBox onSearch={setSearch} debounceMs={400} />




           <div className=" table-responsive mx-4">
      <table className="table table-striped ">
  <thead className='' >
    <tr className='table-header-row    primary-color-bg2'>
     
      
              <th>Title</th>
              
                    <th>Status</th>
                        <th>Num Users</th>
                            <th>Num Taska</th>
              <th>Data Created</th>
               <th></th>
             
    </tr>
  </thead>
  <tbody>
   { projects.length > 0 ? projects.map((project, idx)=>  
       <tr key={ project.id || idx}>
      
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
        <button className="dropdown-item primary-color2" onClick={() => console.log("View")}>
          <i className="fa-regular fa-eye me-2"></i> View
        </button>
      </li>
      <li>
        <button className="dropdown-item primary-color2" onClick={() => console.log("View")}>
          <i className="fa-regular fa-pen-to-square me-2"></i> Edit
        </button>
      </li>
     
      <li>
        <button className="dropdown-item primary-colo2r"  onClick={() => console.log("View")}>
          <i className="fa-regular fa-trash-can me-2"></i> Delete
        </button>
      </li>
    </ul>
  </div>
      </td>
    </tr>):<NoData/>}
  
    
  </tbody>
</table>
</div>



   </>
  )
}
