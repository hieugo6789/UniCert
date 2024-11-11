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
const HistoryPage = () => {
  // const { id } = useParams<{ id: string }>(); // Extract userID from the URL
  const id = Cookies.get("userId");
  const [activeTab, setActiveTab] = useState("exams"); // Current active tab
  const [purchasedExams, setPurchasedExams] = useState<examEnrollment[]>([]);
  const [purchasedCourses, setPurchasedCourses] = useState<courseEnrollment[]>([]);
  const { courseEnrollment, loading: courseLoad, refetchCourseEnrollments } = useCourseEnrollment({ userId: id?.toString() || "" });
  const { examEnrollment, loading: examLoad, refetchExamEnrollments } = useExamEnrollment({ userId: id?.toString() || "" });
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8">Purchase History</h1>
          
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {purchasedExams.map((exam) => (
                      <HistoryExamCard key={exam.examEnrollmentId} enrollment={exam} />
                    ))}
                  </div>
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {purchasedCourses.map((course) => (
                      <HistoryCourseCard key={course.courseEnrollmentId} enrollment={course} />
                    ))}
                  </div>
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
