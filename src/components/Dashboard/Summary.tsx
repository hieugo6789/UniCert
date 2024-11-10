import useSummaryDashboard from "../../hooks/Dashboard/useSummaryDashboard";

const Summary = () => {
  const { summary, loading } = useSummaryDashboard();

  if (loading) {
    return <p>Loading...</p>; // Display a loading indicator while fetching data
  }

  if (!summary) {
    return <p>No data available.</p>; // Display a message if no summary data is available
  }

  return (
    <div className="flex justify-around items-center bg-gray-50 p-4 rounded-lg shadow">
      <div className="text-center">
        <p className="text-2xl font-semibold">
          {summary.totalCertificates.toLocaleString()}
        </p>
        <p className="text-gray-500">Total Certificates</p>
      </div>
      {/* <div className="border-l border-gray-200 h-8"></div>
      <div className="text-center">
        <p className="text-2xl font-semibold">
          {summary.totalMajor.toLocaleString()}
        </p>
        <p className="text-gray-500">Total Majors</p>
      </div>
      <div className="border-l border-gray-200 h-8"></div>
      <div className="text-center">
        <p className="text-2xl font-semibold">
          {summary.totalJobsPosition.toLocaleString()}
        </p>
        <p className="text-gray-500">Total Jobs</p>
      </div> */}
      <div className="border-l border-gray-200 h-8"></div>
      <div className="text-center">
        <p className="text-2xl font-semibold">
          {summary.totalSimulationExams.toLocaleString()}
        </p>
        <p className="text-gray-500">Total Exams</p>
      </div>
      <div className="border-l border-gray-200 h-8"></div>
      <div className="text-center">
        <p className="text-2xl font-semibold">
          {summary.totalCourses.toLocaleString()}
        </p>
        <p className="text-gray-500">Total Courses</p>
      </div>
      <div className="border-l border-gray-200 h-8"></div>
      <div className="text-center">
        <p className="text-2xl font-semibold">
          {summary.totalStudents.toLocaleString()}
        </p>
        <p className="text-gray-500">Total Students</p>
      </div>
    </div>
  );
};

export default Summary;
