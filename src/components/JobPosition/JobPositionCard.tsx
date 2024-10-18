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
            className="bg-violet-100 shadow-lg rounded-lg text-white p-4 text-left hover:bg-gray-200 cursor-pointer duration-300 ease-in-out hover:scale-105"
            onClick={() => navigate("/job/" + job.jobPositionId)}
        >
            <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-800">{job.jobPositionName}</h2>
                {/* <p className="text-sm text-gray-600">{job.jobPositionDescription}</p> */}
                <div
                    className="prose list-disc whitespace-pre-wrap text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: job.jobPositionDescription || "" }}
                />
                <h1 className="text-black">
                    Major:
                    {job.majorDetails.length.toString() === "0" ? (
                        " No major."
                    ) : (
                        job.majorDetails
                            .map((major, index) => (
                                <span
                                    key={major.majorId}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate("/major/" + major.majorId);
                                    }}
                                >
                                    {" " + major.majorName}
                                    {index < job.majorDetails.length - 1 ? ", " : "."}
                                </span>
                            ))
                    )}
                </h1>
            </div>
        </div>


    );
};

export default JobPositionCard;
