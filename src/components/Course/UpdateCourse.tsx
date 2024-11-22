import { useEffect, useState } from "react";
import useUpdateCourse from "../../hooks/Course/useCourseUpdate";
import useCourseDetail from "../../hooks/Course/useCourseDetail";
import { Form, Input, message, Modal, Select } from "antd";
import useCertificate from "../../hooks/Certification/useCertificate";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";

interface UpdateCourseProps {
  courseId: string;
  refetchCourses: () => void;
}

const UpdateCourse: React.FC<UpdateCourseProps> = ({
  courseId,
  refetchCourses,
}) => {
  const [form] = Form.useForm();
  const { updateCourseDetails } = useUpdateCourse();
  const { certificate } = useCertificate();
  const { state: courseDetailState, getCourseDetails } = useCourseDetail();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
    if (courseId) {
      getCourseDetails(courseId);
    }
  };
  useEffect(() => {
    if (courseDetailState.currentCourse) {
      const currentCourse = courseDetailState.currentCourse;
      const Vouchers = Array.isArray(currentCourse.voucherDetails)
        ? currentCourse.voucherDetails.map((vou) => vou.voucherId)
        : [];

      form.setFieldsValue({
        courseName: currentCourse.courseName,
        courseCode: currentCourse.courseCode,
        courseTime: currentCourse.courseTime,
        courseDescription: currentCourse.courseDescription,
        courseFee: currentCourse.courseFee,
        voucherIds: Vouchers,
        courseImage: currentCourse.courseImage,
        certId: currentCourse.certId,
      });
    }
  }, [courseDetailState.currentCourse, courseId, form]);

  const handleUpdate = async () => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue();

      let uploadedImageUrl = formData.courseImage;

      if (selectedImage) {
        uploadedImageUrl = await uploadCloudinary();
        console.log("New uploaded image URL:", uploadedImageUrl);
      }

      const updatedFormData = {
        ...formData,
        courseImage: uploadedImageUrl,
      };

      await updateCourseDetails(courseId, updatedFormData);
      message.success("Course updated successfully!");
      refetchCourses();
      setIsModalVisible(false); // Close modal after success
    } catch (error) {
      message.error("Failed to update the courses.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset the form when closing the modal
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
      <EditOutlined
        onClick={showModal}
        style={{ marginLeft: 12 }}
      />
      <Modal
        title="Update Course"
        open={isModalVisible} // Use modal visibility state
        onOk={handleUpdate}
        onCancel={handleCancel} // Handle cancel button
        okText="Update"
        cancelText="Cancel"
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="courseName"
            rules={[
              { required: true, message: "Please enter the course name" },
            ]}
          >
            <Input placeholder="Enter course name" />
          </Form.Item>
          <Form.Item
            label="Code"
            name="courseCode"
            rules={[
              { required: true, message: "Please enter the Course code" },
            ]}
          >
            <Input placeholder="Enter Course code" />
          </Form.Item>
          <Form.Item
            label="Time"
            name="courseTime"
            rules={[
              {
                required: true,
                message: "Please enter the Course time",
              },
            ]}
          >
            <Input placeholder="Enter Course time" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="courseDescription"
            rules={[
              {
                required: true,
                message: "Please enter the Course description",
              },
            ]}
          >
            <Input placeholder="Enter Course description" />
          </Form.Item>
          <Form.Item
            label="Fee"
            name="courseFee"
            rules={[
              {
                required: true,
                message: "Please enter the Course fee",
              },
            ]}
          >
            <Input placeholder="Enter Course fee" />
          </Form.Item>

          {/* <Form.Item
            label="Description"
            name="jobPositionDescription"
            rules={[
              {
                required: true,
                message: "Please enter the Job position description",
              },
            ]}
          >
            <MyEditor
              value={form.getFieldValue("jobPositionDescription")}
              onChange={(content) =>
                form.setFieldsValue({ jobPositionDescription: content })
              }
            />
          </Form.Item> */}
          <Form.Item
            label="Certification"
            name="certId"
          >
            <Select
              placeholder="Select Certification"
              style={{ width: "100%" }}
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
            label="Image"
            name="courseImage"
          >
            <img
              src={previewImage || courseDetailState.currentCourse.courseImage}
              alt="Current Image"
              className="w-32 h-32 bg-gray-300 mb-4"
            />
            <Input
              placeholder="Image"
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
export default UpdateCourse;
