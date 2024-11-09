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
        <div
            className="bg-white border border-gray-200 shadow-md rounded-xl p-6 text-left 
            hover:shadow-lg cursor-pointer duration-300 ease-in-out hover:scale-[1.02]"
            onClick={() => navigate("/job/" + job.jobPositionId)}
        >
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                        {job.jobPositionName}
                    </h2>
                    <span className="text-sm px-3 py-1 bg-purple-100 text-purple-600 rounded-full">
                        {job.jobPositionCode}
                    </span>
                </div>

                <div className="prose text-sm text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: job.jobPositionDescription || "" }}
                />

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-gray-700 font-medium">Majors:</span>
                    {!job.majorDetails?.length ? (
                        <span className="text-gray-500 italic">No major required</span>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {job.majorDetails?.map((major) => (
                                <span
                                    key={major.majorId}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate("/major/" + major.majorId);
                                    }}
                                    className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full
                                    hover:bg-purple-100 hover:text-purple-600 cursor-pointer"
                                >
                                    {major.majorName}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobPositionCard;
