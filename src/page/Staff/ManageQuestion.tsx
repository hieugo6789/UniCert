import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useExamDetail from "../../hooks/SimulationExam/useExamDetail";
import CreateQuestion from "../../components/Exam/Question/CreateQuestion";
import { Button, Dropdown, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import useDeleteQuestion from "../../hooks/SimulationExam/Question/useDeleteQuestion";
// import useUpdateQuestion from "../../hooks/SimulationExam/Question/useUpdateQuestion";

const ManageQuestion = () => {
  const { id } = useParams();
  const { state, getExamDetails } = useExamDetail();
  const { handleDeleteQuestion } = useDeleteQuestion();
  // const { updateQuestionDetails, state: updateQuestionState } =
  //   useUpdateQuestion();

  useEffect(() => {
    if (id) {
      getExamDetails(Number(id));
    }
  }, []);
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

  const handleUpdateQuestion = (questionId: number) => {
    console.log("Updating question with ID:", questionId);
    // Logic for updating question
  };

  const handleClickDeleteQuestion = async (questionId: number) => {
    try {
      await handleDeleteQuestion(questionId);
      await getExamDetails(Number(id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };
  return (
    <>
      <CreateQuestion onQuestionCreated={() => getExamDetails(Number(id))} />
      <div className="p-4 bg-white gap-4">
        {state.currentExam.listQuestions?.map((question, index) => (
          <div
            key={index}
            className="mb-6 relative border p-4 rounded-md shadow-sm"
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
            <h2 className="font-bold text-lg mb-2">{question.questionName}</h2>
            <div className="grid grid-cols-2 gap-4">
              {question.answers?.map((answer, answerIndex) => (
                <div
                  key={answerIndex}
                  className="border p-4 rounded-md shadow-sm hover:bg-gray-100 transition"
                >
                  {answer.answerText}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ManageQuestion;
