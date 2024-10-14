import { useEffect, useState } from "react";
import Description from "../../../components/Certifications/Description";
import certificationDefault from "../../../assets/images/Certification/certificationDefault.png";
import Feedback from "../../../components/Certifications/Feedback";
import ExamDetails from "../../../components/Certifications/ExamDetails";
import { useParams } from "react-router-dom";
import { allCertificationData } from "../../../models/certificate";
import useCertDetail from "../../../hooks/useCertDetail";

const CertificateDetailPage = () => {
  const [activeTab, setActiveTab] = useState("Description");
  const [cert, setCertificate] = useState<allCertificationData | undefined>(undefined);
  const id = useParams().id;
  const { state, getCertDetails } = useCertDetail();

  useEffect(() => {
    const fetchData = async () => {
      try {
        getCertDetails(id);
      } catch (error) {
        console.error("Error fetching certificate details:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    // getCertDetails(id);
    setCertificate(state?.currentCert);
  }, [state]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center bg-purple-600 p-8 rounded-lg shadow-lg">
        {/* Left Section */}
        <div className="text-left text-white">
          <img
            src={cert?.certImage || certificationDefault}
            alt="Logo"
            className="w-1/2"
          />
          <h1 className="text-2xl font-bold">{cert?.certName}</h1>
          <p className="text-lg mt-2">
            Fee: {cert?.certCost} points for one attempt
          </p>

          <div className="mt-4 flex space-x-4">
            <button className="inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-200 dark:text-slate-800 bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-200 dark:to-slate-100 dark:hover:bg-slate-200 shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.2)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]">
              Take Exam
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-6 rounded-lg shadow-md text-black max-w-xs">
          <h2 className="text-xl font-bold">{cert?.certName}</h2>
          <hr className="my-2" />
          <p>
            <strong>Foundation level: </strong>
            {cert?.certPrerequisite && cert.certPrerequisite.length > 0
              ? cert.certPrerequisite.join(", ")
              : "Beginner"}
          </p>
          <p className="mt-2">
            <strong>Certificate Validity: </strong>
            {cert?.certValidity || "This is a permanent certificate"}
          </p>
          <a href="#" className="text-blue-500 mt-4 block hover:underline">
            Learn More
          </a>
        </div>
      </div>

      <div className="flex border-b-2 border-gray-200">
        {["Description", "Exam Details", "Feedback"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-2 transition-colors duration-300 ${activeTab === tab ? "border-b-4 border-blue-500 text-blue-500" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === "Description" && cert && <Description {...cert} />}
        {activeTab === "Exam Details" && <ExamDetails />}
        {activeTab === "Feedback" && <Feedback />}
      </div>
    </div>
  );
};

export default CertificateDetailPage;
