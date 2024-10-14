import { useNavigate } from "react-router-dom";
import { allJobPaginationData } from "../../models/jobPosition";
// jobPositionId: string;
//   jobPositionCode: string;
//   jobPositionName: string;
//   jobPositionDescription: string;
//   majorId: string[];
//   certId: string[];
const JobPositionCard = ({ job }: { job: allJobPaginationData }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-violet-100 shadow-lg rounded-lg text-white p-4 text-left hover:bg-gray-200 cursor-pointer duration-300 ease-in-out hover:scale-105"
        onClick={()=>navigate("/job/"+job.jobPositionId)}
        >
            <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-800 ">{job.jobPositionName}</h2>
                <p className="text-sm text-gray-600">{job.jobPositionDescription}</p>
                <h1>Major:
                    {job.majorName && job.majorName.length > 0 && (
                        <span className="text-blue-500">
                            {" "+job.majorName.join(", ")}
                        </span>
                    )}

                </h1>
            </div>
        </div>
    );
};

export default JobPositionCard;