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
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Cuộn mượt mà
      });
    };
    scrollToTop();
  });

  useEffect(() => {
    setCertList([]);
    getJobDetails(id);
  }, [id]);

  useEffect(() => {
    if (state) {
      setJobDetail(state?.currentJob);
      setCertList(state?.currentJob?.certificationDetails);
    }
  }, [state]);

  // Observer for fade-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  const renderCertifications = (certTypeName: string, title: string, description: string) => (
    <div className="p-5 fade-in bg-gray-700 bg-opacity-30 rounded-lg shadow-lg">
      <h1 className="uppercase text-2xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
        {title}
      </h1>
      <p className="text-white text-xl mb-4 font-bold">{description}</p>
      {certList && certList.filter((cert) => cert.typeName === certTypeName).length === 0 ? (
        <p className="text-xl text-white">Not found any certificate</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {certList
            .filter((cert) => cert.typeName === certTypeName)
            .map((cert) => (
              <div key={cert.certId} className="w-32 h-32">
                <img
                  src={cert.certImage}
                  alt={cert.certName}
                  className="hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => navigate("/certificate/" + cert.certId)}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-900">
      <p className="fade-in ml-2 pt-2 font-bold cursor-pointer text-blue-800">
        <Link to="/">Home </Link>
        {">"} <Link to="/job">Job Position</Link> {">"} {jobDetail?.jobPositionName}
      </p>
      
      {/* Header - Title */}
      <div className="w-full min-h-36 p-10 text-center">
        <h1 className="fade-in uppercase text-8xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
          {jobDetail?.jobPositionName || "Không tìm thấy khóa học"}
        </h1>
        <h2 className="fade-in text-white text-5xl font-bold mt-5 text-center">
          What's {jobDetail?.jobPositionName || "____"}
        </h2>
        <div
          className="fade-in prose list-disc whitespace-pre-wrap text-white text-3xl mt-5 text-center"
          dangerouslySetInnerHTML={{
            __html: jobDetail?.jobPositionDescription || "",
          }}
        />
      </div>

      {/* Certificates by type */}
      <div className="grid grid-cols-2 text-center min-h-screen gap-10 px-10">
        {renderCertifications("Foundation", "1. Foundation", "Knowledge-based certification for foundational understanding.")}
        {renderCertifications("Associate", "2. Associate", "Certification for those with basic skills and applied knowledge.")}
        {renderCertifications("Professional", "3. Professional", "Certification for professionals with advanced expertise.")}
        {renderCertifications("Expert", "4. Expert", "Certification for experts who demonstrate mastery in the field.")}
        {renderCertifications("Specialty", "5. Specialty", "Certification focused on specialized skills in a specific area of expertise.")}

        <div className="m-auto fade-in">
          <CustomButton
            shining
            label="Get more certificates"
            onClick={() => navigate("/certificate")}
            className="bg-red-500 fade-in"
          />
        </div>
      </div>

      {/* Importance of certificate section */}
      <div>
        <h1>Why should get Certificate?</h1>
      </div>
    </div>
  );
};

export default JobDetail;
