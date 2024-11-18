import { useState, useEffect } from "react";
// import { allExamPaginationData } from "../../../models/simulationExam";
// import { allCoursePaginationData } from "../../../models/course";
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

const HistoryPage = () => {
  // const { id } = useParams<{ id: string }>(); // Extract userID from the URL
  const id = Cookies.get("userId");
  const [activeTab, setActiveTab] = useState("exams"); // Current active tab
  const [purchasedExams, setPurchasedExams] = useState<examEnrollment[]>([]);
  const [purchasedCourses, setPurchasedCourses] = useState<courseEnrollment[]>([]);
  const { courseEnrollment, loading: courseLoad, refetchCourseEnrollments } = useCourseEnrollment({ userId: id?.toString() || "" });
  const { examEnrollment, loading: examLoad, refetchExamEnrollments } = useExamEnrollment({ userId: id?.toString() || "" });
  const { handleDeleteExamEnroll } = useDeleteExamEnroll();
  const { handleDeleteCourseEnroll } = useDeleteCourseEnroll();

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

  const renderOngoingContent = (type: 'exams' | 'courses') => {
    const items = type === 'exams' 
      ? purchasedExams.filter(exam => exam.examEnrollmentStatus === 'OnGoing')
      : purchasedCourses.filter(course => course.courseEnrollmentStatus === 'OnGoing');

    if (items.length === 0) return null;

    return (
      <div className="mb-8">
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
      <div className="mb-8">
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
                <HistoryCourseCard enrollment={item} />
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
      <div className="mb-8">
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8">
            Purchase History
          </h1>
          
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow mb-8">
            <nav className="flex justify-center space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("exams")}
                className={`px-6 py-4 text-lg font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === "exams"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Exam Enrollments
              </button>
              <button
                onClick={() => setActiveTab("courses")}
                className={`px-6 py-4 text-lg font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === "courses"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Course Enrollments
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {activeTab === "exams" ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Exam Enrollments</h2>
                {purchasedExams.length > 0 ? (
                  <>
                    {renderCompletedContent('exams')}
                    {renderOngoingContent('exams')}
                    {renderExpiredContent('exams')}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">You haven't enrolled in any exams yet.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Course Enrollments</h2>
                {purchasedCourses.length > 0 ? (
                  <>
                    {renderCompletedContent('courses')}
                    {renderOngoingContent('courses')}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">You haven't enrolled in any courses yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {examLoad && courseLoad && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
