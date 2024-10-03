import { NavLink } from "react-router-dom";
import dashboard from "../../assets/images/AdminHeader/Frame.png";
import { useState } from "react";

const AdminHeader = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);
  return (
    <div className="w-64 bg-white shadow-lg p-4">
      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2 text-purple-500 bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="ml-2 flex">
          <img
            className="mr-3"
            src={dashboard}
          />
          Dashboard
        </span>
      </NavLink>
      <div className="relative mb-2">
        <button
          onClick={toggleUserDropdown}
          className="flex items-center p-2 w-full text-left text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          {/* <img className="w-6 h-6 mr-2" src={userIcon} alt="User Icon" /> */}
          <span className="ml-2">User</span>
          <span className="ml-auto">{isUserDropdownOpen ? "▲" : "▼"}</span>
        </button>
        {isUserDropdownOpen && (
          <div className="ml-4 bg-gray-50 shadow-lg rounded-lg absolute w-full">
            <NavLink
              to="/admin/students"
              className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Students
            </NavLink>
            <NavLink
              to="/admin/decentralization"
              className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Decentralization
            </NavLink>
          </div>
        )}
      </div>
      <NavLink
        to="/admin/major"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2 text-purple-500 bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="ml-2">Majors</span>
      </NavLink>
      <NavLink
        to="/admin/jobPosition"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2 text-purple-500 bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="ml-2">Job Positions</span>
      </NavLink>
      <NavLink
        to="/admin/certificate"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2 text-purple-500 bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="ml-2">Certifications</span>
      </NavLink>
      <NavLink
        to="/admin/exam"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2 text-purple-500 bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="ml-2">Exam</span>
      </NavLink>
      <NavLink
        to="/admin/organizations"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2 text-purple-500 bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="ml-2">Organizations</span>
      </NavLink>
      <NavLink
        to="/admin/internalCourses"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2 text-purple-500 bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="ml-2">Internal Courses</span>
      </NavLink>
    </div>
  );
};

export default AdminHeader;