import { useEffect, useState } from "react";
import CourseCard from "../../../components/Course/CourseCard";
import { allCoursePaginationData } from "../../../models/course";
import useCourse from "../../../hooks/Course/useCourse";
import Loading from "../../../components/UI/Loading";
import useUpdateCart from "../../../hooks/Cart/useUpdateCart";
import useCartByUserId from "../../../hooks/Cart/useCartByUserId";
import useCourseEnrollment from "../../../hooks/Enrollment/useCourse";
import { courseEnrollment } from "../../../models/enrollment";
import Cookies from "js-cookie";
import { showToast } from "../../../utils/toastUtils";
import aws from "../../../assets/images/Organization/aws.png";
import microsoft from "../../../assets/images/Organization/microsoft.png";
import comptia from "../../../assets/images/Organization/comptia.png";
import cisco from "../../../assets/images/Organization/cisco.png";
import oracle from "../../../assets/images/Organization/oracle.png";
import google from "../../../assets/images/Organization/google.png";

const Courses = () => {
  const userId = Cookies.get("userId");
  const [courses, setCourses] = useState<allCoursePaginationData[]>([]);
  const { course, loading, refetchCourses } = useCourse();
  const { state, getCart } = useCartByUserId();
  const { updateCart } = useUpdateCart();
  const [purchasedCourses, setPurchasedCourses] = useState<courseEnrollment[]>([]);
  const { courseEnrollment, loading: courseLoad, refetchCourseEnrollments } = useCourseEnrollment({ userId: userId || "" });

  useEffect(() => {
    if (userId) {
      getCart(userId);
      refetchCourseEnrollments(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const successfulCourses = courseEnrollment.filter((course) => course.courseEnrollmentStatus === "Completed");
      setPurchasedCourses(successfulCourses);
    }
  }, [courseEnrollment, userId]);

  const addToCart = (courseId: string) => async () => {
    if (!userId) {
      showToast("Please log in to add courses to your cart.", "error");
      return;
    }
    const examIds = state.currentCart.examDetails.map((exam: any) => exam.examId);
    const courseIds = state.currentCart.courseDetails.map((course: any) => course.courseId);

    updateCart(userId.toString(), {
      examId: [...examIds],
      courseId: [...courseIds, courseId],
    }).then(() => {
      showToast("Course added to cart successfully", "success");
      getCart(userId);
    }).catch((error) => {
      showToast("Failed to add course to cart: " + error, "error");
    });
  };

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
    }
  }, [course]);

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Explore Our Training Courses
          </h1>
          <p className="text-center text-lg text-purple-100 max-w-3xl mx-auto">
            Comprehensive preparation courses designed to help you pass your certification exams. 
            Our courses include practice tests, exam tips, and detailed explanations of key concepts.
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => {
            const isInCart = !!(userId && state.currentCart.courseDetails.some((c: any) => c.courseId === course.courseId));
            const isPurchased = !!(userId && (purchasedCourses || []).some((e) => 
              (e.courseDetails || []).some((c) => c.courseId.toString() === course.courseId.toString())
            ));                
            return (
              <CourseCard
                key={idx}
                course={course}
                onClick={isInCart || isPurchased ? undefined : addToCart(course.courseId)}
                isInCart={isInCart}
                isPurchased={isPurchased}
              />
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Prepare for Success with Our Exam Prep Courses
              </h2>
              <p className="text-lg text-gray-600">
                Our preparation courses are specifically designed to help you master the content 
                and format of certification exams. Get ready to pass your certification exam with confidence.
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex items-center space-x-4 bg-purple-50 p-6 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Practice Tests</h3>
                  <p className="text-gray-600">Simulate the real exam environment with our practice tests</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-purple-50 p-6 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Study Materials</h3>
                  <p className="text-gray-600">Comprehensive study guides and exam tips</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
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
    </div>
  );
};

export default Courses;
