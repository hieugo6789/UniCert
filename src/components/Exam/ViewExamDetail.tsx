import { useState } from "react";
import useExamDetail from "../../hooks/SimulationExam/useExamDetail";
import { EyeOutlined } from "@ant-design/icons";
import { Card, Divider, Modal, Spin } from "antd";

interface ViewExamDetailProps {
  examId: number;
}

const ViewExamDetail: React.FC<ViewExamDetailProps> = ({ examId }) => {
  const { state, getExamDetails } = useExamDetail();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleView = async (examId: number) => {
    setIsModalVisible(true);
    await getExamDetails(examId);
  };
  return (
    <>
      <EyeOutlined
        style={{ color: "blue" }}
        onClick={() => handleView(examId)}
      />
      <Modal
        width={900}
        title="Simulation Exam Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentExam ? (
          <div className="text-lg">
            <p>
              <strong>Name: </strong> {state.currentExam.examName}
            </p>
            <p>
              <strong>Code: </strong> {state.currentExam.examCode}
            </p>
            <p>
              <strong>Description: </strong> {state.currentExam.examDescription}
            </p>
            <p>
              <strong>Fee: </strong> {state.currentExam.examFee}
            </p>
            <p>
              <strong>Discount Fee: </strong>{" "}
              {state.currentExam.examDiscountFee}
            </p>
            <Divider />
            <h3 className="text-xl font-semibold mb-4">Questions</h3>
            <div className="space-y-6">
              {state.currentExam.listQuestions?.map((question, index) => (
                <Card
                  key={question.questionId}
                  className="shadow-md p-4 border border-gray-200 rounded-lg"
                >
                  <p className="text-lg font-semibold">
                    Q{index + 1}: {question.questionName}
                  </p>
                  <div className="space-y-2 mt-2">
                    {question.answers.map((answer) => (
                      <div
                        key={answer.answerId}
                        className="pl-4 py-1 rounded-md bg-gray-100"
                      >
                        <strong>A{answer.answerId}:</strong> {answer.answerText}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};
export default ViewExamDetail;
