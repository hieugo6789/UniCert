import { useEffect, useState } from "react";
import useCartByUserId from "../../../hooks/Cart/useCartByUserId";
import Cookies from "js-cookie";
import { currentCart } from "../../../models/cart";
import { PiExam } from "react-icons/pi";
import useUpdateCart from "../../../hooks/Cart/useUpdateCart";
import { useCreateExamEnrollment } from "../../../hooks/Enrollment/useCreateExam";
import coin from "../../../assets/images/Coin.png";
import { Link } from "react-router-dom";
import { useCreatePayment } from "../../../hooks/Payment/useCreatePayment";
import useWalletDetail from "../../../hooks/Wallet/useWalletDetail";
import { showToast } from "../../../utils/toastUtils";
import { currentVoucher } from "../../../models/voucher";
import agent from "../../../utils/agent";
import { Modal } from "antd";

const ITEMS_PER_PAGE = 10;

const Cart = () => {
  const userId = Cookies.get("userId");
  const [carts, setCarts] = useState<currentCart | null>(null);
  const [histoyCarts, setHistoryCarts] = useState<currentCart | null>(null);
  const [currentExamPage, setCurrentExamPage] = useState<number>(1);
  const { state, getCart } = useCartByUserId();
  const { updateCart } = useUpdateCart();
  const { state: createdExamEnroll, handleCreateExamEnrollment } = useCreateExamEnrollment();
  const { handleCreatePayment } = useCreatePayment();
  const { wallets, getWalletDetails } = useWalletDetail();
  const [transactionId, setTransactionId] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [vouchers, setVouchers] = useState<currentVoucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<currentVoucher | null>(null);
  const [totalNonVoucher, setTotalNonVoucher] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const [selectedExams, setSelectedExams] = useState<any[]>([]);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

  const lamTronLen = (a: number) => {
    return a % 1 > 0 ? Math.ceil(a) : a;
  };

  const sortVouchers = (vouchers: currentVoucher[]) => {
    const rankOrder: Record<string, number> = {
        bronze: 1,
        silver: 2,
        gold: 3,
        diamond: 4,
    };

    return vouchers.sort((a, b) => {
        const rankA = rankOrder[a.voucherLevel.toLowerCase()] || 0;
        const rankB = rankOrder[b.voucherLevel.toLowerCase()] || 0;
        return rankA - rankB;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await agent.Voucher.getVoucherByUserId(userId || "");
        console.log("Vouchers:", response.data);
        const sortedVouchers = sortVouchers(response.data); // Sắp xếp voucher
        setVouchers(sortedVouchers);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const applyVoucher = (voucher: currentVoucher) => {
    if (!voucher || !histoyCarts) return;

    const updatedSelectedExams = selectedExams.map((exam) => {
      const historyExam = histoyCarts?.examDetails?.find((e) => e.examId === exam.examId);
      if (historyExam) {
        return {
          ...exam,
          examDiscountFee: lamTronLen(historyExam.examDiscountFee - (historyExam.examDiscountFee * voucher.percentage) / 100),
        };
      }
      return exam;
    });
    setSelectedExams(updatedSelectedExams);
    
    const totalNonVoucher = histoyCarts?.examDetails?.filter((exam) => 
      selectedExams.some((selectedExam) => selectedExam.examId === exam.examId)
    ).reduce((acc, exam) => acc + exam.examDiscountFee, 0);
    
    setTotalNonVoucher(totalNonVoucher || 0);
    const total = updatedSelectedExams.reduce((acc, exam) => acc + exam.examDiscountFee, 0);
    setTotal(total);
  };

  // const handleChangeVoucher = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const voucherId = parseInt(e.target.value, 10);
  //   const selectedVoucher = vouchers.find((v) => v.voucherId === voucherId);
  //   console.log(e.target.value)
  //   setSelectedVoucher(selectedVoucher || null);


  //   if (selectedVoucher) {
  //     applyVoucher(selectedVoucher as currentVoucher);
  //   }
  //   else if (selectedVoucher === null) {
  //     setCarts(histoyCarts);
  //   }
  // };

  // refresh lại khi có thay đổi selectedExams hoặc selectedCourses
  useEffect(() => {
    const totalNonVoucher = histoyCarts?.examDetails?.filter((exam) => selectedExams.some((selectedExam) => selectedExam.examId === exam.examId)).reduce((acc, exam) => acc + exam.examDiscountFee, 0);
    setTotalNonVoucher(totalNonVoucher || 0);
    // setTotalNonVoucher(selectedExams.reduce((acc, exam) => acc + exam.examDiscountFee, 0));
    const total = selectedExams.reduce((acc, exam) => acc + exam.examDiscountFee, 0) + selectedCourses.reduce((acc, course) => acc + course.courseDiscountFee, 0);
    setTotal(total);
  }, [selectedExams, selectedCourses]);


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
      setHistoryCarts(state.currentCart);
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

  const loadMoreExams = () => {
    setCurrentExamPage((prev) => prev + 1);
  };

  const displayedExams = carts?.examDetails?.slice(0, currentExamPage * ITEMS_PER_PAGE) || [];

  const toggleExamSelection = (exam: any) => {
    // setSelectedExams((prev) =>
    //   prev.includes(exam) ? prev.filter((e) => e !== exam) : [...prev, exam]
    // );
    setSelectedExams((prev) => {
      if (prev.some((e) => e.examId === exam.examId)) {
        return prev.filter((e) => e.examId !== exam.examId);
      } else {
        return [...prev, exam];
      }
    });
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
      if (selectedExams.length === 0) {
        showToast("Please select items to purchase", "error");
        return;
      }

      // Tạo exam enrollment nếu có
      if (selectedExams.length > 0) {
        await handleCreateExamEnrollment({
          userId: userId?.toString() || "",
          simulation_Exams: selectedExams.map((exam) => exam.examId),
        },
          selectedVoucher ? [selectedVoucher.voucherId] : undefined);
      }

      // Cập nhật giỏ hàng
      const updateCourseId = carts?.courseDetails
        ?.filter((course) => !selectedCourses.includes(course))
        .map((course) => course.courseId) || [];

      const updateExamId = carts?.examDetails
        ?.filter((exam) => !selectedExams.some((selectedExam) => selectedExam.examId === exam.examId))
        .map((exam) => exam.examId) || [];
      console.log("updateCourseId", updateExamId);
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

  const handleDeleteExam = async (examId: number) => {
    const updatedExams = carts?.examDetails?.filter((exam) => exam.examId !== examId) || [];
    const updatedExamIds = updatedExams.map((exam) => exam.examId);
    const courseIds = carts?.courseDetails?.map((course) => course.courseId) || [];
    toggleExamSelection(carts?.examDetails?.find((exam) => exam.examId === examId) || {});

    await updateCart(userId?.toString() || "", { courseId: courseIds, examId: updatedExamIds });
    getCart(userId?.toString() || "");
    showToast("Exam removed from cart successfully", "success");
  };

  // const total = selectedCourses.reduce((acc, course) => acc + course.courseDiscountFee, 0) + selectedExams.reduce((acc, exam) => acc + exam.examDiscountFee, 0);
  const handlePopupAction = async (continueAction: boolean) => {
    setIsPopupOpen(false);
    if (continueAction) {
      try {
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
      } catch (error: any) {
        setSelectedCourses([]);
        setSelectedExams([]);
        showToast(`${error.response?.data?.message || "Unknown error"}`, "error");
      }
    } else {
      setSelectedCourses([]);
      setSelectedExams([]);
    }
  };

  const handleVoucherClick = (voucher: currentVoucher) => {
    if (selectedVoucher?.voucherId === voucher.voucherId) {
      // If clicking the same voucher, reset everything
      setSelectedVoucher(null);
      setCarts(histoyCarts);
      setSelectedExams((prev) => 
        prev.map((exam) => {
          const originalExam = histoyCarts?.examDetails?.find(
            (e) => e.examId === exam.examId
          );
          return originalExam || exam;
        })
      );
      const total = selectedExams.reduce((acc, exam) => acc + exam.examDiscountFee, 0);
      setTotal(total);
    } else {
      // If clicking a different voucher, apply it
      setSelectedVoucher(voucher);
      applyVoucher(voucher);
    }
    setIsVoucherModalOpen(false);
  };

  // Add this effect to reset voucher when exam selection changes
  useEffect(() => {
    if (selectedExams.length === 0) {
      setSelectedVoucher(null);
    }
    // Reset voucher when changing exam selection
    setSelectedVoucher(null);
    setCarts(histoyCarts);
    const total = selectedExams.reduce((acc, exam) => acc + exam.examDiscountFee, 0);
    setTotal(total);
  }, [selectedExams.length]);

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Popup Xác nhận */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Confirm Payment</h2>
            <p className="text-gray-600 dark:text-gray-300">Are you sure you want to proceed with this payment?</p>
            {/* Note chỉ có giới hạn 3 ngày */}
            <p className="text-red-500 dark:text-red-500 mt-2">Note: Students can take simulation exams within 3 days after purchase. Please plan accordingly.</p>
            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => handlePopupAction(false)}
                className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
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

      {/* Voucher Selection Modal */}
      <Modal
        title={
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            Select Voucher
          </div>
        }
        visible={isVoucherModalOpen}
        onCancel={() => setIsVoucherModalOpen(false)}
        footer={null}
        width={600}
        className="voucher-modal"
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto p-2">
          {vouchers.length > 0 ? (
            vouchers.map((voucher) => (
              <div
                key={voucher.voucherId}
                className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                  selectedVoucher?.voucherId === voucher.voucherId
                    ? 'border-2 border-purple-500 dark:border-purple-400'
                    : 'border border-gray-200 dark:border-gray-700'
                }`}
                onClick={() => handleVoucherClick(voucher)}
              >
                <div className="flex items-stretch">
                  {/* Left side - Discount Badge */}
                  <div className="flex items-center justify-center w-24 bg-gradient-to-br from-purple-500 to-blue-500 text-white p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{voucher.percentage}%</div>
                      <div className="text-xs">OFF</div>
                    </div>
                  </div>

                  {/* Right side - Voucher Details */}
                  <div className="flex-1 p-4 bg-white dark:bg-gray-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                          {voucher.voucherName} - {voucher.voucherLevel}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Valid until: {new Date(voucher.expiryDate).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVoucher(voucher);
                          applyVoucher(voucher);
                          setIsVoucherModalOpen(false);
                        }}
                        className={`mt-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          selectedVoucher?.voucherId === voucher.voucherId
                            ? 'bg-purple-500 text-white hover:bg-purple-600'
                            : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                        }`}
                      >
                        {selectedVoucher?.voucherId === voucher.voucherId ? 'Selected' : 'Select'}
                      </button>
                    </div>

                    {/* Decorative dots */}
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-purple-500/10 dark:bg-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No vouchers available
            </div>
          )}
        </div>
      </Modal>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            {/* Exams Section */}
            <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Your Exams</h2>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedExams.length === displayedExams.length && displayedExams.length > 0}
                    onChange={handleSelectAllExams}
                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
                  />
                  <label className="text-gray-600 dark:text-gray-300 font-medium">Select All</label>
                </div>
              </div>

              <div className="space-y-4">
                {displayedExams.length > 0 ? (
                  displayedExams.map((exam) => (
                    <div key={exam.examId}
                      className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors gap-4">
                      <input
                        type="checkbox"
                        checked={
                          // selectedExams.includes(exam)
                          // nếu selectedExams có exam.id thì trả về true, ngược lại trả về false
                          selectedExams.some((e) => e.examId === exam.examId)
                        }
                        onChange={() => toggleExamSelection(exam)}
                        className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
                      />
                      <img
                        src={exam.examImage}
                        alt={exam.examName}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shadow-sm"
                      />
                      <div className="flex-1">
                        <Link
                          to={"/exam/" + exam.examId}
                          className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          {exam.examName}
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Code: {exam.examCode}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{exam.examDiscountFee}</span>
                          <img src={coin} alt="coin" className="h-5" />
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4">
                          <button
                            onClick={() => toggleExamSelection(exam)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                              ${selectedExams.some((e) => e.examId === exam.examId)

                                ? 'bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/70'
                                : 'bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/70'
                              }`}
                          >
                            {selectedExams.some((e) => e.examId === exam.examId)

                              ? 'Remove' : 'Add to Payment'}
                          </button>
                          <button
                            onClick={() => handleDeleteExam(exam.examId)}
                            className="px-4 py-2 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/70 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    No exams in your cart
                  </div>
                )}
              </div>

              {displayedExams.length < (carts?.examDetails?.length || 0) && (
                <button
                  onClick={loadMoreExams}
                  className="mt-6 w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  Load More Exams
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-96 lg:shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6 lg:sticky lg:top-6">
            <button
              onClick={handlePayment}
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors mb-6"
            >
              Proceed to Payment
            </button>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-300">Exams Selected</span>
                <span className="flex items-center gap-2 font-medium text-gray-800 dark:text-gray-200">
                  {selectedExams.length}
                  <PiExam className="text-purple-600 dark:text-purple-400 text-lg" />
                </span>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Total Amount</span>
                  <span className="flex items-center gap-2 text-lg font-bold text-purple-600 dark:text-purple-400">
                    {totalNonVoucher}
                    <img src={coin} alt="coin" className="h-5" />
                  </span>
                </div>
                {/* số tiền giảm */}
                {totalNonVoucher - total > 0 && (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 dark:text-gray-300">Discount Amount</span>
                      <span className="flex items-center gap-2 text-lg font-bold text-purple-400 dark:text-purple-400 line-through">
                        {totalNonVoucher - total}
                        <img src={coin} alt="coin" className="h-5" />
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 dark:text-gray-300">Total Amount After Discount</span>
                      <span className="flex items-center gap-2 text-lg font-bold text-purple-600 dark:text-purple-400">
                        {total}
                        <img src={coin} alt="coin" className="h-5" />
                      </span>
                    </div>
                  </>)}

                {/* select voucher */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Voucher</span>
                  {selectedExams.length > 0 && (
                    <button
                      onClick={() => setIsVoucherModalOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all duration-300 font-medium"
                    >
                      {selectedVoucher ? (
                        <>
                          <span>{selectedVoucher.voucherName}</span>
                          <span className="text-sm bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded">
                            -{selectedVoucher.percentage}%
                          </span>
                        </>
                      ) : (
                        'Select Voucher'
                      )}
                    </button>
                  )}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Wallet Balance</span>
                  <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    {userId ? wallets[userId]?.point : 0}
                    <img src={coin} alt="coin" className="h-4" />
                  </span>
                </div>
                {/* voucher discount total */}
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-gray-500 dark:text-gray-400">Balance After Purchase</span>
                  <span
                    className={`flex items-center gap-2 ${userId && wallets[userId]?.point - total < 0
                      ? "text-red-600"
                      : "text-gray-600 dark:text-gray-300"
                      }`}
                  >
                    {userId ? wallets[userId]?.point - total : 0}
                    <img src={coin} alt="coin" className="h-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Selected Items List */}
            <div className="space-y-4 max-h-[40vh] lg:max-h-[30vh] overflow-y-auto">
              {selectedExams.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Selected Exams</h3>
                  <div className="space-y-2">
                    {selectedExams.map((exam) => (
                      <div key={exam.examId} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <PiExam className="text-purple-600 dark:text-purple-400" />
                        <p className="truncate">{exam.examName}</p>
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
