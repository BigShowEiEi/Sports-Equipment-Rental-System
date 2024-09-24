import { Link, useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import Swal from "sweetalert2";

const linkHome = "http://localhost:5173/home";
const linkHome2 = "http://localhost:5173/orders";
const linkHome3 = "http://localhost:5173/history";

function Sidebar() {
  const navigate = useNavigate();


  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        navigate("/login");
        window.location.reload();
      }
    });
  };
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r lg:translate-x-0 bg-gray-800 border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col px-3 pb-4 overflow-y-auto bg-gray-800">
        <ul className="space-y-2 font-medium flex-1">
          <li>
            <a
              href={linkHome}
              className="flex items-center py-2 px-1.5 rounded-lg text-white  hover:bg-gray-700 group"
            >
              <svg
                className="flex-shrink-0 w-6 h-6  transition duration-75 text-gray-400  group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ms-3">Home</span>
            </a>
          </li>
          <SideMenu
            name="Orders"
            urlMenu={linkHome2}
            path="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
          />
          <SideMenu
            name="History"
            urlMenu={linkHome3}
            path="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"
          />
        </ul>
        <ul className="font-medium">
          <li>
            <div
              className="flex items-center py-2 px-1.5 rounded-lg text-white  hover:bg-gray-700 group cursor-pointer"
              onClick={handleLogout}
            >
              <svg
                className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400  group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Sign out</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
