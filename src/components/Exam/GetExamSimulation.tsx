import { Modal } from "antd";
import { useState, useEffect } from "react";
import useExamByCertId from "../../hooks/SimulationExam/useExamByCertId";
import ExamSimulaCard from "../Exam/ExamSimulaCard";
import Loading from "../UI/Loading";
import CustomButton from "../UI/CustomButton";
import useCartByUserId from "../../hooks/Cart/useCartByUserId";
import useUpdateCart from "../../hooks/Cart/useUpdateCart";
import Cookies from "js-cookie";
const GetExamSimulation = ({ certId }: { certId: number }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { exam, loading, refetchExams } = useExamByCertId(certId);
  const { state, getCart } = useCartByUserId();
  const { updateCart } = useUpdateCart();
  const userId = Cookies.get("userId");
  useEffect(() => {
    if (userId) {
      getCart(userId);
    }
  }, [userId]);
  const addToCart = (examId: string) => async () => {
    const examIds = state.currentCart.examDetails.map((exam: any) => exam.examId);
    const courseIds = state.currentCart.courseDetails.map((course: any) => course.courseId);
    updateCart(userId?.toString() || "", {
      examId: [...examIds, examId],
      courseId: [...courseIds],
    }
    ).then(() => {
      getCart(userId || "");
      alert("Exam added to cart successfully");
    }
    ).catch((error) => {
      console.error("Failed to add course to cart: ", error);
      alert("Failed to add course to cart");
    }
    );
  }
  useEffect(() => {
    if (isModalVisible) refetchExams(certId);
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
            {exam && exam.length > 0 ? (
              exam.map((examItem) => (
                <ExamSimulaCard key={examItem.examId} {...examItem} onClick={addToCart(examItem.examId.toString())} />
              ))
            ) : (
              <p className="text-gray-500">No exams available for this certificate.</p>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default GetExamSimulation;
