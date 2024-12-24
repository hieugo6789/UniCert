import { Button, Card, Descriptions, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import useExamDetail from "../../../hooks/SimulationExam/useExamDetail";
import { currentExamDetail } from "../../../models/SimulationExam/simulationExam";
import { useEffect, useState } from "react";
import DetailPermission from "../../../components/Permission/DetailPermission";
import usePermissionExam from "../../../hooks/SimulationExam/usePermissionExam";
import Coin from "../../../assets/images/Coin.png";

const ManageExamDetail = () => {
  const navigate = useNavigate();
  const { updatePermissionExamDetails } = usePermissionExam();
  const examId = Number(useParams().id);
  const { state, getExamDetails } = useExamDetail();
  const [simulationExam, setSimulationExam] = useState<
    currentExamDetail | undefined
  >(undefined);

  const mapStatusToNumber = (status: string): number => {
    switch (status) {
      case "Pending":
        return 0;
      case "Approve":
        return 1;
      case "Reject":
        return 2;
      default:
        return 0;
    }
  };
  useEffect(() => {
    const fetchSimulationExamDetail = async () => {
      try {
        getExamDetails(examId);
      } catch (error) {
        console.error("Error fetching certificate details:", error);
      }
    };
    fetchSimulationExamDetail();
  }, [examId]);

  useEffect(() => {
    if (state?.currentExam) {
      setSimulationExam(state.currentExam);
    }
  }, [state.currentExam]);

  if (!state.currentExam) {
    return <p className="text-center mt-10">No exam details found.</p>;
  }
  return (
    <>
      <div className="relative">
        <Button
          type="link"
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 font-semibold text-lg flex items-center gap-2 transition-all absolute bottom-4"
        >
          <span className="text-2xl mb-1">←</span> Back
        </Button>
      </div>
      <div className="p-2">
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl text-blue-600">Simulation exam Details</h3>
            <DetailPermission
              Id={examId}
              updateFunction={updatePermissionExamDetails}
              initialStatus={mapStatusToNumber(
                state.currentExam?.examPermission || "Pending"
              )}
              onUpdateSuccess={() => getExamDetails(examId)}
            />
          </div>
          <Descriptions
            bordered
            size="middle"
            column={2}
            className="mb-4"
            labelStyle={{ width: "50px", fontWeight: "bold" }}
            contentStyle={{ width: "600px", textAlign: "left" }}
          >
            <Descriptions.Item
              label="Image"
              span={2}
            >
              {state?.currentExam?.examImage ? (
                <img
                  src={state.currentExam.examImage}
                  alt="Course"
                  className=" object-cover rounded-lg shadow-md mb-4"
                />
              ) : (
                <p>Loading image...</p>
              )}
            </Descriptions.Item>
            <Descriptions.Item
              label="Name"
              span={2}
            >
              <span className="text-blue-700">{simulationExam?.examName}</span>
            </Descriptions.Item>

            <Descriptions.Item
              label="Description"
              span={2}
            >
              <div
                className="prose list-disc whitespace-pre-wrap text-sm"
                dangerouslySetInnerHTML={{
                  __html: state.currentExam.examDescription || "",
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Code">
              <span className="text-gray-600">
                {state.currentExam.examCode}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Duration">
              <span className="text-gray-600">
                {state.currentExam.duration} minutes
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Questions">
              <span className="text-gray-600">
                {state.currentExam.questionCount} questions
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Passing Score">
              <span className="text-gray-600">
                {state.currentExam.passingScore} %
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Fee">
              <div className="flex items-center">
                {state.currentExam.examFee}
                <img
                  src={Coin}
                  alt="Coin"
                  className="size-5 ml-2"
                />
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Discount Fee">
              <div className="flex items-center">
                {state.currentExam.examDiscountFee}
                <img
                  src={Coin}
                  alt="Coin"
                  className="size-5 ml-2"
                />
              </div>
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
              {state.currentExam.certificationDetails?.length ? (
                state.currentExam.certificationDetails.map((cert, index) => (
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
            {state.currentExam.listQuestions?.map((question) => (
              <Card
                key={question.questionId}
                className="shadow-md p-4 border border-gray-200 rounded-lg"
              >
                <div
                  className="prose list-disc whitespace-pre-wrap text-large mb-1"
                  dangerouslySetInnerHTML={{
                    __html: question.questionName || "",
                  }}
                />
                <div className="space-y-2 mt-2">
                  {question.answers.map((answer) => {
                    return (
                      <div
                        key={answer.answerId}
                        className={`pl-4 py-1 rounded-md ${
                          answer.isCorrect ? "bg-green-200" : "bg-gray-100"
                        }`}
                      >
                        {answer.answerText}
                        {answer.isCorrect}
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageExamDetail;
