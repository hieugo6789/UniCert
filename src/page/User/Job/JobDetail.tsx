import { Link, useNavigate, useParams } from "react-router-dom";
import { allJobPaginationData } from "../../../models/jobPosition";
import { useEffect, useState } from "react";
import useJobDetail from "../../../hooks/JobPosition/useJobDetail";
import CustomButton from "../../../components/UI/CustomButton";

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
  const { state, getJobDetails } = useJobDetail();
  const [certList, setCertList] = useState<certTab[]>([]);

  useEffect(() => {    
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setCertList([]);
    getJobDetails(id);
  }, [id]);

  useEffect(() => {    
    if (state?.currentJob) {
      setJobDetail(state.currentJob);
      const approvedJobCerts = state.currentJob.certificationDetails
        ? state.currentJob.certificationDetails.filter(
            (cert) => cert.permission === "Approve"
          )
        : [];
      setCertList(approvedJobCerts);
    }
  }, [state]);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Breadcrumb */}
      <nav className="px-4 py-3 text-sm md:text-base">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-gray-300">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/job" className="hover:text-blue-400 transition-colors">Job Position</Link>
          <span>/</span>
          <span className="text-blue-400">{jobDetail?.jobPositionName}</span>
        </div>
      </nav>
      
      {/* Header Section */}
      <header className="max-w-7xl mx-auto px-4 py-12 md:py-8 text-center">
        <h1 className="fade-in text-4xl md:text-6xl lg:text-8xl font-extrabold bg-clip-text text-transparent 
          bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] 
          bg-[length:200%_auto] animate-gradient uppercase tracking-tight">
          {jobDetail?.jobPositionName || "Position Not Found"}
        </h1>
        
        <h2 className="fade-in mt-6 text-3xl md:text-5xl font-bold text-white">
          What's <span className="text-blue-400">{jobDetail?.jobPositionName || "____"}</span>
        </h2>
          
        <div className="fade-in mt-8 max-w-4xl mx-auto prose prose-lg prose-invert text-white text-2xl">
          <div dangerouslySetInnerHTML={{
            __html: jobDetail?.jobPositionDescription || ""
          }} />
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
              <div className="h-full p-6 md:p-8 bg-gray-800 bg-opacity-50 rounded-2xl backdrop-blur-sm 
                border border-gray-700 shadow-xl">
                <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent 
                  bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400">
                  {section.title}
                </h3>
                
                <p className="mt-3 text-lg text-gray-300 font-medium">
                  {section.desc}
                </p>

                <div className="mt-6">
                  {certList.filter((cert) => cert.typeName === section.type).length === 0 ? (
                    <p className="text-gray-400 italic">No certificates available</p>
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
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 
              hover:to-purple-600 text-white px-8 py-3 rounded-xl font-semibold 
              transform hover:scale-105 transition-all duration-300"
          />
        </div>
      </main>
    </div>
  );
};

export default JobDetail;
