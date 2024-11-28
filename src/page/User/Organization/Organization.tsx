import { useEffect, useState } from "react";
import useOrganization from "../../../hooks/Organization/useOrganization";
import Loading from "../../../components/UI/Loading";
import OrganizationCard from "../../../components/Organization/OrganizationCard"; // Assuming you have a component for displaying organizations
import { allOrganizationPaginationData } from "../../../models/organization";
import useTopCert from "../../../hooks/Certification/useTopCert";
import CertificateCard from "../../../components/Certifications/CertificateCard";

const Organization = () => {
    const { certificate } = useTopCert({ topN: 2 });
    const { organization, loading, refetchOrganizations } = useOrganization();
    const [organizations, setOrganizations] = useState<allOrganizationPaginationData[]>([]);
    const [filteredOrganizations, setFilteredOrganizations] = useState<allOrganizationPaginationData[]>([]); // Lưu danh sách đã lọc
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5); // Số phần tử trên mỗi trang    
    
    useEffect(() => {
        refetchOrganizations(); // Fetch initial jobs
    }, []);

    useEffect(() => {
        setOrganizations(organization);
        setFilteredOrganizations(organization);
    }, [organization]);

    useEffect(() => {
        const keyword = searchKeyword.toLowerCase();
        const filtered = organizations.filter((org) =>
            org.organizeName.toLowerCase().includes(keyword) ||
            org.organizeAddress?.toLowerCase().includes(keyword) ||
            org.organizeContact?.toLowerCase().includes(keyword)
        );
        setFilteredOrganizations(filtered);
        setCurrentPage(1); // Reset trang về đầu khi tìm kiếm
    }, [searchKeyword, organizations]);

    // Tính toán danh sách cần hiển thị dựa trên trang hiện tại
    const paginatedOrganizations = filteredOrganizations.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Thay đổi trang
    const handlePaginationChange = (page: number) => {
        setCurrentPage(page);
    };

    // Xử lý thay đổi từ khóa tìm kiếm
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 dark:from-purple-700 dark:to-purple-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Explore Organizations
                    </h1>
                    <p className="text-lg text-purple-100">
                        Discover organizations that match your interests
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-4 -mt-8">
                <div className="relative w-full max-w-2xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search for organizations..."
                        className="w-full px-6 py-4 rounded-full shadow-lg border-2 border-transparent
                        focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 
                        focus:border-purple-500 dark:focus:border-purple-700
                        transition-all duration-300 ease-in-out transform
                        hover:shadow-xl focus:scale-[1.02]
                        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        onChange={handleSearchChange}
                        value={searchKeyword}
                    />
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 
                        text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 
                        transition-colors duration-300"
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
            {/* Content Section */}

            <div className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Available Organizations</h2>
                <div className="flex flex-col lg:flex-row gap-8">


                    <div className="space-y-6 lg:w-4/5">
                        {paginatedOrganizations.length > 0 ? (
                            paginatedOrganizations.map((org) => (
                                <OrganizationCard organization={org} key={org.organizeId} />
                            ))
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400 italic">No organizations found</p>
                        )}

                        {/* Pagination */}
                        <div className="mt-12 flex flex-col items-center space-y-4">
                            {/* Pagination Info */}
                            <div className="text-gray-600 dark:text-gray-300">
                                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                                {Math.min(currentPage * pageSize, filteredOrganizations.length)} of{" "}
                                {filteredOrganizations.length} organizations
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex items-center space-x-2">
                                {/* Previous Page Button */}
                                <button
                                    onClick={() => handlePaginationChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-lg 
                                bg-gradient-to-r from-purple-600/30 to-indigo-600/30
                                backdrop-blur-sm
                                border-2 border-purple-500/30 dark:border-purple-400/30
                                hover:border-purple-500 dark:hover:border-purple-400
                                disabled:opacity-50 disabled:cursor-not-allowed
                                hover:scale-105 transition-all duration-300
                                shadow-lg dark:shadow-purple-900/30"
                                >
                                    Previous
                                </button>

                                {/* Page Numbers */}
                                <div className="flex space-x-2">
                                    {[...Array(Math.ceil(filteredOrganizations.length / pageSize))].map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePaginationChange(index + 1)}
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center
                                        transition-all duration-300
                                        ${currentPage === index + 1
                                                    ? "bg-purple-600 text-white"
                                                    : "bg-gradient-to-r from-purple-600/30 to-indigo-600/30"
                                                }
                                        backdrop-blur-sm
                                        border-2 border-purple-500/30 dark:border-purple-400/30
                                        hover:border-purple-500 dark:hover:border-purple-400
                                        hover:scale-105
                                        shadow-lg dark:shadow-purple-900/30`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>

                                {/* Next Page Button */}
                                <button
                                    onClick={() => handlePaginationChange(currentPage + 1)}
                                    disabled={currentPage === Math.ceil(filteredOrganizations.length / pageSize)}
                                    className="px-4 py-2 rounded-lg
                                bg-gradient-to-r from-purple-600/30 to-indigo-600/30
                                backdrop-blur-sm
                                border-2 border-purple-500/30 dark:border-purple-400/30
                                hover:border-purple-500 dark:hover:border-purple-400
                                disabled:opacity-50 disabled:cursor-not-allowed
                                hover:scale-105 transition-all duration-300
                                shadow-lg dark:shadow-purple-900/30"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="lg:w-1/5">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Top Certificates</h2>
                        <div className="space-y-4">
                            {certificate.map((cert) => (
                                <CertificateCard {...cert} key={cert.certId} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loading />}
        </div>
    );
};

export default Organization;
