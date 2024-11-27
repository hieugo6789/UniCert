import { Link, useNavigate, useParams } from "react-router-dom";
import { allJobPaginationData } from "../../../models/jobPosition";
import { useEffect, useState } from "react";
import useJobDetail from "../../../hooks/JobPosition/useJobDetail";
import CustomButton from "../../../components/UI/CustomButton";
import useTotalCost from "../../../hooks/Certification/useTotalCertCost";
import useOrganization from "../../../hooks/Organization/useOrganization";

interface certTab {
  certCode: string;
  certDescription: string;
  certId: number;
  certImage: string;
  certName: string;
  typeName: string;
}

const JobDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState<allJobPaginationData | null>(null);
  const { state, getJobDetails, jobDetailByOrganize } = useJobDetail();
  const [certList, setCertList] = useState<certTab[]>([]);
  const [selectedCertIds, setSelectedCertIds] = useState<number[]>([]); // State quản lý chứng chỉ được chọn
  const { cost, isLoading, fetchCost } = useTotalCost(); // Lấy tổng chi phí từ hook
  const { organization, loading: orgLoading } = useOrganization(); // Lấy danh sách Organization
  const [selectedOrganization, setSelectedOrganization] = useState<number | undefined>(undefined);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setCertList([]);
    getJobDetails(id);
  }, [id]);

  // useEffect(() => {
  //   if (state?.currentJob) {
  //     setJobDetail(state.currentJob);
  //     const approvedJobCerts = state.currentJob.certificationDetails
  //       ? state.currentJob.certificationDetails.filter((cert) => cert.permission === "Approve")
  //       : [];
  //     setCertList(approvedJobCerts);
  //   }
  // }, [state]);
  useEffect(() => {
    if (state?.currentJob) {
      setJobDetail(state.currentJob);
      // console.log("Current Job Details:", state.currentJob);
      // const approvedJobCerts = state.currentJob.certificationDetails ?? [];
      // console.log("Approved Certifications:", approvedJobCerts);

      // setCertList(approvedJobCerts);
    }
  }, [state]);

  useEffect(() => {
    // if (jobDetail) {
    //   console.log("Updated Job Detail:", jobDetail);
    //   console.log("Updated Certification Details:", jobDetail[0]?.certificationDetails);
    // }
    // if(jobDetail?.certificationDetails) {
    //   setCertList(jobDetailItem.certificationDetails ?? []);
    //   console.log("Updated Job Detail:", jobDetail);
    //   // setCertList(jobDetail.certificationDetails ?? []);
    // }
    setCertList(jobDetail?.certificationDetails ?? []);
    if (certList.length <= 0) {
      const jobDetailItem = jobDetail as any; // ép kiểu tạm thời nếu chắc chắn về cấu trúc dữ liệu
      console.log("Updated Certification Details:", jobDetailItem?.[0]?.certificationDetails);
      setCertList(jobDetailItem?.[0]?.certificationDetails ?? []);
    }
  }
    , [jobDetail]);


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
  useEffect(() => {
    // setCertList([]); // <== Không cần set về mảng rỗng mỗi khi component load
    if (selectedOrganization) {
      jobDetailByOrganize(Number(id), selectedOrganization); // Gọi hàm lấy JobDetail theo tổ chức
    } else {
      getJobDetails(id);
    }
  }, [id, selectedOrganization]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Breadcrumb */}
      <nav className="px-4 py-3 text-sm md:text-base">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-gray-600 dark:text-gray-300">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/job" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Job Position</Link>
          <span>/</span>
          <span className="text-blue-600 dark:text-blue-400">{jobDetail?.jobPositionName}</span>
        </div>
      </nav>

      {/* Header Section */}
      <header className="max-w-7xl mx-auto px-4 py-12 md:py-8 text-center">
        <h1 className="fade-in text-4xl md:text-6xl lg:text-8xl font-extrabold bg-clip-text text-transparent 
          bg-[linear-gradient(to_right,theme(colors.indigo.600),theme(colors.indigo.300),theme(colors.sky.600),theme(colors.fuchsia.600),theme(colors.sky.600),theme(colors.indigo.300),theme(colors.indigo.600))] 
          dark:bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))]
          bg-[length:200%_auto] animate-gradient uppercase tracking-tight">
          {jobDetail?.jobPositionName || "Position Not Found"}
        </h1>

        <h2 className="fade-in mt-6 text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
          What's <span className="text-blue-600 dark:text-blue-400">{jobDetail?.jobPositionName || "____"}</span>
        </h2>

        <div className="fade-in mt-8 max-w-4xl mx-auto prose prose-lg text-gray-800 dark:prose-invert dark:text-white text-2xl">
          <div dangerouslySetInnerHTML={{
            __html: jobDetail?.jobPositionDescription || ""
          }} />
        </div>
        <div className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
          You will pay ${isLoading ? "Loading..." : cost} if you don't choose our!
        </div>
        <p className="mt-4 text-gray-500 text-xl">Please select checkbox in the top of certtification!</p>
        <div className="mt-6">
          <label htmlFor="organization-select" className="text-xl font-medium text-gray-700 dark:text-gray-300">
            Select Organization:
          </label>
          <select
            id="organization-select"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 dark:bg-gray-700 dark:text-white"
            value={selectedOrganization}
            onChange={(e) => setSelectedOrganization(Number(e.target.value))}
            disabled={orgLoading}
          >
            <option value="">-- Select Organization --</option>
            {organization.map((org) => (
              <option key={org.organizeId} value={org.organizeId}>
                {org.organizeName}
              </option>
            ))}
          </select>
        </div>
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

export default JobDetail;
