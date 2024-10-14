// import { EditOutlined } from "@ant-design/icons";
// import { Button, Form, Input, Modal, Spin, InputNumber, Select } from "antd";
// import { useEffect, useState } from "react";
// import useUpdateCert from "../../hooks/useUpdateCert";
// import useCertDetail from "../../hooks/useCertDetail";
// import MyEditor from "../Editor/MyEditor"; // Assuming you use MyEditor for description editing
// import useCertType from "../../hooks/useCertType";
// import useOrganization from "../../hooks/useOrganization";

// const UpdateCert = ({ certId }: { certId: string }) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   const { updateCertDetails, state } = useUpdateCert();
//   const { getCertDetails, state: certDetailState } = useCertDetail(); // Fetch certificate details
//   const { certType } = useCertType(); // Fetch certificate types
//   const { organization } = useOrganization(); // Fetch organizations

//   useEffect(() => {
//     if (certId && isModalVisible) {
//       getCertDetails(certId); // Fetch the certificate details when modal opens
//     }
//   }, [certId, isModalVisible]);

//   const handleEdit = () => {
//     setIsModalVisible(true);
//   };

//   const handleUpdate = async (values: any) => {
//     try {
//       await updateCertDetails(certId, values); // Call the update hook with the new values
//       setIsModalVisible(false); // Close the modal on success
//     } catch (error) {
//       console.error("Failed to update certificate:", error);
//     }
//   };

//   return (
//     <>
//       <EditOutlined
//         style={{ marginLeft: 12 }}
//         onClick={handleEdit}
//       />
//       <Modal
//         title="Update Certification"
//         open={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         {state.isLoading || certDetailState.isLoading ? (
//           <Spin />
//         ) : certDetailState.currentCert ? (
//           <Form
//             form={form}
//             onFinish={handleUpdate}
//             layout="vertical"
//             initialValues={{
//               certName: certDetailState.currentCert.certName,
//               certCode: certDetailState.currentCert.certCode,
//               certDescription: certDetailState.currentCert.certDescription,
//               certCost: certDetailState.currentCert.certCost,
//               certPointSystem: certDetailState.currentCert.certPointSystem,
//               certImage: certDetailState.currentCert.certImage,
//               certValidity: certDetailState.currentCert.certValidity,
//               typeId: certDetailState.currentCert.typeId,
//               organizeId: certDetailState.currentCert.organizeId,
//               certIdPrerequisites:
//                 certDetailState.currentCert.certIdPrerequisites,
//             }}
//           >
//             <Form.Item
//               label="Name"
//               name="certName"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please enter the certificate name",
//                 },
//               ]}
//             >
//               <Input placeholder="Enter certificate name" />
//             </Form.Item>

//             <Form.Item
//               label="Code"
//               name="certCode"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please enter the certificate code",
//                 },
//               ]}
//             >
//               <Input placeholder="Enter certificate code" />
//             </Form.Item>

//             <Form.Item
//               label="Description"
//               name="certDescription"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please enter the certificate description",
//                 },
//               ]}
//             >
//               <MyEditor />
//             </Form.Item>

//             <Form.Item
//               label="Cost"
//               name="certCost"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please enter the certificate cost",
//                 },
//               ]}
//             >
//               <InputNumber
//                 style={{ width: "100%" }}
//                 placeholder="Enter certificate cost"
//               />
//             </Form.Item>

//             <Form.Item
//               label="Point System"
//               name="certPointSystem"
//               rules={[
//                 { required: true, message: "Please enter the point system" },
//               ]}
//             >
//               <Input placeholder="Enter point system" />
//             </Form.Item>

//             <Form.Item
//               label="Image"
//               name="certImage"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please enter the certificate image URL",
//                 },
//               ]}
//             >
//               <Input placeholder="Enter certificate image URL" />
//             </Form.Item>

//             <Form.Item
//               label="Validity"
//               name="certValidity"
//               rules={[
//                 { required: true, message: "Please enter the validity period" },
//               ]}
//             >
//               <Input placeholder="Enter validity period" />
//             </Form.Item>

//             <Form.Item
//               label="Level"
//               name="typeId"
//             >
//               <Select placeholder="Select Certification level">
//                 {certType.map((ct) => (
//                   <Select.Option
//                     key={ct.typeId}
//                     value={ct.typeId}
//                   >
//                     {ct.typeName}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               label="Organization"
//               name="organizeId"
//             >
//               <Select placeholder="Select Organization">
//                 {organization.map((org) => (
//                   <Select.Option
//                     key={org.organizeId}
//                     value={org.organizeId}
//                   >
//                     {org.organizeName}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               label="Prerequisite Certifications"
//               name="certIdPrerequisites"
//             >
//               <Select
//                 placeholder="Select Prerequisite certifications"
//                 mode="multiple"
//               >
//                 {certDetailState.currentCert.certIdPrerequisites.map((cert) => (
//                   <Select.Option
//                     key={cert.certId}
//                     value={cert.certId}
//                   >
//                     {cert.certName}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//               >
//                 Update
//               </Button>
//             </Form.Item>
//           </Form>
//         ) : (
//           <p>No details available.</p>
//         )}
//       </Modal>
//     </>
//   );
// };

// export default UpdateCert;
const UpdateCert = () => {
  return <div>UpdateCert</div>;
};
export default UpdateCert;
