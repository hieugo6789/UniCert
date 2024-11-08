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

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">History</h1>
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`p-2 ${activeTab === "exams" ? "border-b-4 border-blue-500 text-blue-500" : ""}`}
          onClick={() => setActiveTab("exams")}
        >
          Purchased Exams
        </button>
        <button
          className={`p-2 ${activeTab === "courses" ? "border-b-4 border-blue-500 text-blue-500" : ""}`}
          onClick={() => setActiveTab("courses")}
        >
          Purchased Courses
        </button>
      </div>

      <div>
        {activeTab === "exams" ? (
          <div className="mr-20 ml-20">
            <h2 className="text-xl font-semibold mb-2">Your Purchased Exams</h2>
            <section className="grid gap-6 ">
              {purchasedExams.length > 0 ? (
                purchasedExams.map((exam) => (
                  <HistoryExamCard key={exam.examEnrollmentId} enrollment={exam} />
                ))
              ) : (
                <p>No purchased exams found.</p>
              )}
            </section>
          </div>
        ) : (
          <div className="mr-20 ml-20">
            <h2 className="text-xl font-semibold mb-2">Your Purchased Courses</h2>
            <section className="grid gap-6 ">
              {purchasedCourses.length > 0 ? (
                purchasedCourses.map((course) => (
                  <HistoryCourseCard key={course.courseEnrollmentId} enrollment={course} />
                ))
              ) : (
                <p>No purchased courses found.</p>
              )}
            </section>
          </div>
        )}
      </div>

      {examLoad && courseLoad && <Loading />}
    </div>
  );
};

export default HistoryPage;
