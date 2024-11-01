import { useEffect, useState } from "react";
import useCartByUserId from "../../../hooks/Cart/useCartByUserId";
import Cookies from "js-cookie";
import { currentCart } from "../../../models/cart";
import { BiBook } from "react-icons/bi";
import { PiExam } from "react-icons/pi";
import useUpdateCart from "../../../hooks/Cart/useUpdateCart";
import { useCreateCourseEnrollment } from "../../../hooks/Enrollment/useCreateCourse";
import { useCreateExamEnrollment } from "../../../hooks/Enrollment/useCreateExam";
import coin from "../../../assets/images/Coin.png";
import { Link } from "react-router-dom";
import CustomButton from "../../../components/UI/CustomButton";
import { useCreatePayment } from "../../../hooks/Payment/useCreatePayment";
import { showToast } from "../../../utils/toastUtils";
const ITEMS_PER_PAGE = 10;

const Cart = () => {
  const userId = Cookies.get("userId");
  const [carts, setCarts] = useState<currentCart | null>(null);
  const [currentCoursePage, setCurrentCoursePage] = useState<number>(1);
  const [currentExamPage, setCurrentExamPage] = useState<number>(1);
  const { state, getCart } = useCartByUserId();
  const { updateCart } = useUpdateCart();
  const { state: createdCourseEnroll, handleCreateCourseEnrollment } = useCreateCourseEnrollment();
  const { state: createdExamEnroll, handleCreateExamEnrollment } = useCreateExamEnrollment();
  const { handleCreatePayment } = useCreatePayment();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  const handleSelectAllCourses = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCourses(displayedCourses);
    } else {
      setSelectedCourses([]);
    }
  };

  const handleSelectAllExams = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedExams(displayedExams);
    } else {
      setSelectedExams([]);
    }
  };

  const handlePayment = async () => {
    try {
      if (selectedCourses.length > 0)
        handleCreateCourseEnrollment({
          userId: userId?.toString() || "",
          courses: selectedCourses.map((course) => course.courseId),
        }).catch((error) => {
          showToast("Error in payment" + error, "error");
        });
      if (selectedExams.length > 0)
        handleCreateExamEnrollment({
          userId: userId?.toString() || "",
          simulation_Exams: selectedExams.map((exam) => exam.examId),
        }).catch((error) => {
          showToast("Error in payment" + error, "error");
        });

      const updateCourseId = carts?.courseDetails
        ?.filter((course) => !selectedCourses.includes(course))
        .map((course) => course.courseId) || [];

      const updateExamId = carts?.examDetails
        ?.filter((exam) => !selectedExams.includes(exam))
        .map((exam) => exam.examId) || [];

      await updateCart(userId?.toString() || "", { courseId: updateCourseId, examId: updateExamId });
      getCart(userId?.toString() || "");
      setIsPopupOpen(true);
    } catch (error) {
      showToast("Error in payment" + error, "error");
    }
  };
  const handleDeleteCourse = async (courseId: number) => {
    const updatedCourses = carts?.courseDetails?.filter((course) => course.courseId !== courseId) || [];
    const updatedCourseIds = updatedCourses.map((course) => course.courseId);
    const examIds = carts?.examDetails?.map((exam) => exam.examId) || [];
    toggleCourseSelection(carts?.courseDetails?.find((course) => course.courseId === courseId) || {});

    await updateCart(userId?.toString() || "", { courseId: updatedCourseIds, examId: examIds });
    getCart(userId?.toString() || "");
    showToast("Course removed from cart successfully", "success");
  };

  const handleDeleteExam = async (examId: number) => {
    const updatedExams = carts?.examDetails?.filter((exam) => exam.examId !== examId) || [];
    const updatedExamIds = updatedExams.map((exam) => exam.examId);
    const courseIds = carts?.courseDetails?.map((course) => course.courseId) || [];
    toggleExamSelection(carts?.examDetails?.find((exam) => exam.examId === examId) || {});

    await updateCart(userId?.toString() || "", { courseId: courseIds, examId: updatedExamIds });
    getCart(userId?.toString() || "");
    showToast("Exam removed from cart successfully", "success");
  };

  const total = selectedCourses.reduce((acc, course) => acc + course.courseDiscountFee, 0) + selectedExams.reduce((acc, exam) => acc + exam.examDiscountFee, 0);
  const handlePopupAction = async (continueAction: boolean) => {
    setIsPopupOpen(false);
    if (continueAction) {
      console.log(createdCourseEnroll);
      console.log(createdExamEnroll);
      await handleCreatePayment({
        userId: userId?.toString() || "",
        examEnrollmentId: createdExamEnroll?.createdExamEnrollment?.examEnrollmentId || 0,
        courseEnrollmentId: createdCourseEnroll?.createdCourseEnrollment?.courseEnrollmentId || 0,
      }).then(() => {
        showToast("Payment Successful", "success");
      }).catch((error) => {
        showToast("Error in payment" + error, "error");
      });
    }
  };
  return (
    <div className="container mx-auto p-4 flex min-h-screen">
      {/* Popup Xác nhận */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold">Payment Successful</h2>
            <p>Would you like to proceed with another action?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => handlePopupAction(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
                No
              </button>
              <button onClick={() => handlePopupAction(true)} className="px-4 py-2 bg-green-500 text-white rounded">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 mr-4">
        <div className="bg-gray-100 p-4 rounded-xl shadow-xl flex gap-1">
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
                    <Link to={"/course/" + course.courseId} className="font-bold cursor-pointer hover:text-blue-500 hover:underline duration-300 ease-in-out">
                      {course.courseName}
                    </Link>
                    <p>Code: {course.courseCode}</p>
                    <p className="flex gap-1 items-center">Price: {course.courseDiscountFee} <img src={coin} alt="coin" className="h-4" /></p>
                    <div className="flex gap-1">
                      <CustomButton className="bg-green-600" onClick={() => toggleCourseSelection(course)} label={selectedCourses.includes(course) ? "Remove" : "Payment"} />
                      <CustomButton onClick={() => handleDeleteCourse(course.courseId)} className="bg-red-500" label="Delete This Course" />
                    </div>
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

          <div>
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
                    <Link to={"/exam/" + exam.examId} className="font-bold cursor-pointer hover:text-blue-500 hover:underline duration-300 ease-in-out">
                      {exam.examName}
                    </Link>
                    <p>Code: {exam.examCode}</p>
                    <p className="flex gap-1 items-center">Price: {exam.examDiscountFee} <img src={coin} alt="coin" className="h-4" /></p>
                    <div className="flex gap-1">
                      <CustomButton className="bg-green-600" onClick={() => toggleExamSelection(exam)} label={selectedExams.includes(exam) ? "Remove" : "Payment"} />
                      <CustomButton onClick={() => handleDeleteExam(exam.examId)} className="bg-red-500" label="Delete This Course" />
                    </div>
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
          <p className="flex items-center"> Total: {total} <img src={coin} alt="coin" className="h-4" /></p>
          <div className="mt-4">
            <h3 className="font-semibold">Courses:</h3>
            {selectedCourses.map((course) => (
              <div key={course.courseId} className="flex items-center">
                <span className="mr-2">
                  <BiBook />
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
                  <PiExam />
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
