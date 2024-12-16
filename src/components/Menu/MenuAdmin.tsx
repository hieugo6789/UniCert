import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import downArrow from "../../assets/icons/downoutlined-16.png";
import upArrow from "../../assets/icons/upoutlined-16.png";
import { DashboardOutlined } from "@ant-design/icons";
import { FiUsers } from "react-icons/fi";
import transactionIcon from "../../assets/icons/hitoryTransaction.png";

import UniCertLogo from "../../assets/images/UniCertLogo.png";
import { RiFeedbackFill } from "react-icons/ri";
const MenuAdmin = () => {
  const location = useLocation();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);
  useEffect(() => {
    const currentPath = location.pathname;
    if (
      currentPath === "/admin/students" ||
      currentPath === "/admin/decentralization"
    ) {
      setIsUserDropdownOpen(true);
    }
  }, [location.pathname]);

  return (
    <div className=" w-full bg-white p-6 rounded-lg shadow-lg h-screen sticky top-0">
      <div className="flex justify-center pb-6 border-b mb-4">
        <img
          src={UniCertLogo}
          alt="logo"
          className="w-40"
        />
      </div>
      <NavLink
        to="/admin/dashboard"
        className={
          ({ isActive }) =>
            isActive
              ? "flex items-center p-2 mb-2  bg-purple-200 rounded-lg" // active state
              : "flex items-center p-2 mb-2 text-gray-800 hover:bg-gray-100 rounded-lg" // default state
        }
      >
        <span className="pl-2 flex items-center">
          <span>
            <DashboardOutlined className="size-3.5 mr-3" />
          </span>
          <span>Dashboard</span>
        </span>
      </NavLink>

      {/* User Dropdown */}
      <div className="mb-2">
        <button
          onClick={toggleUserDropdown}
          className="flex items-center p-2 w-full text-left text-gray-800 hover:bg-gray-100 rounded-lg"
        >
          <span className="ml-2 flex items-center">
            <FiUsers className="size-3.5 mr-3 mb-1" />
            User
          </span>
          <span className="ml-auto">
            {isUserDropdownOpen ? (
              <div>
                <img
                  src={upArrow}
                  alt="Collapse"
                />
              </div>
            ) : (
              <div>
                <img
                  src={downArrow}
                  alt="Expand"
                />
              </div>
            )}
          </span>
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isUserDropdownOpen ? "max-h-40" : "max-h-0"
          }`}
        >
          <NavLink
            to="/admin/students"
            className={({ isActive }) =>
              isActive
                ? "block p-2  bg-purple-200 hover:bg-purple-100 rounded-lg pl-6"
                : "block p-2 text-gray-800 hover:bg-gray-100 rounded-lg pl-6"
            }
          >
            Students
          </NavLink>
          <NavLink
            to="/admin/decentralization"
            className={({ isActive }) =>
              isActive
                ? "block p-2  bg-purple-200 hover:bg-purple-100 rounded-lg pl-6"
                : "block p-2 text-gray-800 hover:bg-gray-100 rounded-lg pl-6"
            }
          >
            Employees
          </NavLink>
        </div>
      </div>
      <NavLink
        to="/admin/feedback"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2 bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-800 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="pl-2 flex items-center">
          <span>
            <RiFeedbackFill className="mr-3" />{" "}
          </span>
          Feedback
        </span>
      </NavLink>
      <NavLink
        to="/admin/transaction"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2 bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-800 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="pl-2 flex items-center">
          <span>
            <img
              src={transactionIcon}
              alt="transaction"
              className="size-4 mr-2"
            />
          </span>
          Transaction
        </span>
      </NavLink>
    </div>
  );
};

export default MenuAdmin;
