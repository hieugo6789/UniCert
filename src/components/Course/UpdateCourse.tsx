// import { useEffect, useState } from "react";
// import useUpdateCourse from "../../hooks/Course/useCourseUpdate";
// import useCertificate from "../../hooks/useCertificate";
// import useCourseDetail from "../../hooks/Course/useCourseDetail";
// import { Button, Form } from "antd";

// interface UpdateCourseProps {
//   courseId: string;
//   refetchCourses: () => void;
// }

// const UpdateCourse: React.FC<UpdateCourseProps> = ({
//   courseId,
//   refetchCourses,
// }) => {
//   const [form] = Form.useForm();
//   const { updateCourseDetails } = useUpdateCourse();
//   const { certificate } = useCertificate();
//   const { state: courseDetailState, getCourseDetails } = useCourseDetail();

//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const showModal = () => {
//     setIsModalVisible(true);
//     if (courseId) {
//       getCourseDetails(courseId);
//     }
//   };
//   useEffect(() => {
//     if (courseDetailState.currentCourse) {
//       const currentCourse = courseDetailState.currentCourse;
//       //   const Vouchers = Array.isArray(currentCourse.certificationDetails)
//       //     ? currentCourse.certificationDetails.map((cert) => cert.certId)
//       //     : 0;
//       const certIds = Array.isArray(currentCourse.certificationDetails)
//         ? currentCourse.certificationDetails.map((cert) => cert.certId)
//         : 0;

//       // Update form fields directly
//       form.setFieldsValue({
//         courseName: currentCourse.courseName || "",
//         courseCode: currentCourse.courseCode || "",
//         courseTime: currentCourse.courseTime || "",
//         courseDescription: currentCourse.courseDescription || "",
//         courseFee: currentCourse.courseFee || "",

//         certId: certIds,
//       });
//     }
//   }, [courseDetailState.currentCourse, courseId, form]);
//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields(); // Reset the form when closing the modal
//   };

//   return (
//     <>
//       <Button>Edit</Button>
//     </>
//   );
// };
// export default UpdateCourse;
const UpdateCourse = () => {
  return <div>UpdateCourse</div>;
};
export default UpdateCourse;
