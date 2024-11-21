import { useState, useEffect } from "react";
import useCourseEnrollment from "../../../hooks/Enrollment/useCourse";
import useExamEnrollment from "../../../hooks/Enrollment/useExam";
import Loading from "../../../components/UI/Loading";
import HistoryCourseCard from "../../../components/Course/HistoryCourseCard";
import HistoryExamCard from "../../../components/Exam/HistoryExamCard";
import { courseEnrollment, examEnrollment } from "../../../models/enrollment";
import Cookies from "js-cookie";
import useDeleteCourseEnroll from "../../../hooks/Enrollment/useDeleteCourseEnroll";
import useDeleteExamEnroll from "../../../hooks/Enrollment/useDeleteExamEnroll";
import { showToast } from "../../../utils/toastUtils";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {  
  const id = Cookies.get("userId");
  const [activeTab, setActiveTab] = useState("exams"); // Current active tab
  const [purchasedExams, setPurchasedExams] = useState<examEnrollment[]>([]);
  const [purchasedCourses, setPurchasedCourses] = useState<courseEnrollment[]>([]);
  const { courseEnrollment, loading: courseLoad, refetchCourseEnrollments } = useCourseEnrollment({ userId: id?.toString() || "" });
  const { examEnrollment, loading: examLoad, refetchExamEnrollments } = useExamEnrollment({ userId: id?.toString() || "" });
  const { handleDeleteExamEnroll } = useDeleteExamEnroll();
  const { handleDeleteCourseEnroll } = useDeleteCourseEnroll();
  const navigate = useNavigate();

  useEffect(() => {
    // Giả lập dữ liệu các kỳ thi đã mua
    const fetchPurchasedExams = () => {
      
      refetchExamEnrollments(id?.toString() || "");
    };

    // Giả lập dữ liệu các khóa học đã mua
    const fetchPurchasedCourses = () => {
      refetchCourseEnrollments(id?.toString() || "");
    };
    setPurchasedCourses([]);
    setPurchasedExams([]);
    fetchPurchasedExams();
    fetchPurchasedCourses();
  }, [id]);

  useEffect(() => {
    
    const sortedExams = [...examEnrollment].sort((a, b) => {
      if (a.examEnrollmentStatus === 'OnGoing' && b.examEnrollmentStatus !== 'OnGoing') {
        return -1; 
      } else if (a.examEnrollmentStatus !== 'OnGoing' && b.examEnrollmentStatus === 'OnGoing') {
        return 1; 
      }
      return 0; 
    });

    setPurchasedExams(sortedExams);
  }, [examEnrollment]);

  useEffect(() => {
    const sortedCourses = [...courseEnrollment].sort((a, b) => {
      if (a.courseEnrollmentStatus === 'OnGoing' && b.courseEnrollmentStatus !== 'OnGoing') {
        return -1; 
      } else if (a.courseEnrollmentStatus !== 'OnGoing' && b.courseEnrollmentStatus === 'OnGoing') {
        return 1; 
      }
      return 0; 
    });
    setPurchasedCourses(sortedCourses);
  }, [courseEnrollment]);

  useEffect(() => {        
    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: "smooth",
        });
    };
    scrollToTop();          
  });

  const handleDeleteEnrollment = async (type: 'exam' | 'course', enrollmentId: number) => {
    try {
      if (type === 'exam') {
        await handleDeleteExamEnroll(enrollmentId);
        // Refresh exam enrollments after deletion
        refetchExamEnrollments(id?.toString() || "");
        showToast("Exam enrollment deleted successfully", "success");
      } else {
        await handleDeleteCourseEnroll(enrollmentId);
        // Refresh course enrollments after deletion
        refetchCourseEnrollments(id?.toString() || "");
        showToast("Course enrollment deleted successfully", "success");
      }
    } catch (error) {
      showToast("Failed to delete enrollment", "error");
    }
  };

  const handleStatusChange = () => {
    // Refresh cả exam và course enrollments
    refetchExamEnrollments(id?.toString() || "");
    refetchCourseEnrollments(id?.toString() || "");
  };

  const scrollToSection = (status: string) => {
    const element = document.getElementById(`section-${status.toLowerCase()}`);
    if (element) {
      const yOffset = -100; // Offset để không bị header che
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const renderOngoingContent = (type: 'exams' | 'courses') => {
    const items = type === 'exams' 
      ? purchasedExams.filter(exam => exam.examEnrollmentStatus === 'OnGoing')
      : purchasedCourses.filter(course => course.courseEnrollmentStatus === 'OnGoing');

    if (items.length === 0) return null;

    return (
      <div id="section-ongoing" className="mb-8">
        <h3 className="text-xl font-bold text-yellow-600 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
          Pending Payments
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {items.map((item: any) => (
            <div key={type === 'exams' ? item.examEnrollmentId : item.courseEnrollmentId} className="relative">
              {type === 'exams' ? (
                <HistoryExamCard 
                  enrollment={item} 
                  onStatusChange={handleStatusChange}
                />
              ) : (
                <HistoryCourseCard 
                  enrollment={item}
                  onStatusChange={handleStatusChange}                  
                />
              )}
              <button
                onClick={() => handleDeleteEnrollment(
                  type === 'exams' ? 'exam' : 'course',
                  type === 'exams' ? item.examEnrollmentId : item.courseEnrollmentId
                )}
                className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-700
                  bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCompletedContent = (type: 'exams' | 'courses') => {
    const items = type === 'exams'
      ? purchasedExams.filter(exam => exam.examEnrollmentStatus === 'Completed')
      : purchasedCourses.filter(course => course.courseEnrollmentStatus === 'Completed');

    if (items.length === 0) return null;

    return (
      <div id="section-completed" className="mb-8">
        <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-600 rounded-full"></span>
          Completed Enrollments
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {items.map((item: any) => (
            <div key={type === 'exams' ? item.examEnrollmentId : item.courseEnrollmentId}>
              {type === 'exams' ? (
                <HistoryExamCard enrollment={item} />
              ) : (
                <HistoryCourseCard 
                  enrollment={item}
                  onClick={() => navigate(`/enrollment/${item.courseEnrollmentId}`)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderExpiredContent = (type: 'exams' | 'courses') => {    
    if (type === 'courses') return null;

    const items = purchasedExams.filter(exam => exam.examEnrollmentStatus === 'Expired');

    if (items.length === 0) return null;

    return (
      <div id="section-expired" className="mb-8">
        <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          Expired Enrollments
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {items.map((item) => (
            <div key={item.examEnrollmentId} className="relative">
              <HistoryExamCard 
                enrollment={item}                
                onStatusChange={handleStatusChange}
              />
              <button
                onClick={() => handleDeleteEnrollment('exam', item.examEnrollmentId)}
                className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-700
                  bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-extrabold tracking-tight mb-3">
              My Purchases
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Manage your enrollments and take your exams
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2">
          <nav className="flex justify-center space-x-4" aria-label="Tabs">
            {['exams', 'courses'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-lg 
                  transition-all duration-300 transform hover:scale-105
                  ${activeTab === tab
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                <span className="text-xl">
                  {tab === 'exams' ? '📝' : '📚'}
                </span>
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Enrollments
              </button>
            ))}
          </nav>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            { status: 'Completed', icon: '✅', color: 'green' },
            { status: 'OnGoing', icon: '⏳', color: 'yellow' },
            { status: 'Expired', icon: '⚠️', color: 'red' }
          ].map(({ status, icon, color }) => (
            <div 
              key={status} 
              onClick={() => scrollToSection(status)}
              className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg cursor-pointer
                ${color === 'green' ? 'border-green-200 bg-green-50 hover:bg-green-100' : 
                  color === 'yellow' ? 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100' :
                  'border-red-200 bg-red-50 hover:bg-red-100'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    {status === 'OnGoing' ? 'Pending Payment' : status}
                  </div>
                  <div className="mt-2 text-3xl font-bold text-gray-900">
                    {activeTab === 'exams' 
                      ? purchasedExams.filter(e => e.examEnrollmentStatus === status).length
                      : purchasedCourses.filter(c => c.courseEnrollmentStatus === status).length}
                  </div>
                </div>
                <span className="text-2xl">{icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Content Sections */}
        <div className="mt-8 space-y-8">
          {activeTab === "exams" ? (
            purchasedExams.length > 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="space-y-12">
                  {renderCompletedContent('exams')}
                  {renderOngoingContent('exams')}
                  {renderExpiredContent('exams')}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="space-y-6">
                  <div className="text-6xl animate-bounce">📚</div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    No Enrollments Yet
                  </h3>
                  <p className="text-gray-500 text-lg max-w-md mx-auto">
                    Start your learning journey by exploring our available exams
                  </p>
                  <button 
                    onClick={() => navigate('/certificate')}
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r 
                      from-blue-600 to-purple-600 text-white rounded-lg 
                      hover:from-blue-700 hover:to-purple-700 
                      transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    Browse Exams
                    <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            )
          ) : (
            // Course content
            purchasedCourses.length > 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="space-y-12">
                  {renderCompletedContent('courses')}
                  {renderOngoingContent('courses')}                  
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="space-y-6">
                  <div className="text-6xl animate-bounce">📚</div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    No Course Enrollments Yet
                  </h3>
                  <p className="text-gray-500 text-lg max-w-md mx-auto">
                    Start your learning journey by exploring our available courses
                  </p>
                  <button 
                    onClick={() => navigate('/courses')}
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r 
                      from-blue-600 to-purple-600 text-white rounded-lg 
                      hover:from-blue-700 hover:to-purple-700 
                      transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    Browse Courses
                    <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Loading Overlay */}
      {(examLoad || courseLoad) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm 
          flex items-center justify-center z-50">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
