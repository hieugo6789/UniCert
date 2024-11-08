import { useEffect } from "react";
import { Modal, Form, Input, Button, Checkbox, Space } from "antd";
import useUpdateQuestion from "../../../hooks/SimulationExam/Question/useUpdateQuestion";
import { updateQuestion } from "../../../models/SimulationExam/question";
import useQuestionDetail from "../../../hooks/SimulationExam/Question/useQuestionDetail";
import MyEditor from "../../Editor/MyEditor";

interface UpdateQuestionProps {
  questionId: number;
  visible: boolean;
  onClose: () => void;
  onUpdateComplete: () => void;
}

const UpdateQuestion: React.FC<UpdateQuestionProps> = ({
  questionId,
  visible,
  onClose,
  onUpdateComplete,
}) => {
  const { updateQuestionDetails } = useUpdateQuestion();
  const { state: questionDetail, getQuestionDetails } = useQuestionDetail();
  const [form] = Form.useForm<updateQuestion>();

  // Fetch question data when questionId changes
  useEffect(() => {
    if (questionId) {
      getQuestionDetails(questionId); // Fetch question details here
    }
  }, [questionId]);

  // Set initial values when questionDetail is fetched
  useEffect(() => {
    if (questionDetail) {
      form.setFieldsValue({
        questionName: questionDetail.currentQuestion.questionName,
        examId: questionDetail.currentQuestion.examId,
        answers: questionDetail.currentQuestion.answers?.map((answer) => ({
          text: answer.text,
          isCorrect: answer.isCorrect ? true : false, // Convert to `true` or `undefined`
        })),
      });
    }
  }, [questionDetail, form]);

  const handleFinish = async (values: updateQuestion) => {
    await updateQuestionDetails(questionId, values);
    console.log(values);
    onClose();
    onUpdateComplete();
  };

  return (
    <Modal
      width={1000}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={questionDetail} // Initial values set based on fetched data
      >
        <Form.Item
          name="questionName"
          label="Question Name"
        >
          <MyEditor
            value={form.getFieldValue("questionName")}
            onChange={(content) =>
              form.setFieldsValue({ questionName: content })
            }
          />
        </Form.Item>
        <Form.Item
          name="examId"
          label="Exam Id"
          hidden
        >
          <Input type="hidden" />
        </Form.Item>

        <Form.List name="answers">
          {(fields) => (
            <div>
              {fields.map((field, index) => (
                <Space
                  key={field.key}
                  align="baseline"
                  className="w-full flex items-end"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "text"]}
                    label={`Answer ${index + 1}`}
                    key={`answer-text-${field.key}`} // unique key
                    style={{ width: "860px" }}
                  >
                    <Input style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "isCorrect"]}
                    valuePropName="checked"
                    key={`answer-isCorrect-${field.key}`}
                  >
                    <Checkbox>Correct</Checkbox>
                  </Form.Item>
                </Space>
              ))}
            </div>
          )}
        </Form.List>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Update Question
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateQuestion;
