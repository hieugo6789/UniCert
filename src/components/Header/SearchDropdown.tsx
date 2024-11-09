import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import useMajor from '../../hooks/Major/useMajor';
import useCertificate from '../../hooks/Certification/useCertificate';
import useJobPosition from '../../hooks/JobPosition/useJobPosition';
import useCourse from '../../hooks/Course/useCourse';
import { allCertificationData } from '../../models/certificate';
import { allMajorPaginationData } from '../../models/major';
import { allJobPaginationData } from '../../models/jobPosition';
import { allCoursePaginationData } from '../../models/course';

const SearchDropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { certificate, refetchCertificates } = useCertificate();
  const { major, refetchMajors } = useMajor();
  const { job, refetchJobs } = useJobPosition();
  const { course, refetchCourses } = useCourse();

  const [filteredCertificates, setFilteredCertificates] = useState<allCertificationData[]>([]);
  const [filteredMajors, setFilteredMajors] = useState<allMajorPaginationData[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<allJobPaginationData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<allCoursePaginationData[]>([]);

  useEffect(() => {
    refetchCertificates();
    refetchMajors();
    refetchJobs();
    refetchCourses();
  }, []);

  useEffect(() => {
    if (certificate.length > 0) {
      const filtered = certificate.filter(cert => 
        cert.certName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        cert.permission === "Approve"
      );
      setFilteredCertificates(filtered);
    }
  }, [searchTerm, certificate]);

  useEffect(() => {
    if (major.length > 0) {
      const filtered = major.filter(maj => 
        maj.majorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMajors(filtered);
    }
  }, [searchTerm, major]);

  useEffect(() => {
    if (job.length > 0) {
      const filtered = job.filter(j => 
        j.jobPositionName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [searchTerm, job]);

  useEffect(() => {
    if (course.length > 0) {
      const filtered = course.filter(c => 
        c.courseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchTerm, course]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleItemClick = (type: string, id: string) => {
    setIsOpen(false);
    setSearchTerm('');
    navigate(`/${type}/${id}`);
  };

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Search courses, certifications..."
          className="bg-gray-200 text-black w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <SearchOutlined className="absolute right-3 top-2.5 text-gray-500" />
      </div>

      {isOpen && searchTerm && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border z-50 max-h-[80vh] overflow-y-auto">
          {/* Certificates Section */}
          {filteredCertificates.length > 0 && (
            <div className="p-3 border-b">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Certificates</h3>
              {filteredCertificates.slice(0, 3).map((item) => (
                <div
                  key={item.certId}
                  onClick={() => handleItemClick('certificate', item.certId.toString())}
                  className="flex items-center gap-3 py-2 px-3 hover:bg-gray-100 cursor-pointer rounded"
                >
                  <img src={item.certImage} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <span>{item.certName}</span>
                </div>
              ))}
            </div>
          )}

          {/* Majors Section */}
          {filteredMajors.length > 0 && (
            <div className="p-3 border-b">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Majors</h3>
              {filteredMajors.slice(0, 3).map((item) => (
                <div
                  key={item.majorId}
                  onClick={() => handleItemClick('major', item.majorId)}
                  className="flex items-center gap-3 py-2 px-3 hover:bg-gray-100 cursor-pointer rounded"
                >
                  <img src={item.majorImage} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <span>{item.majorName}</span>
                </div>
              ))}
            </div>
          )}

          {/* Job Positions Section */}
          {filteredJobs.length > 0 && (
            <div className="p-3 border-b">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Job Positions</h3>
              {filteredJobs.slice(0, 3).map((item) => (
                <div
                  key={item.jobPositionId}
                  onClick={() => handleItemClick('job', item.jobPositionId)}
                  className="py-2 px-3 hover:bg-gray-100 cursor-pointer rounded"
                >
                  {item.jobPositionName}
                </div>
              ))}
            </div>
          )}          

          {/* Courses Section */}
          {filteredCourses.length > 0 && (
            <div className="p-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Courses</h3>
              {filteredCourses.slice(0, 3).map((item) => (
                <div
                  key={item.courseId}
                  onClick={() => handleItemClick('course', item.courseId)}
                  className="flex items-center gap-3 py-2 px-3 hover:bg-gray-100 cursor-pointer rounded"
                >
                  <img src={item.courseImage} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <span>{item.courseName}</span>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!filteredCertificates.length && !filteredMajors.length && 
           !filteredJobs.length && !filteredCourses.length && (
            <div className="p-4 text-center text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown; 