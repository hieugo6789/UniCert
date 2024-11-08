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

const GetExamSimulation = ({ certId }: { certId: number }) => {
  const userId = Cookies.get("userId");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { exam, loading, refetchExams } = useExamByCertId(certId);
  const { state, getCart } = useCartByUserId();
  const [purchasedExams, setPurchasedExams] = useState<examEnrollment[]>([]);
  const [approvedExams, setApprovedExams] = useState<any[]>([]);
  const { examEnrollment, loading: examLoad, refetchExamEnrollments } = useExamEnrollment({ userId: userId || "" });
  const { updateCart } = useUpdateCart();

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

  // Lọc các kỳ thi có permission approve
  useEffect(() => {
    if (exam && exam.length > 0) {
      const filteredExams = exam.filter(examItem => examItem.examPermission === 'Approve');
      setApprovedExams(filteredExams);
    }
  }, [exam]);

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

  useEffect(() => {
    if (isModalVisible) 
      refetchExams(certId);
  }, [isModalVisible, certId]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      >
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {approvedExams && approvedExams.length > 0 ? (
              approvedExams.map((examItem) => {
                const isInCart = (state.currentCart?.examDetails || []).some((e: any) => e.examId === examItem.examId);
                const isPurchased = (purchasedExams || []).some((e) => 
                  (e.simulationExamDetail || []).some((simExam) => simExam.examId === examItem.examId)
                );

                return (
                  <ExamSimulaCard
                    key={examItem.examId}
                    {...examItem}
                    onClick={isInCart || isPurchased ? undefined : addToCart(examItem.examId.toString())}
                    isInCart={isInCart}
                    isPurchased={isPurchased}
                  />
                );
              })
            ) : (
              <p className="text-gray-500">No approved exams available for this certificate.</p>
            )}
          </div>
        )}
      </Modal>
      {examLoad && <Loading />}
    </>
  );
};

export default GetExamSimulation;
