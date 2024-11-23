import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { useCreateCourse } from "../../hooks/Course/useCreateCourse";
import { PlusOutlined } from "@ant-design/icons";

import { useState } from "react";
import axios from "axios";
import MyEditor from "../Editor/MyEditor";
import useAllCertification from "../../hooks/Certification/useAllCertification";

const CreateCourse = ({ refetchCourses }: { refetchCourses: () => void }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { handleCreateCourse } = useCreateCourse();
  const { certificate } = useAllCertification();

  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    courseTime: "",
    courseDescription: "",
    courseFee: 0,
    voucherIds: [] as number[],
    courseImage: "",
    certId: 0,
  });
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOK = async () => {
    try {
      await form.validateFields();
      console.log(formData);

      let uploadedImageUrl = formData.courseImage;

      if (selectedImage) {
        uploadedImageUrl = await uploadCloudinary();
        console.log("New uploaded image URL:", uploadedImageUrl);
      }

      const updatedFormData = {
        ...formData,
        courseImage: uploadedImageUrl,
      };

      await handleCreateCourse(updatedFormData);
      form.resetFields();
      setFormData({
        courseName: "",
        courseCode: "",
        courseTime: "",
        courseDescription: "",
        courseFee: 0,
        voucherIds: [],
        courseImage: "",
        certId: 0,
      });
      setSelectedImage(null);
      setPreviewImage(null);
      setIsModalVisible(false);
      refetchCourses();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating course:", error.response?.data);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectCertChange = (value: number) => {
    setFormData({
      ...formData,
      certId: value,
    });
  };

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log("Selected image file:", file);
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const uploadCloudinary = async () => {
    if (selectedImage) {
      const formUpload = new FormData();
      formUpload.append("api_key", "994636724857583");
      formUpload.append("file", selectedImage);
      formUpload.append("upload_preset", "upload_image");
      formUpload.append("folder", "Course");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/unicert/image/upload",
          formUpload
        );
        console.log("Course upload successfully:", response.data.url);
        return response.data.url;
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  };

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={showModal}
        style={{ maxWidth: "120px" }}
      >
        Course
      </Button>
      <Modal
        title="Create New Course"
        width={900}
        open={isModalVisible}
        onOk={handleOK}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          // initialValues={formData}
        >
          <Form.Item
            label="Course Name"
            name="courseName"
            rules={[
              {
                required: true,
                message: "Please input the course name!",
              },
            ]}
          >
            <Input
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              placeholder="Enter course name"
            />
          </Form.Item>
          <Form.Item
            label="Course Code"
            name="courseCode"
            rules={[
              {
                required: true,
                message: "Please input the course code!",
              },
            ]}
          >
            <Input
              name="courseCode"
              value={formData.courseCode}
              onChange={handleInputChange}
              placeholder="Enter course code"
            />
          </Form.Item>
          <Form.Item
            label="Course Time"
            name="courseTime"
            rules={[
              {
                required: true,
                message: "Please input the course time!",
              },
            ]}
          >
            <Input
              name="courseTime"
              value={formData.courseTime}
              onChange={handleInputChange}
              placeholder="Enter course time"
            />
          </Form.Item>
          <Form.Item
            label="Course Description"
            name="courseDescription"
            rules={[
              {
                required: true,
                message: "Please input the course description!",
              },
            ]}
          >
            {/* <Input
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleInputChange}
              placeholder="Enter course description"
            /> */}
            <MyEditor
              value={formData.courseDescription}
              onChange={(content) =>
                setFormData({ ...formData, courseDescription: content })
              }
            />
          </Form.Item>
          <Form.Item
            label="Fee"
            name="courseFee"
            rules={[
              {
                required: true,
                message: "Please input the course fee!",
              },
            ]}
          >
            <InputNumber
              name="courseFee"
              value={formData.courseFee}
              onChange={(value) =>
                setFormData({ ...formData, courseFee: value ?? 0 })
              }
              placeholder="Enter course fee"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Certification"
            name="certId"
            rules={[
              {
                required: true,
                message: "Please input the certification!",
              },
            ]}
          >
            <Select
              placeholder="Select Certification"
              onChange={handleSelectCertChange}
              style={{ width: "100%" }}
              value={formData.certId}
            >
              {certificate.map((cert) => (
                <Select.Option
                  key={cert.certId}
                  value={cert.certId}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{cert.certName}</span>
                    <span
                      style={{
                        color:
                          cert.permission === "Approve"
                            ? "green"
                            : cert.permission === "Reject"
                            ? "red"
                            : "blue",
                      }}
                    >
                      {cert.permission}
                    </span>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Course Image"
            name="courseImage"
          >
            <img
              src={previewImage || formData.courseImage}
              alt="Current Image"
              className="w-32 h-32 bg-gray-300 mb-4"
            />
            <Input
              name="courseImage"
              type="file"
              onChange={handleImageChange}
              required
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CreateCourse;
