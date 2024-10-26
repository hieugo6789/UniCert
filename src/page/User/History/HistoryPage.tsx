import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseCard from "../../../components/Course/CourseCard";
import ExamSimulaCard from "../../../components/Exam/ExamSimulaCard"; 
import { allExamPaginationData } from "../../../models/simulationExam";
import { allCoursePaginationData } from "../../../models/course";

const HistoryPage = () => {
  const { id } = useParams<{ id: string }>(); // Extract userID from the URL
  const [activeTab, setActiveTab] = useState("exams"); // Current active tab
  const [purchasedExams, setPurchasedExams] = useState<allExamPaginationData[]>([]);
  const [purchasedCourses, setPurchasedCourses] = useState<allCoursePaginationData[]>([]);

  useEffect(() => {
    // Giả lập dữ liệu các kỳ thi đã mua
    const fetchPurchasedExams = () => {
        const exams = [
            {
              examId: 14,
              examName: "AWS2 Certified Machine Learning - Specialty Simualtion Exam",
              examCode: "AWS-CML-SE-2",
              certId: 62,
              examDescription: "This is the Simulation Exam for AWS Certified",
              examFee: 100000,
              examDiscountFee: 60000,
              examImage: "https://marketplace.canva.com/EAFH_f4DrV0/2/0/1600w/canva-gold-luxury-certificate-of-completion-template-yz6w30Bp85w.jpg", // Thay bằng đường dẫn thực tế
            },
            {
              examId: 15,
              examName: "AWS2 Certified Machine Learning - Specialty Simualtion Exam",
              examCode: "AWS-CML-SE-2",
              certId: 62,
              examDescription: "This is the Simulation Exam for AWS Certified",
              examFee: 100000,
              examDiscountFee: 6000,
              examImage: "https://marketplace.canva.com/EAFH_f4DrV0/2/0/1600w/canva-gold-luxury-certificate-of-completion-template-yz6w30Bp85w.jpg", // Thay bằng đường dẫn thực tế
            },
            {
              examId: 16,
              examName: "AWS3 Certified Machine Learning - Specialty Simualtion Exam",
              examCode: "AWS-CML-SE-3",
              certId: 62,
              examDescription: "Assess your skills in Node.js.",
              examFee: 100000,
              examDiscountFee: 100000,
              examImage: "https://marketplace.canva.com/EAFH_f4DrV0/2/0/1600w/canva-gold-luxury-certificate-of-completion-template-yz6w30Bp85w.jpg", // Thay bằng đường dẫn thực tế
            },
          ];
      setPurchasedExams(exams);
    };

    // Giả lập dữ liệu các khóa học đã mua
    const fetchPurchasedCourses = () => {
        const courses: allCoursePaginationData[] = [
            {
              courseId: "20",
              courseName: "ISTQB",
              courseCode: "ISTQB001",
              courseTime: "40 hours",
              courseDescription: "International Software Testing Qualification Board course.",
              courseFee: 100,
              courseDiscountFee: 90,
              courseImage: "https://marketplace.canva.com/EAFH_f4DrV0/2/0/1600w/canva-gold-luxury-certificate-of-completion-template-yz6w30Bp85w.jpg",
              certId: "49",
              certificationDetails: [
                {
                  certId: 49,
                  certName: "AWS Certified Cloud Practitioner",
                  certCode: "AWSCCP",
                  certDescription: "The AWS Certified Cloud Practitioner validates foundational understanding of AWS Cloud.",
                  certImage: "https://d1.awsstatic.com/certification/badges/AWS-Certified-Cloud-Practitioner_badge_150x150.17da917fbddc5383838d9f8209d2030c8d99f31e.png",
                  typeName: "Foundation",
                }
              ],
              voucherDetails: [
                {
                  voucherId: 1,
                  voucherName: "Voucher discount 10%",
                  voucherDescription: "10% off on ISTQB course.",
                  percentage: 10,
                  creationDate: new Date("2024-10-01"),
                  expiryDate: new Date("2024-12-31"),
                  voucherStatus: true,
                }
              ],
            },
            {
              courseId: "24",
              courseName: "IBM Front-End Developer Professional Course",
              courseCode: "IBMCourse",
              courseTime: "100 hours",
              courseDescription: "A comprehensive course for front-end development using HTML, CSS, JavaScript, and React.",
              courseFee: 200,
              courseDiscountFee: 180,
              courseImage: "https://i.ytimg.com/vi/fcxPoGeMpoQ/maxresdefault.jpg",
              certId: "55",
              certificationDetails: [
                {
                  certId: 55,
                  certName: "IBM Front-End Developer Professional Certificate",
                  certCode: "IBMFEDP",
                  certDescription: "This certificate focuses on front-end development skills.",
                  certImage: "https://images.credly.com/images/e646f624-ca3d-4917-9e90-16a051497bdb/image.png",
                  typeName: "Professional",
                }
              ],
              voucherDetails: [
                {
                  voucherId: 2,
                  voucherName: "Voucher discount 5%",
                  voucherDescription: "5% off on IBM Front-End Developer course.",
                  percentage: 5,
                  creationDate: new Date("2024-10-10"),
                  expiryDate: new Date("2024-12-31"),
                  voucherStatus: true,
                }
              ],
            },
            {
              courseId: "26",
              courseName: "IBM Back-End Development Course",
              courseCode: "IBMBE",
              courseTime: "60 hours",
              courseDescription: "A beginner-friendly course for back-end development covering databases, APIs, and server-side programming.",
              courseFee: 250,
              courseDiscountFee: 225,
              courseImage: "https://i.ytimg.com/vi/HGuAXNrBJP8/maxresdefault.jpg",
              certId: "56",
              certificationDetails: [
                {
                  certId: 56,
                  certName: "IBM Back-End Development Professional Certificate",
                  certCode: "IBMBEDP",
                  certDescription: "This certificate focuses on back-end development skills.",
                  certImage: "https://images.credly.com/images/5aa05f53-1a60-4913-bf7e-e356f34bdb7e/image.png",
                  typeName: "Professional",
                }
              ],
              voucherDetails: [
                {
                  voucherId: 3,
                  voucherName: "Voucher discount 15%",
                  voucherDescription: "15% off on IBM Back-End Development course.",
                  percentage: 15,
                  creationDate: new Date("2024-10-15"),
                  expiryDate: new Date("2024-12-31"),
                  voucherStatus: true,
                }
              ],
            }
          ];
      setPurchasedCourses(courses);
    };

    fetchPurchasedExams();
    fetchPurchasedCourses();
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">History</h1>
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
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Purchased Exams</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 py-10">
              {purchasedExams.length > 0 ? (
                purchasedExams.map((exam) => (
                  <ExamSimulaCard key={exam.examId} {...exam} />
                ))
              ) : (
                <p>No purchased exams found.</p>
              )}
            </section>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Purchased Courses</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 py-10">
              {purchasedCourses.length > 0 ? (
                purchasedCourses.map((course) => (
                  <CourseCard key={course.courseId} {...course} />
                ))
              ) : (
                <p>No purchased courses found.</p>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
