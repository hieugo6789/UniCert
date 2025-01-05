// Import cần thiết và logic từ các hook và API hiện có
import { Modal } from "antd";
import { useState, useEffect } from "react";
import useExamByCertId from "../../hooks/SimulationExam/useExamByCertId";
import ExamSimulaCard from "../Exam/ExamSimulaCard";
import Loading from "../UI/Loading";
import CustomButton from "../UI/CustomButton";
import useCartByUserId from "../../hooks/Cart/useCartByUserId";
import useUpdateCart from "../../hooks/Cart/useUpdateCart";
import useExamEnrollment from "../../hooks/Enrollment/useExam";
import { examEnrollment } from "../../models/enrollment";
import Cookies from "js-cookie";
import { showToast } from "../../utils/toastUtils";
import { usePayNow } from "../../hooks/Payment/usePayNow";
import Coin from "../../assets/images/Coin.png";
import useWalletDetail from "../../hooks/Wallet/useWalletDetail";
import { useNavigate } from "react-router-dom";
import { currentVoucher } from "../../models/voucher";
import agent from "../../utils/agent";

const GetExamSimulation = ({ certId }: { certId: number }) => {
  const userId = Cookies.get("userId");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { exam, loading, refetchExams } = useExamByCertId(certId);
  const { state, getCart } = useCartByUserId();
  const [purchasedExams, setPurchasedExams] = useState<examEnrollment[]>([]);
  const [approvedExams, setApprovedExams] = useState<any[]>([]);
  const { examEnrollment, loading: examLoad, refetchExamEnrollments } = useExamEnrollment({ userId: userId || "" });
  const { updateCart } = useUpdateCart();
  const { handlePayNow } = usePayNow();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { wallets, getWalletDetails } = useWalletDetail();
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState<currentVoucher[]>([]);
    const [selectedVoucher, setSelectedVoucher] = useState<currentVoucher | null>(null);
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchVouchers = async () => {
      const response = await agent.Voucher.getVoucherByUserId(userId || "");
      setVouchers(response.data);
      console.log(response)
    };
    fetchVouchers();
  }, [userId]);

  // Lấy cart và các kỳ thi đã mua
  useEffect(() => {
    if (userId) {
      getCart(userId);
    }
    refetchExamEnrollments(userId || "");
  }, [userId]);

  // Lọc các kỳ thi đã hoàn tất 
  useEffect(() => {
    const successfulExams = examEnrollment.filter((exam) => exam.examEnrollmentStatus === "Completed");
    setPurchasedExams(successfulExams);
  }, [examEnrollment]);

  // Reset exam list when certId changes
  useEffect(() => {
    setApprovedExams([]); // Reset approved exams when certId changes
  }, [certId]);

  // Modify existing useEffect for exam filtering
  useEffect(() => {
    if (exam && exam.length > 0) {
      const filteredExams = exam.filter(examItem => examItem.examPermission === 'Approve');
      setApprovedExams(filteredExams);
    } else {
      setApprovedExams([]); // Reset when no exams available
    }
  }, [exam]);

  // Thêm useEffect để lấy số dư ví
  useEffect(() => {
    if (userId) {
      getWalletDetails(userId, null);
    }
  }, [userId]);

  // Hàm thêm vào giỏ hàng
  const addToCart = (examId: string) => async () => {
    if (!userId) {
      showToast("Please log in to add courses to your cart.", "error");
      return;
    }
    const examIds = state.currentCart.examDetails.map((exam: any) => exam.examId);
    const courseIds = state.currentCart.courseDetails.map((course: any) => course.courseId);
    await updateCart(userId?.toString() || "", {
      examId: [...examIds, examId],
      courseId: [...courseIds],
    });
    
    getCart(userId || "").then(() => {
      showToast("Exam added to cart successfully", "success");
    }).catch((error) => {
      showToast("Failed to add exam to cart"+error, "error");
    } );
  };

  // Modify modal visibility handler
  const showModal = async () => {
    setIsModalVisible(true);
    try {
      await refetchExams(certId); // Refetch exams when opening modal
    } catch (error) {
      console.error("Failed to fetch exams:", error);
      showToast("Failed to load exams", "error");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setApprovedExams([]); // Reset when closing modal
  };

  // Thêm hàm xử lý Buy Now
  const handleBuyNow = (examItem: any) => {
    if (!userId) {
      showToast("Please log in to purchase exam", "error");
      return;
    }
    setSelectedExam(examItem);
    setShowPaymentModal(true);
  };
  
  const handleConfirmPayment = async () => {
    if (!userId || !selectedExam) return;
  
    try {                   
      await handlePayNow({
        userId: Number(userId),
        simulation_Exams: [selectedExam.examId],
        courses: [],
        voucherIds: selectedVoucher ? [selectedVoucher.voucherId] : [],
      });

      showToast("Payment successful", "success");
      refetchExamEnrollments(userId);
      setShowPaymentModal(false);
      handleCancel();
    } catch (error) {
      if (error)
        showToast(`Insufficient balance in wallet`, "error");
        if (userId) {
          refetchExamEnrollments(userId);
        }
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Thêm hàm xử lý click vào card
  const handleCardClick = (examItem: any, isPurchased: boolean) => {
    if (isPurchased) {
      navigate(`/exam/${examItem.examId}`);
    }
  };

  const handleVoucherClick = (voucher: currentVoucher) => {
    if (selectedVoucher?.voucherId === voucher.voucherId) {
      setSelectedVoucher(null);
    } else {
      setSelectedVoucher(voucher);
    }
    setIsVoucherModalOpen(false);
  };

  return (
    <>
      <CustomButton label="Take Exam" shining onClick={showModal} />
      <Modal
        title="Exam Simulation"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1030}
        destroyOnClose={true}
        zIndex={999}
      >
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {approvedExams && approvedExams.length > 0 ? (
              approvedExams.map((examItem) => {
                const isInCart = (state.currentCart?.examDetails || []).some(
                  (e: any) => e.examId === examItem.examId
                );
                
                const isInPayment = examEnrollment.some(
                  (e) => e.examEnrollmentStatus === "OnGoing" && 
                  e.simulationExamDetail.some(
                    (simExam) => simExam.examId === examItem.examId
                  )
                );
                
                const isPurchased = purchasedExams.some(
                  (e) => e.simulationExamDetail.some(
                    (simExam) => simExam.examId === examItem.examId
                  )
                );

                return (
                  <ExamSimulaCard
                    key={examItem.examId}
                    {...examItem}
                    onClick={
                      isPurchased 
                        ? () => handleCardClick(examItem, isPurchased)
                        : isInCart || isInPayment 
                          ? undefined 
                          : addToCart(examItem.examId.toString())
                    }
                    isInCart={isInCart}
                    isPurchased={isPurchased}
                    isInPayment={isInPayment}
                    onBuyNow={() => handleBuyNow(examItem)}
                    className={isPurchased ? "cursor-pointer hover:shadow-lg transition-shadow" : ""}
                  />
                );
              })
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No approved exams available for this certificate.</p>
              </div>
            )}
          </div>
        )}
      </Modal>
      {examLoad && <Loading />}
      <Modal
        title="Confirm Payment"
        visible={showPaymentModal}
        onCancel={() => setShowPaymentModal(false)}
        footer={null}
        destroyOnClose
        zIndex={1000}
      >
        <div className="p-4">
          <div className="space-y-4">
          <p className="text-red-500 dark:text-red-500 mt-2">Note: Students can take simulation exams within 3 days after purchase. Please plan accordingly.</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Exam Price:</span>
              <span className="flex items-center gap-2 font-medium">
                {selectedExam?.examDiscountFee}
                <img src={Coin} alt="coin" className="h-5" />
              </span>
            </div>
            {selectedVoucher && (
            <>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Discounted Price:</span>
              <span className="flex items-center gap-2 font-medium">
                {selectedVoucher
                  ? Math.ceil(selectedExam?.examDiscountFee - (selectedExam?.examDiscountFee * selectedVoucher.percentage) / 100)
                  : selectedExam?.examDiscountFee}
                <img src={Coin} alt="coin" className="h-5" />
              </span>
            </div>
            </>)}

            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-300">Voucher</span>
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
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Your Balance:</span>
              <span className="flex items-center gap-2 font-medium">
                {userId ? wallets[userId]?.point || 0 : 0}
                <img src={Coin} alt="coin" className="h-5" />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Remaining Balance:</span>
              <span className="flex items-center gap-2 font-medium">
                {userId ? wallets[userId]?.point - Math.ceil(Math.ceil(selectedExam?.examDiscountFee - (selectedExam?.examDiscountFee * (selectedVoucher?.percentage || 0)) / 100)) || 0 : 0}
                <img src={Coin} alt="coin" className="h-5" />
              </span>
            </div>
            <div className="border-t pt-4">
              <button
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium 
                  hover:bg-purple-700 transition-colors disabled:bg-purple-300"
              >
                {isProcessing ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
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
        zIndex={1001}
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
                          handleVoucherClick(voucher);
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
    </>
  );
};

export default GetExamSimulation;
