import { useEffect, useState } from "react";
import MajorCard from "../../../components/Majors/MajorCard";
import { allMajorPaginationData } from "../../../models/major";
import useMajor from "../../../hooks/Major/useMajor";
import CertificateCard from "../../../components/Certifications/CertificateCard";
import Loading from "../../../components/UI/Loading";
import useTopCert from "../../../hooks/Certification/useTopCert";

const Majors = () => {
  const { certificate } = useTopCert({ topN: 4 });

  const { major, refetchMajors, loading } = useMajor();
  const [majors, setMajors] = useState<allMajorPaginationData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const majorsPerPage = 4;
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    refetchMajors();
  }, []);

  useEffect(() => {
    const approvedMajors = major.filter((m) => m.majorPermission === "Approve");
    setMajors(approvedMajors);
  }, [major]);

  useEffect(() => {
    const filteredMajors = major.filter(m => 
      m.majorName.toLowerCase().includes(keyword.toLowerCase()) && 
      m.majorPermission === "Approve"
    );
    setMajors(filteredMajors);    
  }, [keyword, major]);

  const maxPage = Math.ceil(majors.length / majorsPerPage);

  const handleNextPage = () => {
    if (currentPage < maxPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const displayedMajors = majors.slice(currentPage * majorsPerPage, (currentPage + 1) * majorsPerPage);

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-800 dark:to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Obtain certification through your major
          </h1>
          <p className="text-lg text-purple-100">
            Explore certifications that align with your major and boost your career potential
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="relative w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for majors..."
            className="w-full px-6 py-4 rounded-full shadow-lg border-2 border-transparent
            focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 focus:border-purple-500 dark:focus:border-purple-700
            transition-all duration-300 ease-in-out transform
            hover:shadow-xl focus:scale-[1.02]
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            onChange={changeKeyword}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 
            text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300"            
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 transform hover:scale-110 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Majors Grid Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Pick your major
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose from our wide range of majors and discover the perfect certification path for your career goals
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            onClick={handlePrevPage}
            className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-purple-50 dark:hover:bg-purple-900/50 
            disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 group"
            disabled={currentPage === 0}
          >
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayedMajors.map((major) => (
              <MajorCard key={major.majorId} {...major} />
            ))}
          </div>

          <button
            onClick={handleNextPage}
            className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-purple-50 dark:hover:bg-purple-900/50 
            disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 group"
            disabled={currentPage === maxPage - 1}
          >
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination Info */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full font-medium">
            Page {currentPage + 1}
          </span>
          <span className="text-gray-500 dark:text-gray-400">of</span>
          <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full font-medium">
            {maxPage}
          </span>
        </div>
      </div>

      {/* Best Certifications Section */}
      <div className="bg-white dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Featured Certifications
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our top-rated certifications chosen by industry experts
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certificate.map((cert) => (
              <CertificateCard {...cert} key={cert.certId} />
            ))}
          </div>
        </div>
      </div>

      {loading && <Loading />}
    </div>
  );
};

export default Majors;
