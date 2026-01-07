import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex vh-100 overflow-hidden">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>

        <div className="d-flex flex-column flex-grow-1 overflow-hidden bg-outlet">
          <NavBar />

          <div className="flex-grow-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>

      
    </>
  );
}
