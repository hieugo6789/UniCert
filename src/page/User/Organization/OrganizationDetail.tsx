import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useOrganizeDetail from "../../../hooks/Organization/useOrganizeDetail";
import { allOrganizationPaginationData } from "../../../models/organization";
import CustomButton from "../../../components/UI/CustomButton";
import useTotalCost from "../../../hooks/Certification/useTotalCertCost";

interface CertificateTab {
    certCode: string;
    certDescription: string;
    certId: number;
    certImage: string;
    certName: string;
    typeName: string;
}

const OrganizationDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy id từ URL
    const [organization, setOrganization] = useState<allOrganizationPaginationData | null>(null);
    const { state, getOrganizeDetails } = useOrganizeDetail();
    const [certList, setCertList] = useState<CertificateTab[]>([]);
    const [selectedCertIds, setSelectedCertIds] = useState<number[]>([]); // State quản lý chứng chỉ được chọn
    const { cost, isLoading, fetchCost } = useTotalCost();
    const [thisCost, setThisCost] = useState(0);
    const handleCertToggle = (certId: number) => {
        // không thực hiện hành động 
        setSelectedCertIds((prevSelected) =>
            prevSelected.includes(certId)
                ? prevSelected.filter((id) => id !== certId)
                : [...prevSelected, certId]
        );
    };
    useEffect(() => {
        if (selectedCertIds.length > 0) {
            fetchCost(selectedCertIds);
        }
    }, [selectedCertIds]);

    useEffect(() => {
        console.log(selectedCertIds);
        if (selectedCertIds.length === 0) {
            setThisCost(0);
        }
        else {
            setThisCost(cost);
        }
    }, [cost, selectedCertIds]);
    // Scroll lên đầu khi mở trang
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    // Gọi API để lấy chi tiết tổ chức
    useEffect(() => {
        setCertList([]);
        getOrganizeDetails(id); // Gọi hàm lấy chi tiết tổ chức với `id`
    }, [id]);

    useEffect(() => {
        if (state.currentOrganize.organizePermission === "Pending" || state.currentOrganize.organizePermission === "Reject") {
            navigate('/organization');
        }
    }, [state, navigate]);

    // Cập nhật state khi nhận dữ liệu mới từ API
    useEffect(() => {
        if (state?.currentOrganize) {
            setOrganization(state.currentOrganize);
            const approvedCerts = state.currentOrganize.certificationDetails
                ? state.currentOrganize.certificationDetails.filter(
                    (cert) => cert.permission === "Approve"
                )
                : [];
            setCertList(approvedCerts);
            console.log(certList)
        }
    }, [state]);

    // Hiệu ứng cuộn mượt mà khi xuất hiện các phần tử
    const handleIntersection = (entries: any) => {
        entries.forEach((entry: any) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
        const elements = document.querySelectorAll(".fade-in");
        elements.forEach((element) => observer.observe(element));
        return () => {
            elements.forEach((element) => observer.unobserve(element));
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            {/* Breadcrumb */}
            <nav className="px-4 py-3 text-sm md:text-base">
                <div className="max-w-7xl mx-auto flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/organization" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Organizations</Link>
                    <span>/</span>
                    <span className="text-blue-600 dark:text-blue-400">{organization?.organizeName}</span>
                </div>
            </nav>

            {/* Header Section */}
            <header className="max-w-7xl mx-auto px-4 py-12 md:py-8 text-center">
                <h1 className="fade-in text-4xl md:text-6xl lg:text-8xl font-extrabold bg-clip-text text-transparent 
                    bg-[linear-gradient(to_right,theme(colors.indigo.600),theme(colors.indigo.300),theme(colors.sky.600),theme(colors.fuchsia.600),theme(colors.sky.600),theme(colors.indigo.300),theme(colors.indigo.600))] 
                    dark:bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))]
                    bg-[length:200%_auto] animate-gradient uppercase tracking-tight">
                    {organization?.organizeName || "Organization Not Found"}
                </h1>

                <h2 className="fade-in mt-6 text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    Welcome to <span className="text-blue-600 dark:text-blue-400">{organization?.organizeName || "____"}</span>
                </h2>              
                  
                <div className="fade-in flex flex-col md:flex-row gap-6 mt-8 max-w-4xl mx-auto prose prose-lg text-gray-800 dark:prose-invert dark:text-white text-2xl">
                    {/* Address Section */}
                    <div className="flex-1 bg-gradient-to-r justify-center from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-2 rounded-xl shadow-md">
                        <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2 md:mb-0">
                            📍 Address:
                        </h3>
                        <p className="text-lg text-gray-800 dark:text-gray-300 ml-4">
                            {organization?.organizeAddress || "Address not found"}
                        </p>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-gradient-to-r justify-center from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-2 rounded-xl shadow-md">
                        <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2 md:mb-0">
                            📞 Contact:
                        </h3>
                        <p className="text-lg text-gray-800 dark:text-gray-300 ml-4">
                            <a
                            href={`https://${organization?.organizeContact}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200"
                            onClick={(e) => e.stopPropagation()}
                            >
                            {organization?.organizeContact}
                            </a>
                        </p>
                        </div>
                    </div>
                </div>

                <div className="fade-in mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                    You need to pay ${isLoading ? "Loading..." : thisCost} to obtain these certificates.
                </div>
                <p className="fade-in mt-4 text-gray-500 text-xl">
                    Please select a checkbox in the top of certification!
                </p>
            </header>            
            {/* Certificates Grid */}
            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Certificate Sections */}
                    {[
                        { type: "Foundation", title: "1. Foundation", desc: "Knowledge-based certification for foundational understanding." },
                        { type: "Associate", title: "2. Associate", desc: "Certification for those with basic skills and applied knowledge." },
                        { type: "Professional", title: "3. Professional", desc: "Certification for professionals with advanced expertise." },
                        { type: "Expert", title: "4. Expert", desc: "Certification for experts who demonstrate mastery in the field." },
                        { type: "Specialty", title: "5. Specialty", desc: "Certification focused on specialized skills in a specific area of expertise." }
                    ].map((section) => (
                        <div key={section.type} className="fade-in">
                            <div className="h-full p-6 md:p-8 bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 rounded-2xl backdrop-blur-sm 
                border border-gray-200 dark:border-gray-700 shadow-xl">
                                <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent 
                  bg-gradient-to-r from-indigo-600 via-sky-600 to-fuchsia-600
                  dark:from-indigo-400 dark:via-sky-400 dark:to-fuchsia-400">
                                    {section.title}
                                </h3>

                                <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 font-medium">
                                    {section.desc}
                                </p>

                                <div className="mt-6">
                                    {certList.filter((cert) => cert.typeName === section.type).length === 0 ? (
                                        <p className="text-gray-500 dark:text-gray-400 italic">No certificates available</p>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {certList
                                                .filter((cert) => cert.typeName === section.type)
                                                .map((cert) => (
                                                    <div key={cert.certId}
                                                        onClick={() => navigate("/certificate/" + cert.certId)}
                                                       
                                                        className="aspect-square rounded-lg overflow-hidden cursor-pointer 
                              transform hover:scale-105 transition-all duration-300">
                                                        <img
                                                            src={cert.certImage}
                                                            alt={cert.certName}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <input
                                                            type="checkbox"
                                                            className="absolute top-2 right-2 w-6 h-6 text-blue-600"
                                                            checked={selectedCertIds.includes(cert.certId)}
                                                            onChange={() => handleCertToggle(cert.certId)}
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="mt-12 text-center">
                    <CustomButton
                        shining
                        label="Explore More Certificates"
                        onClick={() => navigate("/certificate")}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 
              hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 
              text-white px-8 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300"
                    />
                </div>
            </main>
        </div>
    );
};

export default OrganizationDetail;
