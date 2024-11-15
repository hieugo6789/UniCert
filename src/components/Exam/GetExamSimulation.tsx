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
import { useCreateExamEnrollment } from "../../hooks/Enrollment/useCreateExam";
import { useCreatePayment } from "../../hooks/Payment/useCreatePayment";
import Coin from "../../assets/images/Coin.png";
import useWalletDetail from "../../hooks/Wallet/useWalletDetail";
import { Modal as AntModal } from "antd";
import { useNavigate } from "react-router-dom";

const GetExamSimulation = ({ certId }: { certId: number }) => {
  const userId = Cookies.get("userId");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { exam, loading, refetchExams } = useExamByCertId(certId);
  const { state, getCart } = useCartByUserId();
  const [purchasedExams, setPurchasedExams] = useState<examEnrollment[]>([]);
  const [approvedExams, setApprovedExams] = useState<any[]>([]);
  const { examEnrollment, loading: examLoad, refetchExamEnrollments } = useExamEnrollment({ userId: userId || "" });
  const { updateCart } = useUpdateCart();
  const { state: createdExamEnroll, handleCreateExamEnrollment } = useCreateExamEnrollment();
  const { handleCreatePayment } = useCreatePayment();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { wallets, getWalletDetails } = useWalletDetail();
  const navigate = useNavigate();

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
      setIsProcessing(true);
        
      await handleCreateExamEnrollment({
        userId: userId,
        simulation_Exams: [selectedExam.examId],
      });
  
      const examEnrollmentId = (createdExamEnroll?.createdExamEnrollment as any)?.data?.examEnrollment?.examEnrollmentId;      
      if (examEnrollmentId) {
        await handleCreatePayment({
          userId: userId,
          examEnrollmentId: examEnrollmentId,
          courseEnrollmentId: 0,
        });
  
        showToast("Payment successful", "success");
        refetchExamEnrollments(userId);
        setShowPaymentModal(false);
        handleCancel();
      } else {
        showToast("Failed to create Exam Enrollment", "error");
      }
    } catch (error) {
      showToast(`Payment failed: ${error}`, "error");
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
      <AntModal
        title="Confirm Payment"
        visible={showPaymentModal}
        onCancel={() => setShowPaymentModal(false)}
        footer={null}
        destroyOnClose
      >
        <div className="p-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Exam Price:</span>
              <span className="flex items-center gap-2 font-medium">
                {selectedExam?.examDiscountFee}
                <img src={Coin} alt="coin" className="h-5" />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Your Balance:</span>
              <span className="flex items-center gap-2 font-medium">
                {userId ? wallets[userId]?.point || 0 : 0}
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
      </AntModal>
    </>
  );
};

export default GetExamSimulation;
