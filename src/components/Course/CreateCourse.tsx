// import { Button, Form, Modal } from "antd";
// import { useCreateCourse } from "../../hooks/Course/useCreateCourse";
// import { PlusOutlined } from "@ant-design/icons";

// import { useState } from "react";
// import axios from "axios";

// const CreateCourse = ({ refetchCourses }: { refetchCourses: () => void }) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const { handleCreateCourse } = useCreateCourse();

//   const [form] = Form.useForm();
//   const [formData, setFormData] = useState({
//     courseName: "",
//     courseCode: "",
//     courseTime: "",
//     courseDescription: "",
//     courseFee: 0,
//     voucherIds: [] as number[],
//     courseImage: "",
//     certId: 0,
//   });
//   const showModal = () => {
//     setIsModalVisible(true);
//   };
//   const handleOK = async () => {
//     try {
//       // Validate fields before submission
//       await form.validateFields();

//       await handleCreateCourse(formData);
//       setIsModalVisible(false);
//       refetchCourses();
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error("Error creating job position:", error.response?.data);
//       } else if (error instanceof Error) {
//         console.error("An unexpected error occurred:", error);
//       } else {
//         console.error("Validation failed.");
//       }
//     }
//   };
//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//   };
//   return (
//     <>
//       <Button
//         icon={<PlusOutlined />}
//         type="primary"
//         onClick={showModal}
//         style={{ maxWidth: "120px" }}
//       >
//         Course
//       </Button>
//       <Modal></Modal>
//     </>
//   );
// };
// export default CreateCourse;
const CreateCourse = () => {
  return <div>CreateCourse</div>;
};
export default CreateCourse;
