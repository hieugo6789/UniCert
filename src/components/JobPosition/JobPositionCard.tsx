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
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md rounded-xl p-6 text-left 
            hover:shadow-lg cursor-pointer duration-300 ease-in-out hover:scale-[1.02]"
            onClick={() => navigate("/job/" + job.jobPositionId)}
        >
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 line-clamp-1">
                        {job.jobPositionName}
                    </h2>
                    <span className="text-sm px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full">
                        {job.jobPositionCode}
                    </span>
                </div>

                <div className="prose text-sm text-gray-600 dark:text-gray-400 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: job.jobPositionDescription || "" }}
                />

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Majors:</span>
                    {!job.majorDetails?.length ? (
                        <span className="text-gray-500 dark:text-gray-400 italic">No major required</span>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {job.majorDetails?.map((major) => (
                                <span
                                    key={major.majorId}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate("/major/" + major.majorId);
                                    }}
                                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full
                                    hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:text-purple-600 dark:hover:text-purple-300 cursor-pointer"
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
