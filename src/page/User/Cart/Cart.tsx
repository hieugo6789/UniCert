import { useEffect, useState } from "react";
import useCartByUserId from "../../../hooks/Cart/useCartByUserId";
import Cookies from "js-cookie";
import { currentCart } from "../../../models/cart"; // Ensure you import types properly
import bookIcon from "../../../assets/icons/book.png";
import paperIcon from "../../../assets/icons/paper.png";
import { BiBook } from "react-icons/bi";
import { PiExam } from "react-icons/pi";
import useUpdateCart from "../../../hooks/Cart/useUpdateCart";
import { useCreateCourseEnrollment } from "../../../hooks/Enrollment/useCreateCourse";
import { useCreateExamEnrollment } from "../../../hooks/Enrollment/useCreateExam";
const ITEMS_PER_PAGE = 2;

const Cart = () => {
  const userId = Cookies.get("userId");
  const [carts, setCarts] = useState<currentCart | null>(null);
  const [currentCoursePage, setCurrentCoursePage] = useState<number>(1);
  const [currentExamPage, setCurrentExamPage] = useState<number>(1);
  const { state, getCart } = useCartByUserId();
  const { updateCart } = useUpdateCart();
  const { handleCreateCourseEnrollment } = useCreateCourseEnrollment();
  const { handleCreateExamEnrollment } = useCreateExamEnrollment();

  // Track selected courses and exams
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const [selectedExams, setSelectedExams] = useState<any[]>([]);

  useEffect(() => {
    if (userId) {
      getCart(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (state) {
      setCarts(state.currentCart);
    }
  }, [state]);

  const loadMoreCourses = () => {
    setCurrentCoursePage((prev) => prev + 1);
  };

  const loadMoreExams = () => {
    setCurrentExamPage((prev) => prev + 1);
  };

  const displayedCourses = carts?.courseDetails?.slice(0, currentCoursePage * ITEMS_PER_PAGE) || [];
  const displayedExams = carts?.examDetails?.slice(0, currentExamPage * ITEMS_PER_PAGE) || [];

  const toggleCourseSelection = (course: any) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  const toggleExamSelection = (exam: any) => {
    setSelectedExams((prev) =>
      prev.includes(exam) ? prev.filter((e) => e !== exam) : [...prev, exam]
    );
  };

  // Function to handle select/deselect all for courses
  const handleSelectAllCourses = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCourses(displayedCourses); // Select all courses
    } else {
      setSelectedCourses([]); // Deselect all courses
    }
  };

  // Function to handle select/deselect all for exams
  const handleSelectAllExams = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedExams(displayedExams); // Select all exams
    } else {
      setSelectedExams([]); // Deselect all exams
    }
  };

  // Handle payment action
  const handlePayment = () => {
    try {
      // nếu selectedCourse không có thì bỏ qua
      if (selectedCourses.length > 0)
        handleCreateCourseEnrollment({
          userId: userId?.toString() || "", // Correctly call toString()
          courses: selectedCourses.map((course) => course.courseId),
        }).catch((error) => {
          alert("Error in payment" + error);
        });
      if (selectedExams.length > 0)
        handleCreateExamEnrollment({
          userId: userId?.toString() || "",
          simulation_Exams: selectedExams.map((exam) => exam.examId),
        }).catch((error) => {
          alert("Error in payment" + error);
        });
      // Remove selected courses and exams from the cart
      const updateCourseId = carts?.courseDetails
        ?.filter((course) => !selectedCourses.includes(course))
        .map((course) => course.courseId) || [];

      const updateExamId = carts?.examDetails
        ?.filter((exam) => !selectedExams.includes(exam))
        .map((exam) => exam.examId) || [];

      updateCart(userId?.toString() || "", { courseId: updateCourseId, examId: updateExamId });
    } catch (error) {
      alert("Error in payment" + error);
    }
  }

  return (
    <div className="container mx-auto p-4 flex">
      {/* Left Section (Main Content) */}
      <div className="flex-1 mr-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Bag</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {/* Course Section */}
          <div>
            <h2 className="text-xl font-semibold">Courses</h2>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCourses.length === displayedCourses.length && displayedCourses.length > 0}
                onChange={handleSelectAllCourses}
                className="mr-2"
              />
              <label>Select All Courses</label>
            </div>
            {displayedCourses.length > 0 ? (
              displayedCourses.map((course) => (
                <div key={course.courseId} className="flex items-center justify-between p-2">
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course)}
                    onChange={() => toggleCourseSelection(course)}
                    className="mr-2"
                  />
                  <img src={course.courseImage} alt={course.courseName} className="w-16 h-16 rounded" />
                  <div className="flex-1 ml-4">
                    <p>{course.courseName}</p>
                    <p>Code: {course.courseCode}</p>
                    <p>Discount Fee: ${course.courseDiscountFee}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Don’t have Course</p>
            )}
            {displayedCourses.length < (carts?.courseDetails?.length || 0) && (
              <button onClick={loadMoreCourses} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Load More Courses
              </button>
            )}
          </div>

          {/* Exam Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Exams</h2>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedExams.length === displayedExams.length && displayedExams.length > 0}
                onChange={handleSelectAllExams}
                className="mr-2"
              />
              <label>Select All Exams</label>
            </div>
            {displayedExams.length > 0 ? (
              displayedExams.map((exam) => (
                <div key={exam.examId} className="flex items-center justify-between p-2">
                  <input
                    type="checkbox"
                    checked={selectedExams.includes(exam)}
                    onChange={() => toggleExamSelection(exam)}
                    className="mr-2"
                  />
                  <img src={exam.examImage} alt={exam.examName} className="w-16 h-16 rounded" />
                  <div className="flex-1 ml-4">
                    <p>{exam.examName}</p>
                    <p>Code: {exam.examCode}</p>
                    <p>Discount Fee: ${exam.examDiscountFee}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Don’t have Exam</p>
            )}
            {displayedExams.length < (carts?.examDetails?.length || 0) && (
              <button onClick={loadMoreExams} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Load More Exams
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar (Selection Summary) */}
      <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="mt-6">
          <button
            onClick={handlePayment}
            className="w-full px-4 py-2 bg-green-500 text-white rounded"
          >
            Proceed to Payment
          </button>
          <h2 className="text-xl font-semibold mb-4">Selected Items</h2>
          <p className="flex items-center"> Courses Selected: {selectedCourses.length}<BiBook /></p>
          <p className="flex items-center"> Exams Selected: {selectedExams.length}<PiExam /></p>
          <div className="mt-4">
            <h3 className="font-semibold">Courses:</h3>
            {selectedCourses.map((course) => (
              <div key={course.courseId} className="flex items-center">
                <span className="mr-2">
                  <img src={bookIcon} alt="Book Icon" className="w-[60px] inline" />
                </span>
                <p>{course.courseName}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Exams:</h3>
            {selectedExams.map((exam) => (
              <div key={exam.examId} className="flex items-center">
                <span className="mr-2">
                  <img src={paperIcon} alt="Paper Icon" className="w-[60px] inline" />
                </span>
                <p>{exam.examName}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
