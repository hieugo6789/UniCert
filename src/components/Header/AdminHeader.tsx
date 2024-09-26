import { NavLink } from "react-router-dom";

const AdminHeader = () => {
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
        <span className="ml-2">Dashboard</span>
      </NavLink>
      <NavLink
        to="/admin/students"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2 text-purple-500 bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="ml-2">Students</span>
      </NavLink>
      <NavLink
        to="/admin/decentralization"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2 text-purple-500 bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="ml-2">Decentralization</span>
      </NavLink>
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
    </div>
  );
};

export default AdminHeader;
