import { Modal } from "antd";
import { useState, useEffect } from "react";
import useExamByCertId from "../../hooks/SimulationExam/useExamByCertId";
import ExamSimulaCard from "../Exam/ExamSimulaCard";
import Loading from "../UI/Loading";
import CustomButton from "../UI/CustomButton";

const GetExamSimulation = ({ certId }: { certId: number }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { exam, loading, refetchExams } = useExamByCertId(certId);

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
                <ExamSimulaCard key={examItem.examId} {...examItem} />
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