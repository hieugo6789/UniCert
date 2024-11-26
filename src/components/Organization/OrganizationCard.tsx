import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { allOrganizationPaginationData } from "../../models/organization";

interface OrganizationCardProps {
    organization: allOrganizationPaginationData;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({ organization }) => {
    const navigate = useNavigate();
    const [showAllCerts, setShowAllCerts] = useState(false); // Quản lý trạng thái hiển thị

    const MAX_CERTS = 3; // Số chứng nhận tối đa hiển thị ban đầu

    return (
        <div
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md rounded-xl p-6 text-left 
            hover:shadow-lg cursor-pointer duration-300 ease-in-out hover:scale-[1.02]"
            onClick={() => navigate("/organization/" + organization.organizeId)}
        >
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 line-clamp-1">
                        {organization.organizeName}
                    </h2>
                    <span className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full">
                        {organization.organizeId}
                    </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400">
                    Address: {organization.organizeAddress || "Not available"}
                </p>

                {organization.organizeContact ? (
                    <p className="text-gray-600 dark:text-gray-400">
                        Contact:{" "}
                        <a
                            href={`https://${organization.organizeContact}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200"
                            onClick={(e) => e.stopPropagation()} // Ngăn sự kiện cha nếu nhấn vào link
                        >
                            {organization.organizeContact}
                        </a>
                    </p>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">Contact: Not available</p>
                )}

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Certifications:</span>
                    {!organization.certificationDetails?.length ? (
                        <span className="text-gray-500 dark:text-gray-400 italic">No certifications</span>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {(showAllCerts
                                ? organization.certificationDetails
                                : organization.certificationDetails.slice(0, MAX_CERTS)
                            ).map((cert) => (
                                <span
                                    key={cert.certId}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate("/certificate/" + cert.certId);
                                    }}
                                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full
                                    hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-600 dark:hover:text-blue-300 cursor-pointer"
                                >
                                    {cert.certName}
                                </span>
                            ))}
                            {organization.certificationDetails.length > MAX_CERTS && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowAllCerts(!showAllCerts);
                                    }}
                                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-300 rounded-full
                                    hover:bg-blue-200 dark:hover:bg-blue-900/50 cursor-pointer"
                                >
                                    {showAllCerts ? "Show less" : "...more"}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrganizationCard;
