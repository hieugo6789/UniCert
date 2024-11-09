import { useEffect, useState } from "react";
import Description from "../../../components/Certifications/Description";
import certificationDefault from "../../../assets/images/Certification/certificationDefault.png";
// import Feedback from "../../../components/Certifications/Feedback";
import ExamDetails from "../../../components/Certifications/ExamDetails";
import { useParams } from "react-router-dom";
import { allCertificationData } from "../../../models/certificate";
import useCertDetail from "../../../hooks/Certification/useCertDetail";
import GetExamSimulation from "../../../components/Exam/GetExamSimulation";
import useSchedule from "../../../hooks/Schedule/useSchedule";
import { allSchedulePaginationData } from "../../../models/schedule";
import useCourse from "../../../hooks/Course/useCourse";
import { allCoursePaginationData } from "../../../models/course";

const CertificateDetailPage = () => {
  const [activeTab, setActiveTab] = useState("Description");
  const [cert, setCertificate] = useState<allCertificationData | undefined>(undefined);
  const id = Number(useParams().id);
  const { state, getCertDetails } = useCertDetail();
  const { schedule } = useSchedule();  
  const [filteredSchedule, setFilteredSchedule] = useState<allSchedulePaginationData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<allCoursePaginationData[]>([]);
  const { course, refetchCourses } = useCourse();

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
    setCertificate(state?.currentCert);    
  }, [state]);

  useEffect(() => {
    const filtered = schedule.filter(session => Number(session.certId) === id);
    setFilteredSchedule(filtered);    
  }, [schedule, id]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        await refetchCourses();
      } catch (error) {
        console.error('Failed to fetch courses: ', error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const filteredCourses = course.filter(course => 
      course.certificationDetails[0]?.certId === cert?.certId
    );
    setFilteredCourses(filteredCourses);
  }, [course, cert]);

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-400">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Certificate Image */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <img
                    src={cert?.certImage || certificationDefault}
                    alt={cert?.certName}
                    className="w-full h-48 object-contain"
                  />
                </div>
              </div>

              {/* Certificate Info */}
              <div className="lg:col-span-1 text-white">
                <h1 className="text-3xl font-bold mb-4">{cert?.certName}</h1>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Level: {cert?.typeName}</span>
                  </div>
                  {cert?.certCost !== null && cert?.certCost !== undefined && cert.certCost > 0 && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Fee: Minimum {cert?.certCost}$ to purchase</span>
                    </div>
                  )}
                  <div className="mt-6">
                    <GetExamSimulation certId={cert?.certId || 0} />
                  </div>
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Information</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Prerequisites</h3>
                      <p className="text-gray-800">
                        {cert?.certPrerequisite && cert.certPrerequisite.length > 0
                          ? cert.certPrerequisite.join(", ")
                          : "No prerequisites certificate"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Validity Period</h3>
                      <p className="text-gray-800">{cert?.certValidity || "Permanent certificate"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg mt-8 overflow-hidden">
          <div className="flex border-b">
            {["Description", cert?.certCost && cert.certCost > 0 ? "Exam Details" : null, "Feedback"]
              .filter(Boolean)
              .map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab!)}
                  className={`px-8 py-4 font-medium transition-colors duration-200
                    ${activeTab === tab
                      ? "border-b-2 border-purple-500 text-purple-600 bg-purple-50"
                      : "text-gray-600 hover:text-purple-500 hover:bg-purple-50"
                    }`}
                >
                  {tab}
                </button>
              ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "Description" && cert && (
              <Description props={cert} schedule={filteredSchedule} course={filteredCourses}/>
            )}
            {activeTab === "Exam Details" && cert && <ExamDetails {...cert} />}
            {activeTab === "Feedback"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetailPage;
