import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useExamDetail from "../../hooks/SimulationExam/useExamDetail";
import CreateQuestion from "../../components/Exam/Question/CreateQuestion";
import { Button, Dropdown, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import useDeleteQuestion from "../../hooks/SimulationExam/Question/useDeleteQuestion";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import UploadExamTemplate from "../../components/Exam/UploadExamTemplate";
import UpdateQuestion from "../../components/Exam/Question/UpdateQuestion";
import Breadcrumbs from "../../components/UI/Breadcrumb";
import Notification from "../../components/Notification/Notification";
import correct from "../../assets/icons/check.png";

const ManageQuestion = () => {
  const { id } = useParams();
  const { state, getExamDetails } = useExamDetail();
  const { handleDeleteQuestion } = useDeleteQuestion();

  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (id) {
      getExamDetails(Number(id));
    }
  }, [id]);

  const handleUpdateQuestion = (questionId: number) => {
    setSelectedQuestionId(questionId);
    setIsUpdateModalVisible(true);
  };

  const handleClickDeleteQuestion = async (questionId: number) => {
    try {
      await handleDeleteQuestion(questionId);
      await getExamDetails(Number(id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const menu = (questionId: number) => (
    <Menu
      items={[
        {
          label: "Update",
          key: "update",
          onClick: () => handleUpdateQuestion(questionId),
        },
        {
          label: "Delete",
          key: "delete",
          onClick: () => handleClickDeleteQuestion(questionId),
        },
      ]}
    />
  );

  return (
    <>
      <div className="h-[10vh] flex justify-between items-center">
        <div className="ml-10 flex items-center">
          <CreateQuestion
            onQuestionCreated={() => getExamDetails(Number(id))}
          />
          <UploadExamTemplate
            examId={Number(id)}
            refetchExams={() => getExamDetails(Number(id))}
          />
        </div>
        <div className="mr-10 flex items-center">
          <div className="text-lg font-semibold p-2 rounded-md bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md mr-6">
            Total Questions: {state.currentExam.listQuestions?.length || 0}
          </div>
          <div className="mr-6">
            <Notification />
          </div>
          <AvatarAdmin />
        </div>
      </div>

      <div className="gap-4 p-2 min-h-[90vh]">
        <Breadcrumbs
          items={[
            { label: "Exam management", link: "/staff/simulationExam" },
            { label: `Question` },
          ]}
        />
        <div>
          {state.currentExam.listQuestions?.map((question, index) => (
            <div
              key={index}
              className="mb-4 relative border p-4 rounded-md shadow-sm bg-white"
            >
              <Dropdown
                overlay={menu(question.questionId)}
                trigger={["click"]}
              >
                <Button
                  icon={<EllipsisOutlined />}
                  shape="circle"
                  className="absolute top-2 right-2"
                />
              </Dropdown>
              <div
                className="prose list-disc whitespace-pre-wrap text-large mb-1"
                dangerouslySetInnerHTML={{
                  __html: question.questionName || "",
                }}
              />

              {/* Hiển thị khác biệt cho Essay */}
              {question.questionType === "Essay" ? (
                <div className="border p-4 rounded-md shadow-sm">
                  <strong>Answer:</strong>
                  <p className="mt-2 text-gray-700">
                    {question.answers?.[0]?.answerText || "No answer provided."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {question.answers?.map((answer, answerIndex) => (
                    <div
                      key={answerIndex}
                      className={`border p-4 rounded-md shadow-sm hover:bg-gray-100 transition flex justify-between items-center`}
                    >
                      {answer.answerText}
                      {answer.isCorrect && (
                        <span>
                          <img
                            src={correct}
                            className="size-6"
                          />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* UpdateQuestion modal */}
      {selectedQuestionId !== null && (
        <UpdateQuestion
          questionId={selectedQuestionId}
          visible={isUpdateModalVisible}
          onClose={() => setIsUpdateModalVisible(false)}
          onUpdateComplete={() => getExamDetails(Number(id))}
        />
      )}
    </>
  );
};

export default ManageQuestion;
