import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // To get the majorId from URL params
import { allMajorPaginationData } from "../../../models/major";
import useMajorDetail from "../../../hooks/Major/useMajorDetail";
interface certTab {
  certCode: string;
  certDescription: string;
  certId: number;
  certImage: string;
  certName: string;
  typeName: string;
}
const MajorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract majorId from the URL
  const [major, setMajor] = useState<allMajorPaginationData | null>(null);
  const [allCerts, setAllCerts] = useState<certTab[]>([]);

  const { state, getMajorDetails } = useMajorDetail();

  // Fetch Major Details
  useEffect(() => {
    const getMajorDetail = async () => {
      try {
        await getMajorDetails(id);
      } catch (error) {
        console.error("Error fetching major detail:", error);
      }
    };
    getMajorDetail();
  }, [id]);

  // Fetch Job Details associated with the Major
  useEffect(() => {
    const getJob = () => {
      if (state?.currentMajor) {
        setMajor(state.currentMajor);
        setAllCerts(state.currentMajor.certificationDetails);
        console.log("Major", state.currentMajor.certificationDetails);
      }
    };
    getJob();
  }, [state]);

  // Handle filtering by job position
  const handleJobPositionChange = () =>
    // event: React.ChangeEvent<HTMLSelectElement>
    {
      // const selectedJob = event.target.value;
      // if (selectedJob === "all") {
      //   setFilteredCerts(allCerts);
      // } else {
      //   const selectedJobDetail =
      //     jobDetailState.currentJob?.jobPositionId.toString() === selectedJob
      //       ? jobDetailState.currentJob
      //       : null;
      //   if (selectedJobDetail) {
      //     const certIds = selectedJobDetail.certificationDetails || [];
      //     const filteredCerts = certIds
      //       .map((certId) =>
      //         allCerts.find((cert) => cert.certId === certId.certId.toString())
      //       ) // Convert certId to number for comparison
      //       .filter((cert): cert is allCertificationData => !!cert); // Ensure only valid certs are returned
      //     console.log("Test", allCerts);
      //     setFilteredCerts(filteredCerts);
      //   }
      // }
    };

  if (!major) {
    return <div>Major not found.</div>;
  }
  if (!major.jobPositionDetails) {
    return <div>Job Position not found.</div>;
  }

  return (
    <div className="p-6">
      {/* Major Info Section */}
      <div className="bg-purple-500 text-white p-6 rounded-md shadow-md mb-6">
        <h1 className="text-4xl font-bold">{major.majorName}</h1>

        <div className="mt-4">
          <span className="font-semibold">Major Code:</span> {major.majorCode}
        </div>
        <div className="mt-4">
          <span className="font-semibold">Major Description:</span>{" "}
          <div
            dangerouslySetInnerHTML={{
              __html: state.currentMajor.majorDescription || "",
            }}
          />
          {/* {major.majorDescription} */}
        </div>
      </div>

      {/* Filter Section */}
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-6 text-left">
          Certifications for this major
        </h2>
        <div className="relative mb-6 w-full m-auto ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-300 text-white w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="absolute right-3 top-2 text-black">🔍</span>
        </div>
        <div className="flex flex-row items-center">
          <p className="mr-3">Filter by</p>

          <div>
            <label className="sr-only">Job Position</label>
            <select
              id="jobPosition"
              name="jobPosition"
              className="h-full bg-white rounded-md border-0 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              onChange={handleJobPositionChange}
            >
              <option value="all">All Job Positions</option>
              {major.jobPositionDetails.map((job, index) => (
                <option
                  key={index}
                  value={job.jobPositionId.toString()}
                >
                  {job.jobPositionName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      {allCerts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {allCerts.map((cert, index) => (
            <img
              key={index}
              src={cert.certImage}
              alt={cert.certName}
              className="rounded-md shadow-md"
            />
          ))}
        </div>
      ) : (
        <div className="w-1/3 h-1/12 m-auto rounded-xl ">
          <img
            className="w-full rounded-xl shadow"
            src="https://dmf76jm51vpov.cloudfront.net/www2/images/main/2020/webpage/Course-not-Found.jpg"
            alt="course not found"
          />
          <p>
            We can't get course now. Please retry later or back to{" "}
            <Link
              className="text-blue-500"
              to="/"
            >
              {" "}
              HOMEPAGE
            </Link>
          </p>
        </div>
      )}
      <div className="flex justify-center mt-6 gap-4">
        <button className="p-2">◀</button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className="p-2 bg-gray-200 rounded-full"
          >
            {page}
          </button>
        ))}
        <button className="p-2">▶</button>
      </div>
    </div>
  );
};

export default MajorDetailPage;
