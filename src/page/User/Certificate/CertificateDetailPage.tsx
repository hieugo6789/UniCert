import { useEffect, useState } from "react";
import Description from "../../../components/Certifications/Description";
import certificationDefault from "../../../assets/images/Certification/certificationDefault.png";
import Feedback from "../../../components/Certifications/Feedback";
import ExamDetails from "../../../components/Certifications/ExamDetails";
import { useParams } from "react-router-dom";
import { allCertificationData } from "../../../models/certificate";
import useCertDetail from "../../../hooks/Certification/useCertDetail";
import CustomButton from "../../../components/UI/CustomButton";

const CertificateDetailPage = () => {
  const [activeTab, setActiveTab] = useState("Description");
  const [cert, setCertificate] = useState<allCertificationData | undefined>(
    undefined
  );
  const id = Number(useParams().id);
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

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Cuộn mượt mà
      });
    };
    scrollToTop();
  });

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center bg-purple-600 p-8 rounded-lg shadow-lg">
        {/* Left Section */}
        <div className="text-left text-white">
          <img
            src={cert?.certImage || certificationDefault}
            alt="Logo"
            className="w-40 h-40 object-contain"
          />
          <h1 className="text-2xl font-bold">{cert?.certName}</h1>
          {cert?.certCost !== null && cert?.certCost !== undefined && cert.certCost > 0 && (
            <div>
              <p className="text-lg mt-2">
                Fee: {cert?.certCost} points for one attempt
              </p>
              <div className="mt-4 flex space-x-4">
                <CustomButton
                  label="Take Exam"
                  shining
                  onClick={() => null}
                />
              </div>
            </div>
          )}      
        </div>

        {/* Right Section */}
        <div className="bg-white p-6 rounded-lg shadow-md text-black max-w-xs">
          <h2 className="text-xl font-bold">{cert?.certName}</h2>
          <hr className="my-2" />
          <p>
            <strong>Certificate level: </strong>
            {cert?.typeName}
          </p>
          <p className="mt-2">
            <strong>Certificate Prerequisite: </strong>
            {cert?.certPrerequisite && cert.certPrerequisite.length > 0
              ? cert.certPrerequisite.join(", ")
              : "Beginner"}
          </p>
          <p className="mt-2">
            <strong>Certificate Validity: </strong>
            {cert?.certValidity || "This is a permanent certificate"}
          </p>
          <a
            href="#"
            className="text-blue-500 mt-4 block hover:underline"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="flex border-b-2 border-gray-200">
        {["Description", cert?.certCost && cert.certCost > 0 ? "Exam Details" : null, "Feedback"]
          .filter(Boolean)
          .map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab!)}
              className={`p-2 transition-colors duration-300 ${
                activeTab === tab
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : ""
              }`}
            >
              {tab}
            </button>
          ))}
      </div>
      <div className="p-4">
        {activeTab === "Description" && cert && <Description {...cert} />}        
        {activeTab === "Exam Details" && cert && <ExamDetails {...cert} />}
        {activeTab === "Feedback" && <Feedback />}
      </div>
    </div>
  );
};

export default CertificateDetailPage;
