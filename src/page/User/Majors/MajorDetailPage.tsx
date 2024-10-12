import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get the majorId from URL params
import { allMajorPaginationData } from '../../../models/major';
import useMajorDetail from '../../../hooks/useMajorDetail';
import CertificateCard from '../../../components/Certifications/CertificateCard';


const MajorDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Extract majorId from the URL
    const [major, setMajor] = useState<allMajorPaginationData | null>(null);

    const { state, getMajorDetails } = useMajorDetail();

    useEffect(() => {
        const getMajorDetail = async () => {
            try {
                await getMajorDetails(id);
            } catch (error) {
                console.error('Error fetching major detail:', error);
            }
        };
        getMajorDetail();
    }, [id]);
    useEffect(() => {
        if (state) {
            setMajor(state.currentMajor);
            console.log(state.currentMajor);
        }
    }, [state]);
    if (!major) {
        return <div>Major not found.</div>;
    }
    if (!major.jobPositionId) {
        return <div>Job Position not found.</div>;
    }
    const certificates = [
        {
            id: 1,
            certName: 'Certificate 1',
            certDescription: 'Certificate 1 Description',
            certImage: 'https://dmf76jm51vpov.cloudfront.net/www2/images/main/2020/webpage/Course-not-Found.jpg',
            certCost: 100,
            certPointSystem: 'points',
        },
        {
            id: 2,
            certName: 'Certificate 2',
            certDescription: 'Certificate 2 Description',
            certImage: 'https://dmf76jm51vpov.cloudfront.net/www2/images/main/2020/webpage/Course-not-Found.jpg',
            certCost: 200,
            certPointSystem: 'points',
        },
        {
            id: 3,
            certName: 'Certificate 3',
            certDescription: 'Certificate 3 Description',
            certImage: 'https://dmf76jm51vpov.cloudfront.net/www2/images/main/2020/webpage/Course-not-Found.jpg',
            certCost: 300,
            certPointSystem: 'points',
        },
        {
            id: 4,
            certName: 'Certificate 4',
            certDescription: 'Certificate 4 Description',
            certImage: 'https://dmf76jm51vpov.cloudfront.net/www2/images/main/2020/webpage/Course-not-Found.jpg',
            certCost: 400,
            certPointSystem: 'points',
        },
    ]
    return (
        <div className="p-6">
            {/* Major Info Section */}
            <div className="bg-purple-500 text-white p-6 rounded-md shadow-md mb-6">
                <h1 className="text-4xl font-bold">{major.majorName}</h1>

                <div className="mt-4">
                    <span className="font-semibold">Major Code:</span> {major.majorCode}
                </div>
                <div className="mt-4">
                    <span className="font-semibold">Major Description:</span> {major.majorDescription}
                </div>
            </div>
            {/* foreach 1->9 */}
            {/* Filter Section */}
      <div className="p-4 text-center">
        <div className="inline-block flex flex-row items-center">
          <p className="mr-3">Filter by</p>
          <div>
            <label className="sr-only">Currency</label>
            <select id="currency" name="currency" className="h-full bg-white rounded-md border-0 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
              <option>Job Position</option>
              {major.jobPositionId.map((job, index) => (
                <option key={index}>{job}</option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {certificates.map((cert, index) => (
            <CertificateCard
              key={index}
              {...cert}  // Spread certificate details to CertificateCard
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
          <p>We can't get course now. Please retry later or back to <Link className="text-blue-500" to="/"> HOMEPAGE</Link></p>
        </div>
      )}
        </div>
    );
};

export default MajorDetailPage;
