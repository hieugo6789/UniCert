import CertificateCard from "../../../components/Certifications/CertificateCard";
import banner from "../../../assets/images/Certification/banner1.jpg"
import { useEffect, useState } from "react";
import { allCertificationData } from "../../../models/certificate";
import useCertificate from "../../../hooks/Certification/useCertificate";
import { Link } from "react-router-dom";
import Loading from "../../../components/UI/Loading";
import useTopCert from "../../../hooks/Certification/useTopCert";

const CertificatePage = () => {
  const { certificate: topCert } = useTopCert({ topN: 2 });

  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState(""); // Từ khóa sẽ được dùng để tìm kiếm
  const { certificate, loading, metaData, refetchCertificates } = useCertificate();
  const [certificates, setCertificates] = useState<allCertificationData[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  useEffect(() => {
    refetchCertificates(searchKeyword, currentPage, itemsPerPage, 1);
  }, [searchKeyword, currentPage]);

  // Cập nhật danh sách chứng chỉ khi có dữ liệu mới
  useEffect(() => {
    if (certificate.length > 0) {
      setCertificates(certificate);
    }
  }, [certificate]);

  // Hàm xử lý khi nhấn nút tìm kiếm
  const handleSearch = () => {
    setCurrentPage(1); // Reset về trang đầu
    setSearchKeyword(keyword); // Cập nhật từ khóa tìm kiếm
  };


  // Hàm thay đổi từ khóa
  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value); // Chỉ cập nhật keyword nhưng không gọi API
  };

  // Xử lý chuyển trang
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= metaData.totalPages) {
      setCurrentPage(page);
      window.scrollTo({
        top: 120,
        behavior: "smooth",
      });
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(); // Gọi tìm kiếm khi nhấn Enter
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section - Cải thiện */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Take your career to the next level with certificates
          </h1>
          <p className="text-center text-lg text-purple-100">
            Discover professional certifications to enhance your skills and advance your career
          </p>
        </div>
      </div>

      {/* Search Section - Cập nhật giống Major */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="relative w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for certificates..."
            className="w-full px-6 py-4 rounded-full shadow-lg border-2 border-transparent
            focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 focus:border-purple-500
            transition-all duration-300 ease-in-out transform bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            hover:shadow-xl focus:scale-[1.02]"
            onChange={changeKeyword}
            onKeyDown={handleKeyPress} // Xử lý Enter
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 
            text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300"
            onClick={handleSearch}
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

      {/* Certificates Grid - Cải thiện */}
      <div className="container mx-auto px-4 py-16">
        {certificates.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {certificates.map((cert, index) => (
                <CertificateCard key={index} {...cert} />
              ))}
            </div>

            {/* Pagination - Cải thiện */}
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex gap-2">
                {(() => {
                  const totalPages = metaData.totalPages || 0;
                  const pages: (number | string)[] = [];

                  if (totalPages <= 5) {
                    // Hiển thị tất cả các trang nếu tổng số trang <= 5
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else if (currentPage <= 3) {
                    // Hiển thị 4 trang đầu + ... + trang cuối
                    for (let i = 1; i <= 4; i++) {
                      pages.push(i);
                    }
                    pages.push('...');
                    pages.push(totalPages);
                  } else if (currentPage >= totalPages - 3) {
                    // Hiển thị trang đầu + ... + 4 trang cuối
                    pages.push(1);
                    pages.push('...');
                    for (let i = totalPages - 3; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    // Hiển thị trang đầu + ... + current-1, current, current+1 + ... + trang cuối
                    pages.push(1);
                    pages.push('...');
                    pages.push(currentPage - 1);
                    pages.push(currentPage);
                    pages.push(currentPage + 1);
                    pages.push('...');
                    pages.push(totalPages);
                  }

                  return pages.map((page, index) =>
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-4 py-2">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handlePageChange(Number(page))}
                        className={`px-4 py-2 rounded-full font-medium transition-colors duration-200
              ${currentPage === page
                            ? 'bg-purple-500 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700'
                          }`}
                      >
                        {page}
                      </button>
                    )
                  );
                })()}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === metaData.totalPages}
                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </>
        ) : (
          <div className="max-w-md mx-auto text-center py-12">
            <img
              src="https://dmf76jm51vpov.cloudfront.net/www2/images/main/2020/webpage/Course-not-Found.jpg"
              alt="No certificates found"
              className="w-full rounded-xl shadow-lg mb-6"
            />
            <p className="text-gray-600 dark:text-gray-300">
              We couldn't find any certificates. Please try a different search or{' '}
              <Link to="/" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                return to homepage
              </Link>
            </p>
          </div>
        )}
      </div>

      {/* Benefits Section - Cải thiện */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                How Certificates Can Help You
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Earning certificates can enhance your skills, increase your job prospects,
                and boost your earning potential. Whether you're looking to change careers,
                gain new expertise, or advance in your current role, these credentials provide
                valuable knowledge and can set you apart in a competitive job market.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topCert.map((cert) => (
                <CertificateCard key={cert.certId} {...cert} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Student Benefits Section - Cải thiện */}
      <div className="bg-gradient-to-b from-purple-50 dark:from-gray-900 to-white dark:to-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Why Students Should Pursue Certificates
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-full">
                  <img
                    src={banner}
                    alt="Student benefits"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12">
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Certification programs offer flexibility, allowing you to learn at your own pace
                    and balance other responsibilities. Whether you're working, studying, or managing
                    personal commitments, earning a certificate can help you stay competitive, boost
                    your skills, and advance in your career without disrupting your life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && <Loading />}
    </div>
  );
};

export default CertificatePage;
