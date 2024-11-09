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

interface SearchDropdownProps {
  onItemSelect?: () => void;
}

const SearchDropdown = ({ onItemSelect }: SearchDropdownProps) => {
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

  // Add click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleItemClick = (type: string, id: string) => {
    setIsOpen(false);
    setSearchTerm('');
    if (onItemSelect) {
      onItemSelect();
    }
    navigate(`/${type}/${id}`);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Search certifications, courses..."
          className="w-full bg-gray-200 text-black rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        />
        <SearchOutlined className="absolute right-3 top-3 text-gray-500" />
      </div>

      {isOpen && searchTerm && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border z-50 max-h-[60vh] overflow-y-auto">
          {/* Certificates Section */}
          {filteredCertificates.length > 0 && (
            <div className="p-3 border-b">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Certificates</h3>
              {filteredCertificates.slice(0, 3).map((item) => (
                <div
                  key={item.certId}
                  onClick={() => handleItemClick('certificate', item.certId.toString())}
                  className="flex items-center gap-3 py-2.5 px-3 hover:bg-gray-100 cursor-pointer rounded transition-colors"
                >
                  <img src={item.certImage} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <span className="text-sm line-clamp-2">{item.certName}</span>
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
                  className="flex items-center gap-3 py-2.5 px-3 hover:bg-gray-100 cursor-pointer rounded transition-colors"
                >
                  <img src={item.majorImage} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <span className="text-sm line-clamp-2">{item.majorName}</span>
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
                  className="py-2.5 px-3 hover:bg-gray-100 cursor-pointer rounded transition-colors"
                >
                  <span className="text-sm line-clamp-2">{item.jobPositionName}</span>
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
                  className="flex items-center gap-3 py-2.5 px-3 hover:bg-gray-100 cursor-pointer rounded transition-colors"
                >
                  <img src={item.courseImage} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <span className="text-sm line-clamp-2">{item.courseName}</span>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!filteredCertificates.length && !filteredMajors.length && 
           !filteredJobs.length && !filteredCourses.length && (
            <div className="p-4 text-center text-gray-500 text-sm">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown; 