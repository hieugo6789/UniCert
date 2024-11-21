import { useParams, useNavigate } from "react-router-dom";
import CustomButton from "../../../components/UI/CustomButton";
import useCourseEnrollmentDetail from "../../../hooks/Enrollment/useCourseEnrollmentDetail";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useCreatePayment } from "../../../hooks/Payment/useCreatePayment";
import { showToast } from "../../../utils/toastUtils";
import Coin from "../../../assets/images/Coin.png";

const CourseEnrollDetailPage = () => {
  const userId = Cookies.get("userId");
  const id = useParams().id;
  const navigate = useNavigate();
  const { state, getCourseEnrollmentDetails } = useCourseEnrollmentDetail();
  const { handleCreatePayment } = useCreatePayment();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (id) {
      getCourseEnrollmentDetails(Number(id));
    }
  }, [id]);

  const handlePayment = async () => {
    if (!state.currentCourseEnrollment?.courseEnrollmentId || !userId) {
      showToast("Invalid enrollment information", "error");
      return;
    }

    setIsProcessing(true);
    try {
      await handleCreatePayment({
        userId: userId,
        examEnrollmentId: 0,
        courseEnrollmentId: state.currentCourseEnrollment.courseEnrollmentId,
      });

      await getCourseEnrollmentDetails(Number(id));

      showToast("Payment completed successfully", "success");
    } catch (error: any) {
      showToast(
        error.message || "Payment failed. Please try again later",
        "error"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    scrollToTop();
  }, []);

  if (!state.currentCourseEnrollment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">
                Enrollment Details
              </h1>
              <span className="text-blue-100">
                Enroll Code: {state.currentCourseEnrollment?.enrollCode}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Status and Date */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <p className="text-gray-600">Enrollment Date</p>
                <p className="font-semibold">
                  {new Date(
                    state.currentCourseEnrollment.courseEnrollmentDate
                  ).toLocaleDateString()}
                </p>
              </div>
              <div
                className={`px-4 py-2 rounded-full font-medium
                ${
                  state.currentCourseEnrollment.courseEnrollmentStatus ===
                  "Completed"
                    ? "bg-green-100 text-green-800"
                    : state.currentCourseEnrollment.courseEnrollmentStatus ===
                      "OnGoing"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {state.currentCourseEnrollment.courseEnrollmentStatus}
              </div>
            </div>

            {/* Course List */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Enrolled Courses
              </h2>
              <div className="space-y-4">
                {state.currentCourseEnrollment.courseDetails?.map(
                  (course: any) => (
                    <div
                      key={course.courseId}
                      className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors duration-200"
                    >
                      <img
                        src={course.courseImage}
                        alt={course.courseName}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">
                          {course.courseName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {course.courseCode}
                        </p>
                      </div>
                      <div className="text-right">
                        {course.courseDiscountFee !== course.courseFee && (
                          <span className="text-sm text-gray-500 line-through flex items-center">
                            ${course.courseFee}
                            <img
                              src={Coin}
                              alt="coin"
                              className="h-5 w-5"
                            />
                          </span>
                        )}
                        <span className="font-semibold text-blue-600 flex items-center">
                          ${course.courseDiscountFee}
                          <img
                            src={Coin}
                            alt="coin"
                            className="h-5 w-5"
                          />
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Price Summary */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                  {state.currentCourseEnrollment.totalPrice}
                  <img
                    src={Coin}
                    alt="coin"
                    className="h-5 w-5"
                  />
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
              {state.currentCourseEnrollment.courseEnrollmentStatus ===
                "OnGoing" && (
                <CustomButton
                  label={isProcessing ? "Processing..." : "Complete Payment"}
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={`px-6 py-2 text-white rounded-lg ${
                    isProcessing
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                />
              )}
              <CustomButton
                label="Back to History"
                onClick={() => navigate(`/history/${userId}`)}
                disabled={isProcessing}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollDetailPage;
