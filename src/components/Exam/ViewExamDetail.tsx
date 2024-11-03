import { useState } from "react";
import useExamDetail from "../../hooks/SimulationExam/useExamDetail";
import { EyeOutlined } from "@ant-design/icons";
import { Card, Descriptions, Modal, Spin, Tag } from "antd";

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
  const approvedCertification = state.currentExam.certificationDetails?.filter(
    (cert) => cert.permission === "Approve"
  );
  return (
    <>
      <EyeOutlined
        style={{ color: "blue" }}
        onClick={() => handleView(examId)}
      />
      <Modal
        width={900}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentExam ? (
          <div className="text-lg">
            <Descriptions
              bordered
              size="middle"
              column={1}
              className="mb-4"
              labelStyle={{ width: "50px", fontWeight: "bold" }}
              contentStyle={{ width: "600px", textAlign: "left" }}
              title={<h3 className="text-2xl text-blue-600">Exam Details</h3>}
            >
              <Descriptions.Item label="Image">
                <img
                  src={state.currentExam.examImage}
                  alt="Course"
                  className=" object-cover rounded-lg shadow-md mb-4"
                />
              </Descriptions.Item>
              <Descriptions.Item label="Name">
                <span className="text-blue-700">
                  {state.currentExam.examName}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Code">
                <span className="text-gray-600">
                  {state.currentExam.examCode}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                <div
                  className="prose list-disc whitespace-pre-wrap text-sm"
                  dangerouslySetInnerHTML={{
                    __html: state.currentExam.examDescription || "",
                  }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Fee">
                {state.currentExam.examFee} $
              </Descriptions.Item>
              <Descriptions.Item label="Discount Fee">
                {state.currentExam.examDiscountFee} $
              </Descriptions.Item>
              <Descriptions.Item label="Vouchers">
                {state.currentExam.voucherDetails?.length ? (
                  state.currentExam.voucherDetails.map((v, index) => (
                    <div
                      key={index}
                      className="mb-2"
                    >
                      <p className="font-semibold text-gray-700">
                        {v.voucherName} - {v.percentage}%
                      </p>
                      <div className="text-sm text-gray-500">
                        {new Date(v.creationDate).toLocaleDateString()} -{" "}
                        {new Date(v.expiryDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <span>No vouchers available</span>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Certifications">
                {approvedCertification?.length ? (
                  approvedCertification.map((cert, index) => (
                    <Tag
                      color="blue"
                      key={index}
                      className="mb-1"
                    >
                      {cert.certCode} - {cert.certName}
                    </Tag>
                  ))
                ) : (
                  <span>Certification is pending or rejected</span>
                )}
              </Descriptions.Item>
            </Descriptions>

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
