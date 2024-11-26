import { useState } from "react";
import AvatarAdmin from "../Header/AvatarAdmin";
import Notification from "../Notification/Notification";
import Breadcrumbs from "../UI/Breadcrumb";

const CheckStudentEnrollCode = () => {
  const [enrollCode, setEnrollCode] = useState("");
  const [responseData, setResponseData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckCode = async () => {
    if (!enrollCode) {
      setError("Please enter an enroll code.");
      return;
    }

    setError(null); // Clear previous errors
    setLoading(true);

    try {
      const response = await fetch(
        `https://certificateinformationportal.azurewebsites.net/api/v1/course-enrollment/check_student_enroll/${enrollCode}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch enrollment details.");
      }

      const result = await response.json();
      setResponseData(result.data);
    } catch (err: any) {
      setError(err.message || "An error occurred while checking the code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-[10vh] flex justify-between items-center">
        <div className="ml-10 flex items-center"></div>
        <div className="mr-10 flex items-center">
          <div className="mr-6">
            <Notification />
          </div>
          <AvatarAdmin />
        </div>
      </div>
      <div className="gap-4 p-2 min-h-[90vh]">
        <Breadcrumbs
          items={[
            { label: "Course management", link: "/staff/internalCourses" },
            { label: `Enroll Code` },
          ]}
        />
        <div className="mt-4 flex flex-col items-center">
          <div className="flex items-center gap-4">
            <input
              id="enrollCode"
              type="text"
              className="p-2 border rounded w-72"
              placeholder="Enter code"
              value={enrollCode}
              onChange={(e) => setEnrollCode(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleCheckCode}
              disabled={loading}
            >
              {loading ? "Checking..." : "Check"}
            </button>
          </div>
          {error && (
            <p className="mt-4 text-red-500 font-semibold text-center">
              {error}
            </p>
          )}
          {responseData && (
            <div className="mt-8 p-6 bg-white shadow-lg rounded-lg w-full max-w-xl border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-blue-600">
                Enrollment Details
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong className="font-semibold">Full Name:</strong>{" "}
                  {responseData.fullname}
                </p>
                <p className="text-gray-700">
                  <strong className="font-semibold">Email:</strong>{" "}
                  {responseData.email}
                </p>
                <p className="text-gray-700">
                  <strong className="font-semibold">Phone Number:</strong>{" "}
                  {responseData.phoneNumber}
                </p>
                <p className="text-gray-700">
                  <strong className="font-semibold">Address:</strong>{" "}
                  {responseData.address}
                </p>
              </div>
              <h4 className="mt-6 font-semibold text-lg text-gray-800">
                Courses Enrolled
              </h4>
              <ul className="list-none mt-4">
                {responseData.courseDetails.map(
                  (course: any, index: number) => (
                    <li
                      key={index}
                      className="p-4 bg-gray-100 rounded-lg mb-3 shadow-sm flex items-start gap-4"
                    >
                      <div>
                        <img
                          src={
                            course.courseImage ||
                            "https://via.placeholder.com/100"
                          }
                          alt={course.courseName}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {course.courseName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Code:{" "}
                          <span className="font-medium">
                            {course.courseCode}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Time: {course.courseTime}
                        </p>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckStudentEnrollCode;
