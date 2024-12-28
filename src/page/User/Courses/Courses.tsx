import { useEffect, useState } from "react";
import CourseCard from "../../../components/Course/CourseCard";
import { allCoursePaginationData } from "../../../models/course";
import useCourse from "../../../hooks/Course/useCourse";
import Loading from "../../../components/UI/Loading";
import useCourseEnrollment from "../../../hooks/Enrollment/useCourse";
import { usePayNow } from "../../../hooks/Payment/usePayNow";
import { courseEnrollment } from "../../../models/enrollment";
import Cookies from "js-cookie";
import { showToast } from "../../../utils/toastUtils";
import aws from "../../../assets/images/Organization/aws.png";
import microsoft from "../../../assets/images/Organization/microsoft.png";
import comptia from "../../../assets/images/Organization/comptia.png";
import cisco from "../../../assets/images/Organization/cisco.png";
import oracle from "../../../assets/images/Organization/oracle.png";
import google from "../../../assets/images/Organization/google.png";
import { Modal } from "antd";
import Coin from "../../../assets/images/Coin.png";
import useWalletDetail from "../../../hooks/Wallet/useWalletDetail";
import { Link, useNavigate } from "react-router-dom";

const Courses = () => {
  const userId = Cookies.get("userId");
  const navigate = useNavigate();
  const [courses, setCourses] = useState<allCoursePaginationData[]>([]);
  const { course, loading, refetchCourses } = useCourse();
  const [purchasedCourses, setPurchasedCourses] = useState<courseEnrollment[]>([]);
  const [pendingPaymentCourses, setPendingPaymentCourses] = useState<courseEnrollment[]>([]);
  const { courseEnrollment, loading: courseLoad, refetchCourseEnrollments } = useCourseEnrollment({ userId: userId || "" });
  const { handlePayNow } = usePayNow();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { wallets, getWalletDetails } = useWalletDetail();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9; // Số lượng khóa học trên mỗi trang
  const [searchKeyword, setSearchKeyword] = useState("");

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = () => {
    const filteredCourses = course.filter((c) =>
      c.courseName.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setCourses(filteredCourses);
    setTotalPages(Math.ceil(filteredCourses.length / itemsPerPage));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (userId) {
      refetchCourseEnrollments(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const successfulCourses = courseEnrollment.filter((course) => course.courseEnrollmentStatus === "Completed");
      const pendingPaymentCourses = courseEnrollment.filter((course) => course.courseEnrollmentStatus === "OnGoing");
      setPurchasedCourses(successfulCourses);
      setPendingPaymentCourses(pendingPaymentCourses);
    }
  }, [courseEnrollment, userId]);


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
    if (course.length > 0) {
      const approvedCourses = course.filter(c => c.coursePermission === 'Approve');
      setCourses(approvedCourses);
      setTotalPages(Math.ceil(approvedCourses.length / itemsPerPage));
      console.log(approvedCourses)
    }
  }, [course]);

  const paginatedCourses = courses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang
  };

  useEffect(() => {
    if (userId) {
      getWalletDetails(userId, null);
    }
  }, [userId]);

  const handleBuyNow = (courseItem: any) => {
    if (!userId) {
      showToast("Please log in to purchase course", "error");
      return;
    }
    setSelectedCourse(courseItem);
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = async () => {
    if (!userId || !selectedCourse) return;

    try {
      const response = await handlePayNow({
        userId: Number(userId),
        simulation_Exams: [],
        courses: [selectedCourse.courseId],
      });

      console.log("Payment Response:", response);

      showToast("Payment successful", "success");
      setShowPaymentModal(false);

      if (userId) {
        refetchCourseEnrollments(userId);
      }

      if (response.data.courseEnrollmentId) {
        navigate(`/enrollment/${response.data.courseEnrollmentId}`);
      }

    } catch (error: any) {
      showToast(`${error.response?.data?.message || "Unknown error"}`, "error");
      if (userId) {
        refetchCourseEnrollments(userId);
      }
    }
  };

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    scrollToTop();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Explore Our Training Courses
          </h1>
          <p className="text-center text-lg text-purple-100 max-w-3xl mx-auto">
            Comprehensive preparation courses designed to help you pass your certification exams.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 -mt-8">
        <div className="relative w-full max-w-2xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search for courses..."
            className="w-full px-6 py-4 rounded-full shadow-lg border-2 border-transparent
      focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 focus:border-purple-500
      transition-all duration-300 ease-in-out transform bg-white dark:bg-gray-800 text-gray-900 dark:text-white
      hover:shadow-xl focus:scale-[1.02]"
            onChange={changeKeyword}
            onKeyDown={handleKeyPress}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 
      text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transform hover:scale-110 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container mx-auto px-4 py-16">

        {paginatedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedCourses.map((course) => {
              const isPurchased = !!(userId && (purchasedCourses || []).some((e) =>
                (e.courseDetails || []).some((c) => c.courseId.toString() === course.courseId.toString())
              ));
              const isPendingPayment = !!(userId && (pendingPaymentCourses || []).some((e) =>
                (e.courseDetails || []).some((c) => c.courseId.toString() === course.courseId.toString())
              ));
              return (
                <CourseCard
                  key={course.courseId}
                  course={course}
                  onClick={isPurchased || isPendingPayment ? undefined : () => handleBuyNow(course)}
                  isPurchased={isPurchased}
                  isPendingPayment={isPendingPayment}
                />
              );
            })}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-12">
            <img
              src="https://dmf76jm51vpov.cloudfront.net/www2/images/main/2020/webpage/Course-not-Found.jpg"
              alt="No certificates found"
              className="w-full rounded-xl shadow-lg mb-6"
            />
            <p className="text-gray-600 dark:text-gray-400">
              We couldn't find any courses. Please try again or{' '}
              <Link to="/" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium">
                return to homepage
              </Link>
            </p>
          </div>
        )}

      </div>
      <div className="flex justify-center gap-2 py-8">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded ${currentPage === page ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
              } hover:bg-purple-500 transition`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Prepare for Success with Our Exam Prep Courses
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Our preparation courses are specifically designed to help you master the content
                and format of certification exams. Get ready to pass your certification exam with confidence.
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex items-center space-x-4 bg-purple-50 dark:bg-purple-900 p-6 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Practice Tests</h3>
                  <p className="text-gray-600 dark:text-gray-300">Simulate the real exam environment with our practice tests</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-purple-50 dark:bg-purple-900 p-6 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Study Materials</h3>
                  <p className="text-gray-600 dark:text-gray-300">Comprehensive study guides and exam tips</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
            Prepare for Certifications From Leading Organizations
          </h2>
          <div className="flex justify-center items-center flex-wrap gap-12">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <img
                src={aws}
                alt="AWS"
                className="h-12 md:h-16 object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
              <img
                src={microsoft}
                alt="Microsoft"
                className="h-12 md:h-16 object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
              <img
                src={comptia}
                alt="CompTIA"
                className="h-12 md:h-16 object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
              <img
                src={cisco}
                alt="Cisco"
                className="h-12 md:h-16 object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
              <img
                src={oracle}
                alt="Oracle"
                className="h-12 md:h-16 object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
              <img
                src={google}
                alt="Google"
                className="h-12 md:h-16 object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {loading && courseLoad && <Loading />}
      <Modal
        title="Confirm Payment"
        visible={showPaymentModal}
        onCancel={() => setShowPaymentModal(false)}
        footer={null}
        destroyOnClose
      >
        <div className="p-4">
          <div className="space-y-4">
          <p className="text-gray-400 dark:text-gray-200 mt-2">Note: Valid for 3 days only.</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Course Price:</span>
              <span className="flex items-center gap-2 font-medium">
                {selectedCourse?.courseDiscountFee}
                <img src={Coin} alt="coin" className="h-5" />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Your Balance:</span>
              <span className="flex items-center gap-2 font-medium">
                {userId ? wallets[userId]?.point || 0 : 0}
                <img src={Coin} alt="coin" className="h-5" />
              </span>
            </div>
            <div className="border-t dark:border-gray-600 pt-4">
              <button
                onClick={handleConfirmPayment}
                className="w-full px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-lg font-medium 
                  hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors disabled:bg-purple-300 dark:disabled:bg-purple-500"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Courses;
