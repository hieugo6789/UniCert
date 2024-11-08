import { useEffect, useState } from 'react';
import ExamFeedback from '../../../components/Exam/ExamFeedback';
import useExamDetail from '../../../hooks/SimulationExam/useExamDetail';
import { useNavigate, useParams } from 'react-router-dom';
import coin from '../../../assets/images/Coin.png';
import CustomButton from '../../../components/UI/CustomButton';
import ExamResultTable from '../../../components/Exam/ExamResultTable';

const ExamDetailPage = () => {
    const id = useParams().id || 0;
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Detail");
    const [exam, setExam] = useState<any>(undefined);
    const { state, getExamDetails } = useExamDetail();

    useEffect(() => {
        const fetchData = async () => {
            try {
                getExamDetails(Number(id));
            } catch (error) {
                console.error("Error fetching exam details:", error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        // console.log(state);
        setExam(state.currentExam);
    }, [state]);
    return (
        <div className=" mx-auto p-6  rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Exam Details</h1>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                    <img src={exam?.examImage} alt="Exam Thumbnail" className="w-full h-full rounded-lg object-cover shadow-md" />
                </div>
                <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-semibold text-gray-800">{exam?.examName}</h2>
                    <p className="mt-4 text-gray-600">{exam?.examDescription}</p>
                    <div className="mt-6 flex items-center gap-2 text-lg font-medium text-gray-800">
                        <span>Fee: {exam?.examFee}</span>
                        <img src={coin} alt="Coin Icon" className="w-6 h-6" />
                    </div>
                    {/* {exam.examPermission === "Approve" && */}
                        <CustomButton label='Start Exam' className='mt-6' onClick={() => navigate("./simulation")} />
                            {/* } */}
                </div>
            </div>

            <div className="mt-10">
                <div className="flex border-b border-gray-200 text-gray-600">
                    {["Detail", "Feedback"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 p-4 text-center font-semibold hover:text-blue-500 transition-colors duration-300 ${activeTab === tab ? "border-b-4 border-blue-500 text-blue-500" : ""
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="p-6">
                    {activeTab === "Detail" && (
                        <div>
                            {/* <p className="text-gray-700 leading-relaxed">{exam?.examDescription}</p> */}
                            {activeTab === "Detail" && (<ExamResultTable />)}
                        </div>
                    )}
                    {activeTab === "Feedback" && <ExamFeedback />}
                </div>
            </div>
        </div>
    );
};

export default ExamDetailPage;
