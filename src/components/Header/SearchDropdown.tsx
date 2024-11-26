import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import useMajor from "../../hooks/Major/useMajor";
import useJobPosition from "../../hooks/JobPosition/useJobPosition";
import useCourse from "../../hooks/Course/useCourse";
import { allCertificationData } from "../../models/certificate";
import { allMajorPaginationData } from "../../models/major";
import { allJobPaginationData } from "../../models/jobPosition";
import { allCoursePaginationData } from "../../models/course";
import useAllCertification from "../../hooks/Certification/useAllCertification";

interface SearchDropdownProps {
  onItemSelect?: () => void;
  isMobile?: boolean;
}

const SearchDropdown = ({
  onItemSelect,
  isMobile = false,
}: SearchDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { certificate } = useAllCertification();
  const { major, refetchMajors } = useMajor();
  const { job, refetchJobs } = useJobPosition();
  const { course, refetchCourses } = useCourse();

  const [filteredCertificates, setFilteredCertificates] = useState<
    allCertificationData[]
  >([]);
  const [filteredMajors, setFilteredMajors] = useState<
    allMajorPaginationData[]
  >([]);
  const [filteredJobs, setFilteredJobs] = useState<allJobPaginationData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<
    allCoursePaginationData[]
  >([]);

  useEffect(() => {
    refetchMajors();
    refetchJobs();
    refetchCourses();
  }, []);

  useEffect(() => {
    if (certificate.length > 0) {
      const filtered = certificate.filter(
        (cert) =>
          cert.certName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          cert.permission === "Approve"
      );
      setFilteredCertificates(filtered);
    }
  }, [searchTerm, certificate]);

  useEffect(() => {
    if (major.length > 0) {
      const filtered = major.filter((maj) =>
        maj.majorName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        maj.majorPermission === "Approve"
      );
      setFilteredMajors(filtered);
    }
  }, [searchTerm, major]);

  useEffect(() => {
    if (job.length > 0) {
      const filtered = job.filter((j) =>
        j.jobPositionName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        j.jobPositionPermission === "Approve"
      );
      setFilteredJobs(filtered);
    }
  }, [searchTerm, job]);

  useEffect(() => {
    if (course.length > 0) {
      const filtered = course.filter((c) =>
        c.courseName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        c.coursePermission === "Approve"
      );
      setFilteredCourses(filtered);
    }
  }, [searchTerm, course]);

  // Add click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleItemClick = (type: string, id: string) => {
    setIsOpen(false);
    setSearchTerm("");
    if (onItemSelect) {
      onItemSelect();
    }
    navigate(`/${type}/${id}`);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative w-full"
    >
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Search certifications, courses..."
          className={`w-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            isMobile
              ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-400 rounded-lg"
              : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-full"
          }`}
        />
        <SearchOutlined
          className={`absolute right-3 top-3 ${
            isMobile ? "text-gray-400" : "text-gray-500 dark:text-gray-400"
          }`}
        />
      </div>

      {isOpen && searchTerm && (
        <div
          className={`${
            isMobile
              ? "fixed left-0 right-0 top-[73px] bottom-0 bg-white dark:bg-gray-950 overflow-y-auto"
              : "absolute w-full mt-1 bg-white dark:bg-gray-900 rounded-lg shadow-lg border dark:border-gray-800 max-h-[80vh] overflow-y-auto"
          } z-50`}
        >
          {/* Certificates Section */}
          {filteredCertificates.length > 0 && (
            <div
              className={`p-3 ${
                isMobile
                  ? "border-b border-gray-200 dark:border-gray-800"
                  : "border-b dark:border-gray-800"
              }`}
            >
              <h3
                className={`text-xs font-semibold uppercase mb-2 ${
                  isMobile
                    ? "text-gray-500 dark:text-gray-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                Certificates
              </h3>
              {filteredCertificates.slice(0, 3).map((item) => (
                <div
                  key={item.certId}
                  onClick={() =>
                    handleItemClick("certificate", item.certId.toString())
                  }
                  className={`flex items-center gap-3 py-2.5 px-3 cursor-pointer rounded transition-colors ${
                    isMobile
                      ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300"
                  }`}
                >
                  <img
                    src={item.certImage}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm line-clamp-2">{item.certName}</span>
                </div>
              ))}
            </div>
          )}

          {/* Majors Section */}
          {filteredMajors.length > 0 && (
            <div
              className={`p-3 ${
                isMobile
                  ? "border-b border-gray-200 dark:border-gray-800"
                  : "border-b dark:border-gray-800"
              }`}
            >
              <h3
                className={`text-xs font-semibold uppercase mb-2 ${
                  isMobile
                    ? "text-gray-500 dark:text-gray-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                Majors
              </h3>
              {filteredMajors.slice(0, 3).map((item) => (
                <div
                  key={item.majorId}
                  onClick={() => handleItemClick("major", item.majorId)}
                  className={`flex items-center gap-3 py-2.5 px-3 cursor-pointer rounded transition-colors ${
                    isMobile
                      ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300"
                  }`}
                >
                  <img
                    src={item.majorImage}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm line-clamp-2">{item.majorName}</span>
                </div>
              ))}
            </div>
          )}

          {/* Job Positions Section */}
          {filteredJobs.length > 0 && (
            <div
              className={`p-3 ${
                isMobile
                  ? "border-b border-gray-200 dark:border-gray-800"
                  : "border-b dark:border-gray-800"
              }`}
            >
              <h3
                className={`text-xs font-semibold uppercase mb-2 ${
                  isMobile
                    ? "text-gray-500 dark:text-gray-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                Job Positions
              </h3>
              {filteredJobs.slice(0, 3).map((item) => (
                <div
                  key={item.jobPositionId}
                  onClick={() => handleItemClick("job", item.jobPositionId)}
                  className={`py-2.5 px-3 cursor-pointer rounded transition-colors ${
                    isMobile
                      ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300"
                  }`}
                >
                  <span className="text-sm line-clamp-2">
                    {item.jobPositionName}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Courses Section */}
          {filteredCourses.length > 0 && (
            <div
              className={`p-3 ${
                isMobile
                  ? "border-b border-gray-200 dark:border-gray-800"
                  : "border-b dark:border-gray-800"
              }`}
            >
              <h3
                className={`text-xs font-semibold uppercase mb-2 ${
                  isMobile
                    ? "text-gray-500 dark:text-gray-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                Courses
              </h3>
              {filteredCourses.slice(0, 3).map((item) => (
                <div
                  key={item.courseId}
                  onClick={() => handleItemClick("course", item.courseId)}
                  className={`flex items-center gap-3 py-2.5 px-3 cursor-pointer rounded transition-colors ${
                    isMobile
                      ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300"
                  }`}
                >
                  <img
                    src={item.courseImage}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm line-clamp-2">
                    {item.courseName}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!filteredCertificates.length &&
            !filteredMajors.length &&
            !filteredJobs.length &&
            !filteredCourses.length && (
              <div
                className={`p-4 text-center text-sm ${
                  isMobile
                    ? "text-gray-500 dark:text-gray-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                No results found
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
