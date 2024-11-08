import { useState } from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useCreateQuestion } from "../../../hooks/SimulationExam/Question/useCreateQuestion";
import { useParams } from "react-router-dom";
import MyEditor from "../../Editor/MyEditor";

interface CreateQuestionProps {
  onQuestionCreated: () => void; // Callback prop to trigger refetch
}
const CreateQuestion: React.FC<CreateQuestionProps> = ({
  onQuestionCreated,
}) => {
  const { id } = useParams();
  const { handleCreateQuestion } = useCreateQuestion();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resetEditor, setResetEditor] = useState(false);

  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    examId: Number(id),
    questionName: "",
    answers: [{ text: "", isCorrect: false }],
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOK = async () => {
    try {
      await form.validateFields();
      await handleCreateQuestion(formData);
      setIsModalVisible(false);
      form.resetFields();
      setFormData({
        examId: Number(id),
        questionName: "",
        answers: [{ text: "", isCorrect: false }],
      });
      setResetEditor(true);
      onQuestionCreated();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating exam question:", error.response?.data);
      } else if (error instanceof Error) {
        console.error("An unexpected error occurred:", error);
      } else {
        console.error("Validation failed.");
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    if (index !== undefined) {
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index].text = e.target.value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleCheckboxChange = (index: number) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index].isCorrect = !updatedAnswers[index].isCorrect;
    setFormData({ ...formData, answers: updatedAnswers });
  };

  const addAnswer = () => {
    setFormData({
      ...formData,
      answers: [...formData.answers, { text: "", isCorrect: false }],
    });
  };

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={showModal}
      >
        Question
      </Button>
      <Modal
        title="Create Question"
        open={isModalVisible}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          // initialValues={formData}
        >
          <Form.Item
            label="Question Name"
            name="questionName"
            rules={[
              { required: true, message: "Please input the question name!" },
            ]}
          >
            <MyEditor
              value={formData.questionName}
              onChange={(content) => {
                setFormData({ ...formData, questionName: content });
                setResetEditor(false);
              }}
              reset={resetEditor}
            />
          </Form.Item>
          {formData.answers.map((answer, index) => (
            <div
              key={index}
              className="mb-3"
            >
              <Form.Item label={`Answer ${index + 1}`}>
                <Input
                  value={answer.text}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Answer text"
                />
                <Checkbox
                  checked={answer.isCorrect}
                  onChange={() => handleCheckboxChange(index)}
                >
                  Correct Answer
                </Checkbox>
              </Form.Item>
            </div>
          ))}
          <Button
            type="dashed"
            onClick={addAnswer}
            block
          >
            Add Another Answer
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CreateQuestion;
