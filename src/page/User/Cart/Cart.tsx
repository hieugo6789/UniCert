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
import { useCreatePayment } from "../../../hooks/Payment/useCreatePayment";
import useWalletDetail from "../../../hooks/Wallet/useWalletDetail";
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
  const { wallets, getWalletDetails } = useWalletDetail();
  const [transactionId, setTransactionId] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const [selectedExams, setSelectedExams] = useState<any[]>([]);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Cuộn mượt mà
      });
    };
    scrollToTop();
  });

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

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const transIdFromPath = pathParts[pathParts.length - 1];

    const transIdNumber = parseInt(transIdFromPath, 10);
    if (!isNaN(transIdNumber)) {
      setTransactionId(transIdNumber);
      console.log("Transaction ID from URL:", transIdNumber);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (userId) {
      getWalletDetails(userId, transactionId);
    }
  }, [userId, transactionId]);

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
      // Kiểm tra nếu không có item nào được chọn
      if (selectedCourses.length === 0 && selectedExams.length === 0) {
        showToast("Please select items to purchase", "error");
        return;
      }

      // Tạo course enrollment nếu có
      let courseEnrollmentResult;
      if (selectedCourses.length > 0) {
        courseEnrollmentResult = await handleCreateCourseEnrollment({
          userId: userId?.toString() || "",
          courses: selectedCourses.map((course) => course.courseId),
        });
      }

      // Tạo exam enrollment nếu có
      let examEnrollmentResult;
      if (selectedExams.length > 0) {
        examEnrollmentResult = await handleCreateExamEnrollment({
          userId: userId?.toString() || "",
          simulation_Exams: selectedExams.map((exam) => exam.examId),
        });
      }

      // Kiểm tra kết quả enrollment
      if (courseEnrollmentResult?.error || examEnrollmentResult?.error) {
        showToast("Error creating enrollment", "error");
        return;
      }

      // Cập nhật giỏ hàng
      const updateCourseId = carts?.courseDetails
        ?.filter((course) => !selectedCourses.includes(course))
        .map((course) => course.courseId) || [];

      const updateExamId = carts?.examDetails
        ?.filter((exam) => !selectedExams.includes(exam))
        .map((exam) => exam.examId) || [];

      await updateCart(userId?.toString() || "", { 
        courseId: updateCourseId, 
        examId: updateExamId 
      });

      // Mở popup xác nhận khi mọi thứ đã sẵn sàng
      setIsPopupOpen(true);

    } catch (error) {
      showToast("Error in payment process: " + error, "error");
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
      try {
        // Tạo payment cho course
        if (selectedCourses.length > 0) {                    
          const courseEnrollmentId = (createdCourseEnroll?.createdCourseEnrollment as any)?.data?.courseEnrollmentId;          
          if (courseEnrollmentId) {
            await handleCreatePayment({
              userId: userId?.toString() || "",
              examEnrollmentId: 0,
              courseEnrollmentId: courseEnrollmentId,
            });
          } else {
            console.error("courseEnrollmentId is undefined");
          }
        }

        // Tạo payment cho exam
        if (selectedExams.length > 0) {          
          const examEnrollmentId = (createdExamEnroll?.createdExamEnrollment as any)?.data?.examEnrollment?.examEnrollmentId;
          if (examEnrollmentId) {
            await handleCreatePayment({
              userId: userId?.toString() || "",
              examEnrollmentId: examEnrollmentId,
              courseEnrollmentId: 0,
            });
          }
        }

        // Xóa selected items và refresh cart
        setSelectedCourses([]);
        setSelectedExams([]);
        await getCart(userId?.toString() || "");
        
        // Cập nhật wallet balance sau khi thanh toán thành công
        await getWalletDetails(userId?.toString() || "", transactionId);
        
        showToast("Payment Success", "success");
      } catch (error) {
        showToast(`Payment Error: ${error}`, "error");
      }
    }
  };
  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-6 min-h-screen bg-gray-50">
      {/* Popup Xác nhận */}  
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Payment</h2>
            <p className="text-gray-600">Are you sure you want to proceed with this payment?</p>
            <div className="mt-8 flex justify-end gap-4">
              <button 
                onClick={() => handlePopupAction(false)} 
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => handlePopupAction(true)} 
                className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            {/* Exams Section */}
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Your Exams</h2>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedExams.length === displayedExams.length && displayedExams.length > 0}
                    onChange={handleSelectAllExams}
                    className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label className="text-gray-600 font-medium">Select All</label>
                </div>
              </div>

              <div className="space-y-4">
                {displayedExams.length > 0 ? (
                  displayedExams.map((exam) => (
                    <div key={exam.examId} 
                      className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors gap-4">
                      <input
                        type="checkbox"
                        checked={selectedExams.includes(exam)}
                        onChange={() => toggleExamSelection(exam)}
                        className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <img 
                        src={exam.examImage} 
                        alt={exam.examName} 
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shadow-sm"
                      />
                      <div className="flex-1">
                        <Link 
                          to={"/exam/" + exam.examId} 
                          className="text-base sm:text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors"
                        >
                          {exam.examName}
                        </Link>
                        <p className="text-gray-500 mt-1">Code: {exam.examCode}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-lg font-bold text-purple-600">{exam.examDiscountFee}</span>
                          <img src={coin} alt="coin" className="h-5" />
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4">
                          <button
                            onClick={() => toggleExamSelection(exam)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                              ${selectedExams.includes(exam) 
                                ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                                : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                              }`}
                          >
                            {selectedExams.includes(exam) ? 'Remove' : 'Add to Payment'}
                          </button>
                          <button
                            onClick={() => handleDeleteExam(exam.examId)}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    No exams in your cart
                  </div>
                )}
              </div>

              {displayedExams.length < (carts?.examDetails?.length || 0) && (
                <button 
                  onClick={loadMoreExams} 
                  className="mt-6 w-full py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Load More Exams
                </button>
              )}
            </div>

            {/* Courses Section */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Your Courses</h2>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedCourses.length === displayedCourses.length && displayedCourses.length > 0}
                    onChange={handleSelectAllCourses}
                    className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label className="text-gray-600 font-medium">Select All</label>
                </div>
              </div>

              <div className="space-y-4">
                {displayedCourses.length > 0 ? (
                  displayedCourses.map((course) => (
                    <div key={course.courseId} 
                      className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course)}
                        onChange={() => toggleCourseSelection(course)}
                        className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <img 
                        src={course.courseImage} 
                        alt={course.courseName} 
                        className="w-20 h-20 rounded-lg object-cover ml-4 shadow-sm"
                      />
                      <div className="flex-1 ml-6">
                        <Link 
                          to={"/course/" + course.courseId} 
                          className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors"
                        >
                          {course.courseName}
                        </Link>
                        <p className="text-gray-500 mt-1">Code: {course.courseCode}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-lg font-bold text-purple-600">{course.courseDiscountFee}</span>
                          <img src={coin} alt="coin" className="h-5" />
                        </div>
                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={() => toggleCourseSelection(course)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                              ${selectedCourses.includes(course) 
                                ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                                : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                              }`}
                          >
                            {selectedCourses.includes(course) ? 'Remove' : 'Add to Payment'}
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course.courseId)}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    No courses in your cart
                  </div>
                )}
              </div>

              {displayedCourses.length < (carts?.courseDetails?.length || 0) && (
                <button 
                  onClick={loadMoreCourses} 
                  className="mt-6 w-full py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Load More Courses
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-96 lg:shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:sticky lg:top-6">
            <button
              onClick={handlePayment}
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors mb-6"
            >
              Proceed to Payment
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Exams Selected</span>
                <span className="flex items-center gap-2 font-medium text-gray-800">
                  {selectedExams.length}
                  <PiExam className="text-purple-600 text-lg" />
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Courses Selected</span>
                <span className="flex items-center gap-2 font-medium text-gray-800">
                  {selectedCourses.length}
                  <BiBook className="text-purple-600 text-lg" />
                </span>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="flex items-center gap-2 text-lg font-bold text-purple-600">
                    {total}
                    <img src={coin} alt="coin" className="h-5" />
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Wallet Balance</span>
                  <span className="flex items-center gap-2 text-gray-600">
                    {userId ? wallets[userId]?.point : 0}
                    <img src={coin} alt="coin" className="h-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Selected Items List */}
            <div className="space-y-4 max-h-[40vh] lg:max-h-[30vh] overflow-y-auto">
              {selectedExams.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Selected Exams</h3>
                  <div className="space-y-2">
                    {selectedExams.map((exam) => (
                      <div key={exam.examId} className="flex items-center gap-2 text-gray-600">
                        <PiExam className="text-purple-600" />
                        <p className="truncate">{exam.examName}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedCourses.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Selected Courses</h3>
                  <div className="space-y-2">
                    {selectedCourses.map((course) => (
                      <div key={course.courseId} className="flex items-center gap-2 text-gray-600">
                        <BiBook className="text-purple-600" />
                        <p className="truncate">{course.courseName}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
