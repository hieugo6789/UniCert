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
import dangerIcon from "../../../assets/icons/danger.png";
import agent from "../../../utils/agent";

const CertificateDetailPage = () => {
  const [activeTab, setActiveTab] = useState("Description");
  const [cert, setCertificate] = useState<allCertificationData | undefined>(
    undefined
  );
  const id = Number(useParams().id);
  const { state, getCertDetails } = useCertDetail();
  const { schedule } = useSchedule();
  const [filteredSchedule, setFilteredSchedule] = useState<
    allSchedulePaginationData[]
  >([]);
  const [filteredCourses, setFilteredCourses] = useState<
    allCoursePaginationData[]
  >([]);
  const { course, refetchCourses } = useCourse();

  const [showAllMajors, setShowAllMajors] = useState(false);
  const [showAllJobPositions, setShowAllJobPositions] = useState(false);
  const navigate = useNavigate();
  const [showAllPrerequisites, setShowAllPrerequisites] = useState(false);
  const [showAllNextLevel, setShowAllNextLevel] = useState(false);
  const [organization, setOrganization] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await agent.Organization.getOrganizationDetail(cert?.organizeId.toString() || "0");
        console.log(resp);
        setOrganization(resp.data);
      } catch (error) {
        console.error("Error fetching certificate details:", error);
      }
    };
    fetchData();
  }, [cert]);

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
    if (
      state.currentCert.permission === "Pending" ||
      state.currentCert.permission === "Reject"
    ) {
      navigate("/certificate");
    }
  }, [state, navigate]);

  useEffect(() => {
    setCertificate(state?.currentCert);
  }, [state]);

  useEffect(() => {
    const filtered = schedule.filter(
      (session) => Number(session.certId) === id
    );
    setFilteredSchedule(filtered);
  }, [schedule, id]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        await refetchCourses();
      } catch (error) {
        console.error("Failed to fetch courses: ", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const filteredCourses = course.filter(
      (course) => course.certificationDetails[0]?.certId === cert?.certId
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Banner Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-400">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Certificate Image */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
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
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Level: {cert?.typeName}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="relative group flex items-center">
                      Fee: {cert?.certCost ? `${cert.certCost}$` : "Free"}
                      {cert?.certCost != 0 && (
                        <>
                          <img
                            src={dangerIcon}
                            className="size-5 ml-2"
                          />
                          {/* Tooltip */}
                          <span className=" ml-2 absolute hidden group-hover:block bg-gradient-to-r bg-indigo-500  text-white text-sm rounded-lg px-4 py-2 w-72 left-full top-1/2 transform -translate-y-1/2 translate-x-2 shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 z-10">
                            • This is the minimum cost to own this certificate.{" "}
                            <br />• For some certificates, you may have to pay
                            additional fees or extra charges for retakes or
                            practice exams.
                            <span className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-purple-600  rotate-45"></span>
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6l4 2"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                      />
                    </svg>
                    <span>
                      Validity Period:{" "}
                      {cert?.certValidity || "Permanent certificate"}
                    </span>
                  </div>
                  <div className="mt-6">
                    <GetExamSimulation certId={cert?.certId || 0} />
                  </div>
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    Quick Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Prerequisites
                      </h3>
                      {cert?.certPrerequisite &&
                      cert?.certPrerequisiteId &&
                      cert.certPrerequisite.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {cert.certPrerequisite
                            .slice(
                              0,
                              showAllPrerequisites
                                ? cert.certPrerequisite.length
                                : 2
                            )
                            .map((name: string, index: number) => {
                              const id = cert.certPrerequisiteId[index];
                              if (!name || !id) return null;

                              return (
                                <button
                                  key={id}
                                  onClick={() => navigate(`/certificate/${id}`)}
                                  className="inline-flex items-center px-3 py-1.5 
                                  bg-purple-50 dark:bg-purple-900 hover:bg-purple-100 dark:hover:bg-purple-800
                                  text-purple-700 dark:text-purple-200 rounded-full text-sm font-medium 
                                  transition-colors duration-200
                                  border border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600
                                  group"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1.5 text-purple-500 dark:text-purple-300 group-hover:text-purple-600 dark:group-hover:text-purple-200"
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
                        <p className="text-gray-600 dark:text-gray-300 italic flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1.5 text-gray-400 dark:text-gray-500"
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
                      {cert?.certPrerequisite &&
                        cert.certPrerequisite.length > 2 && (
                          <button
                            onClick={() =>
                              setShowAllPrerequisites(!showAllPrerequisites)
                            }
                            className="mt-3 flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline transition-all duration-200"
                          >
                            {showAllPrerequisites ? "Show Less" : "Show More"}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                  showAllPrerequisites
                                    ? "M5 15l7-7 7 7"
                                    : "M19 9l-7 7-7-7"
                                }
                              />
                            </svg>
                          </button>
                        )}
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Next Level
                      </h3>
                      {cert?.certSubsequentNames &&
                      cert?.certSubsequentIds &&
                      cert.certSubsequentNames.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {cert.certSubsequentNames
                            .slice(
                              0,
                              showAllNextLevel
                                ? cert.certSubsequentNames.length
                                : 2
                            )
                            .map((name: string, index: number) => {
                              const id = cert.certSubsequentIds[index];
                              if (!name || !id) return null;

                              return (
                                <button
                                  key={id}
                                  onClick={() => navigate(`/certificate/${id}`)}
                                  className="inline-flex items-center px-3 py-1.5 
                                  bg-purple-50 dark:bg-purple-900 hover:bg-purple-100 dark:hover:bg-purple-800
                                  text-purple-700 dark:text-purple-200 rounded-full text-sm font-medium 
                                  transition-colors duration-200
                                  border border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600
                                  group"
                                >
                                  {name}
                                </button>
                              );
                            })}
                        </div>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300 italic flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1.5 text-gray-400 dark:text-gray-500"
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
                          Don't have next level certificate yet
                        </p>
                      )}
                      {cert?.certSubsequentNames &&
                        cert.certSubsequentNames.length > 2 && (
                          <button
                            onClick={() =>
                              setShowAllNextLevel(!showAllNextLevel)
                            }
                            className="mt-3 flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline transition-all duration-200"
                          >
                            {showAllNextLevel ? "Show Less" : "Show More"}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                  showAllNextLevel
                                    ? "M5 15l7-7 7 7"
                                    : "M19 9l-7 7-7-7"
                                }
                              />
                            </svg>
                          </button>
                        )}
                    </div>

                    {/* Majors Section */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Majors
                      </h3>
                      {cert?.majorNames &&
                      cert?.majorIds &&
                      cert.majorNames.length > 0 ? (
                        <div>
                          <div className="flex flex-wrap gap-2">
                            {cert.majorNames
                              .slice(
                                0,
                                showAllMajors ? cert.majorNames.length : 2
                              )
                              .map((name: string, index: number) => {
                                const id = cert.majorIds[index];
                                if (!name || !id) return null;

                                return (
                                  <button
                                    key={id}
                                    onClick={() => navigate(`/major/${id}`)}
                                    className="inline-flex items-center px-3 py-1.5 
                                    bg-purple-50 dark:bg-purple-900 hover:bg-purple-100 dark:hover:bg-purple-800
                                    text-purple-700 dark:text-purple-200 rounded-full text-sm font-medium 
                                    transition-transform transform hover:scale-105
                                    border border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600
                                    group"
                                  >
                                    {name}
                                  </button>
                                );
                              })}
                          </div>
                          {cert.majorNames.length > 2 && (
                            <button
                              onClick={() => setShowAllMajors(!showAllMajors)}
                              className="mt-3 flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline transition-all duration-200"
                            >
                              {showAllMajors ? (
                                <>
                                  Show Less
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 ml-1 text-purple-600 dark:text-purple-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 15l7-7 7 7"
                                    />
                                  </svg>
                                </>
                              ) : (
                                <>
                                  Show More
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 ml-1 text-purple-600 dark:text-purple-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300 italic flex items-center">
                          No majors suitable for this certificate
                        </p>
                      )}
                    </div>

                    {/* Job Positions Section */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Job Positions
                      </h3>
                      {cert?.jobPositionNames &&
                      cert?.jobPositionIds &&
                      cert.jobPositionNames.length > 0 ? (
                        <div>
                          <div className="flex flex-wrap gap-2">
                            {cert.jobPositionNames
                              .slice(
                                0,
                                showAllJobPositions
                                  ? cert.jobPositionNames.length
                                  : 2
                              )
                              .map((name: string, index: number) => {
                                const id = cert.jobPositionIds[index];
                                if (!name || !id) return null;

                                return (
                                  <button
                                    key={id}
                                    onClick={() => navigate(`/job/${id}`)}
                                    className="inline-flex items-center px-3 py-1.5 
                                    bg-purple-50 dark:bg-purple-900 hover:bg-purple-100 dark:hover:bg-purple-800
                                    text-purple-700 dark:text-purple-200 rounded-full text-sm font-medium 
                                    transition-transform transform hover:scale-105
                                    border border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600
                                    group"
                                  >
                                    {name}
                                  </button>
                                );
                              })}
                          </div>
                          {cert.jobPositionNames.length > 2 && (
                            <button
                              onClick={() =>
                                setShowAllJobPositions(!showAllJobPositions)
                              }
                              className="mt-3 flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline transition-all duration-200"
                            >
                              {showAllJobPositions ? (
                                <>
                                  Show Less
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 ml-1 text-purple-600 dark:text-purple-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 15l7-7 7 7"
                                    />
                                  </svg>
                                </>
                              ) : (
                                <>
                                  Show More
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 ml-1 text-purple-600 dark:text-purple-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300 italic flex items-center">
                          No job positions suitable for this certificate
                        </p>
                      )}
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-8 overflow-hidden">
          <div className="flex flex-wrap sm:flex-nowrap border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            {[
              "Description",
              cert?.certPointSystem ? "Point system" : null,
              "Feedback",
            ]
              .filter(Boolean)
              .map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab!)}
                  className={`flex-shrink-0 w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 font-medium transition-colors duration-200
                    ${
                      activeTab === tab
                        ? "border-b-2 border-purple-500 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/50"
                        : "text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                    }`}
                >
                  {tab}
                </button>
              ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "Description" && cert && (
              <Description
                props={cert}
                schedule={filteredSchedule}
                course={filteredCourses}
                contact = {organization?.organizeContact? organization.organizeContact : ""}
              />
            )}
            {activeTab === "Point system" && cert && <ExamDetails {...cert} />}
            {activeTab === "Feedback" && <Feedback />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetailPage;
