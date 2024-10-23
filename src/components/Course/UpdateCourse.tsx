import { useEffect, useState } from "react";
import useUpdateCourse from "../../hooks/Course/useCourseUpdate";
import useCourseDetail from "../../hooks/Course/useCourseDetail";
import { Button, Form, Input, message, Modal, Select } from "antd";
import useCertificate from "../../hooks/Certification/useCertificate";
import useVoucher from "../../hooks/Voucher/useVoucher";

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
  const { voucher } = useVoucher();
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
      // Validate fields before submission
      await form.validateFields();
      const formData = form.getFieldsValue();
      await updateCourseDetails(courseId, formData);
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

  return (
    <>
      <Button onClick={showModal}>Edit</Button>
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
          <Form.Item
            label="Vouchers"
            name="voucherIds"
          >
            <Select
              placeholder="Select vouchers"
              style={{ width: "100%" }}
              mode="multiple"
            >
              {voucher
                .filter((v) => v.voucherStatus === true)
                .map((v) => (
                  <Select.Option
                    key={v.voucherId}
                    value={v.voucherId}
                  >
                    {v.voucherName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Image"
            name="courseImage"
            rules={[
              {
                required: true,
                message: "Please enter the Course image",
              },
            ]}
          >
            <Input placeholder="Enter Course image" />
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
                  {cert.certName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateCourse;
