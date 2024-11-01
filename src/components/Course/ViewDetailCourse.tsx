import { Modal, Spin, Descriptions, Tag } from "antd";
import useCourseDetail from "../../hooks/Course/useCourseDetail";
import { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";

interface ViewCourseDetailProps {
  courseId: string;
}

const ViewDetailCourse: React.FC<ViewCourseDetailProps> = ({ courseId }) => {
  const { state, getCourseDetails } = useCourseDetail();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleView = async (courseId: string) => {
    setIsModalVisible(true);
    await getCourseDetails(courseId);
  };

  return (
    <>
      <EyeOutlined
        onClick={() => handleView(courseId)}
        style={{ color: "blue", cursor: "pointer" }}
      />

      <Modal
        width={900}
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentCourse ? (
          <Descriptions
            bordered
            size="middle"
            column={1}
            className="mb-4"
            labelStyle={{ width: "50px", fontWeight: "bold" }}
            contentStyle={{ width: "600px", textAlign: "left" }}
            title={<h3 className="text-2xl text-blue-600">Course Details</h3>}
          >
            <Descriptions.Item label="Image">
              <img
                src={state.currentCourse.courseImage}
                alt="Course"
                className=" object-cover rounded-lg shadow-md mb-4"
              />
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              <span className="text-blue-700">
                {state.currentCourse.courseName}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Code">
              <span className="text-gray-600">
                {state.currentCourse.courseCode}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              <div
                className="prose list-disc whitespace-pre-wrap text-sm"
                dangerouslySetInnerHTML={{
                  __html: state.currentCourse.courseDescription || "",
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Course Time">
              {state.currentCourse.courseTime}
            </Descriptions.Item>
            <Descriptions.Item label="Fee">
              {state.currentCourse.courseFee} $
            </Descriptions.Item>
            <Descriptions.Item label="Discount Fee">
              {state.currentCourse.courseDiscountFee} $
            </Descriptions.Item>
            <Descriptions.Item label="Vouchers">
              {state.currentCourse.voucherDetails?.length ? (
                state.currentCourse.voucherDetails.map((v, index) => (
                  <div
                    key={index}
                    className="mb-2"
                  >
                    <p className="font-semibold text-gray-700">
                      {v.voucherName} - {v.percentage}%
                    </p>
                    <div className="text-sm text-gray-500">
                      {new Date(v.creationDate).toLocaleDateString()} -{" "}
                      {new Date(v.expiryDate).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <span>No vouchers available</span>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Certifications">
              {state.currentCourse.certificationDetails?.length ? (
                state.currentCourse.certificationDetails.map((cert, index) => (
                  <Tag
                    color="blue"
                    key={index}
                    className="mb-1"
                  >
                    {cert.certCode} - {cert.certName}
                  </Tag>
                ))
              ) : (
                <span>No certifications available</span>
              )}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p className="text-center text-gray-500">No details available.</p>
        )}
      </Modal>
    </>
  );
};

export default ViewDetailCourse;
