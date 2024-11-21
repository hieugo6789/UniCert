import { useEffect, useState } from "react";
import Description from "../../../components/Certifications/Description";
import certificationDefault from "../../../assets/images/Certification/certificationDefault.png";
import ExamDetails from "../../../components/Certifications/ExamDetails";
import { useParams, useNavigate } from "react-router-dom";
import { allCertificationData } from "../../../models/certificate";
import useCertDetail from "../../../hooks/Certification/useCertDetail";
import GetExamSimulation from "../../../components/Exam/GetExamSimulation";
import useSchedule from "../../../hooks/Schedule/useSchedule";
import { allSchedulePaginationData } from "../../../models/schedule";
import useCourse from "../../../hooks/Course/useCourse";
import { allCoursePaginationData } from "../../../models/course";
import Feedback from "../../../components/Certifications/Feedback";
import useFeedbackByCertId from "../../../hooks/Feedback/useFeedbackByCertId";

const CertificateDetailPage = () => {
  const [activeTab, setActiveTab] = useState("Description");
  const [cert, setCertificate] = useState<allCertificationData | undefined>(undefined);
  const id = Number(useParams().id);
  const { state, getCertDetails } = useCertDetail();
  const { schedule } = useSchedule();  
  const [filteredSchedule, setFilteredSchedule] = useState<allSchedulePaginationData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<allCoursePaginationData[]>([]);
  const { course, refetchCourses } = useCourse();
  const { feedback } = useFeedbackByCertId({ certId: id });
  const navigate = useNavigate();

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
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Fee: {cert?.certCost ? `Minimum ${cert.certCost}$ to purchase` : 'Free'}</span>
                  </div>
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
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Prerequisites</h3>
                      {cert?.certPrerequisite && cert?.certPrerequisiteId && 
                       cert.certPrerequisite.length > 0 && cert.certPrerequisiteId.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {cert.certPrerequisite.map((name: string, index: number) => {
                            const id = cert.certPrerequisiteId[index];
                            if (!name || !id) return null;

                            return (
                              <button
                                key={id}
                                onClick={() => navigate(`/certificate/${id}`)}
                                className="inline-flex items-center px-3 py-1.5 
                                  bg-purple-50 hover:bg-purple-100 
                                  text-purple-700 rounded-full text-sm font-medium 
                                  transition-colors duration-200
                                  border border-purple-200 hover:border-purple-300
                                  group"
                              >
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-4 w-4 mr-1.5 text-purple-500 group-hover:text-purple-600" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" 
                                  />
                                </svg>
                                {name}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-gray-600 italic flex items-center">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 mr-1.5 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                            />
                          </svg>
                          No prerequisites certificate
                        </p>
                      )}
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
          <div className="flex flex-wrap sm:flex-nowrap border-b overflow-x-auto">
            {["Description", cert?.certCost && cert.certCost > 0 ? "Exam Details" : null, "Feedback"]
              .filter(Boolean)
              .map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab!)}
                  className={`flex-shrink-0 w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 font-medium transition-colors duration-200
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
            {activeTab === "Feedback" && <Feedback feedback={feedback}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetailPage;
