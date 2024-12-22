import { NavLink } from "react-router-dom";
import { GrOrganization } from "react-icons/gr";
import { TbCertificate } from "react-icons/tb";
import { FaGraduationCap } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { GiTeacher } from "react-icons/gi";
import { PiExamBold } from "react-icons/pi";
import UniCertLogo from "../../assets/images/UniCertLogo.png";
import { BiSolidDiscount } from "react-icons/bi";
const MenuManager = () => {
  return (
    <div className=" w-full bg-white p-6 rounded-lg shadow-lg sticky top-0 h-screen">
      <div className="flex justify-center pb-6 border-b mb-4">
        <img
          src={UniCertLogo}
          alt="logo"
          className="w-40"
        />
      </div>

      <NavLink
        to="/manager/certificate"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2  bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-800 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="pl-1 flex items-center">
          <span>
            <TbCertificate className="mr-2 size-5" />
          </span>
          Certifications
        </span>
      </NavLink>

      <NavLink
        to="/manager/major"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2 bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-800 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="pl-2 flex items-center">
          <span>
            <FaGraduationCap className="mr-3" />
          </span>
          Majors
        </span>
      </NavLink>

      <NavLink
        to="/manager/jobPosition"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2  bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-800 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="pl-2 flex items-center">
          <span>
            <GrWorkshop className="mr-2.5" />
          </span>
          Job Positions
        </span>
      </NavLink>

      <NavLink
        to="/manager/organizations"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2  bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-800 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="pl-2 flex items-center">
          <span>
            <GrOrganization className="mr-3" />
          </span>
          <span>Organizations</span>
        </span>
      </NavLink>

      <NavLink
        to="/manager/internalCourses"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2 bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-800 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="pl-2 flex items-center">
          <span>
            <GiTeacher className="mr-3" />
          </span>
          Internal Courses
        </span>
      </NavLink>
      <NavLink
        to="/manager/simulationExam"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2 bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-800 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="pl-2 flex items-center">
          <span>
            <PiExamBold className="mr-3" />
          </span>
          Simulation Exam
        </span>
      </NavLink>
      <NavLink
        to="/manager/voucher"
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 mb-2 bg-purple-200 rounded-lg"
            : "flex items-center p-2 mb-2 text-gray-800 hover:bg-gray-100 rounded-lg"
        }
      >
        <span className="pl-2 flex items-center">
          <span>
            <BiSolidDiscount className="mr-3" />
          </span>
          Vouchers
        </span>
      </NavLink>
    </div>
  );
};

export default MenuManager;
