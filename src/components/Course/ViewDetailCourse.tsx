import { Button, Modal, Spin, Tag } from "antd";
import useCourseDetail from "../../hooks/Course/useCourseDetail";
import { useState } from "react";

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
      <Button onClick={() => handleView(courseId)}>View</Button>

      <Modal
        title="Course Details"
        width={900}
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentCourse ? (
          <div className="text-lg">
            <div>
              <img src={state.currentCourse.courseImage} />
            </div>
            <p>
              <strong>Name: </strong> {state.currentCourse.courseName}
            </p>
            <p>
              <strong>Code: </strong> {state.currentCourse.courseCode}
            </p>
            <p>
              <strong>Description: </strong>{" "}
              {state.currentCourse.courseDescription}
            </p>
            <p>
              <strong>Course time: </strong> {state.currentCourse.courseTime}
            </p>
            <p>
              <strong>Fee: </strong> {state.currentCourse.courseFee}
            </p>
            <p>
              <strong>Discount fee: </strong>{" "}
              {state.currentCourse.courseDiscountFee}
            </p>
            <p>
              <strong>Voucher: </strong>{" "}
              {state.currentCourse.voucherDetails?.map((v, index) => (
                <div key={index}>
                  <p>{v.voucherName}</p>
                  <div>
                    {
                      <span>
                        {new Date(v.creationDate).toLocaleDateString()}
                      </span>
                    }{" "}
                    -{" "}
                    {<span>{new Date(v.expiryDate).toLocaleDateString()}</span>}
                  </div>
                </div>
              ))}
            </p>

            <p>
              <strong>Certification: </strong>
              {state.currentCourse.certificationDetails?.map((cert, index) => (
                <Tag key={index}>
                  {cert.certCode} - {cert.certName}
                </Tag>
              )) || "No certifications available"}
            </p>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};
export default ViewDetailCourse;
