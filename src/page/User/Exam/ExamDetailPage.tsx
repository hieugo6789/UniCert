import { useEffect, useState } from 'react';
import ExamFeedback from '../../../components/Exam/ExamFeedback';
import useExamDetail from '../../../hooks/SimulationExam/useExamDetail';
import useExamEnrollment from '../../../hooks/Enrollment/useExam';
import { useNavigate, useParams } from 'react-router-dom';
import coin from '../../../assets/images/Coin.png';
import CustomButton from '../../../components/UI/CustomButton';
import ExamResultTable from '../../../components/Exam/ExamResultTable';
import Cookies from 'js-cookie';
import { showToast } from '../../../utils/toastUtils';
import AverageRating from '../../../components/Exam/AverageRating';
import usePeerReviewByExamId from '../../../hooks/PeerReview/usePeerReviewByExamId';
import { Modal } from 'antd';
import Loading from '../../../components/UI/Loading';

const ExamDetailPage = () => {
    const id = useParams().id || 0;
    const navigate = useNavigate();
    const userId = Cookies.get("userId");
    const [activeTab, setActiveTab] = useState("Detail");
    const [exam, setExam] = useState<any>(undefined);
    const [isPurchased, setIsPurchased] = useState(true);
    const { state, getExamDetails } = useExamDetail();
    const { examEnrollment, refetchExamEnrollments } = useExamEnrollment({ userId: userId || "" });
    const [peerReviews, setPeerReviews] = useState<any[]>([]);
    const { peerReview, refetchPeerReviews } = usePeerReviewByExamId({examId: Number(id)});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPeerReviewEnabled, setIsPeerReviewEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) {
            showToast("Please login to access this page", "error");
            navigate('/login');
            return;
        }
        refetchExamEnrollments(userId || "");
    }, [userId]);

    useEffect(() => {
        const checkExamPurchase = () => {
            setLoading(true);
            console.log(examEnrollment)
            if (examEnrollment.length==0) return;
            if (!userId) return;
            if(!id) return;
            const purchased = examEnrollment.some(
                (e) => e.examEnrollmentStatus === "Completed" &&
                    e.simulationExamDetail.some(
                        (simExam) => simExam.examId === Number(id)
                    )
            );
            console.log("Test", purchased);
            setIsPurchased(purchased);
            setLoading(false);
        };

        checkExamPurchase();
    }, [userId,id, examEnrollment]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                getExamDetails(Number(id));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching exam details:", error);
                showToast("Error loading exam details", "error");
                setLoading(false);
            } 
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        setExam(state.currentExam);
        
    }, [state]);

    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        };
        scrollToTop();
    }, []);

    const handleFetchPeerReviews = async () => {
        setLoading(true);
        try {
            
            await refetchPeerReviews();  
            //   lọc peerReview có reviewdUserId trùng với userId ra khỏi danh sách
            const per = peerReview.filter((review) => review.reviewedUserId !== Number(userId));

            setPeerReviews(per);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching peer reviews:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleReviewClick = (reviewId: number) => {
        navigate(`/peer-review/${id}/${reviewId}`);
    };

    const handleScoreChange = (hasPassed: boolean) => {
        setIsPeerReviewEnabled(hasPassed);
    };

    if (!isPurchased) {
        return (
            <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Please Purchase This Exam First</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">You need to purchase this exam before you can access its details.</p>
                    <button
                        onClick={() => navigate("/certificate")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">{exam?.examName}</h1>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg group">
                        <img
                            src={exam?.examImage || 'https://img.idesign.vn/2018/10/23/id-loading-1.gif'}
                            alt={exam?.examName || 'Exam Thumbnail'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>
                <div className="w-full md:w-2/3 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3 bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur px-4 py-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors duration-300 shadow-sm">
                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300 whitespace-nowrap">Duration:</span>
                            <span className="font-medium text-blue-600 dark:text-blue-400 ml-auto">{exam?.duration || "..." } minutes</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50/80 dark:bg-green-900/30 backdrop-blur px-4 py-3 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors duration-300 shadow-sm">
                            <svg className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300 whitespace-nowrap">Questions:</span>
                            <span className="font-medium text-green-600 dark:text-green-400 ml-auto">{exam?.questionCount || 0}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-yellow-50/80 dark:bg-yellow-900/30 backdrop-blur px-4 py-3 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/50 transition-colors duration-300 shadow-sm">
                            <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300 whitespace-nowrap">Fee:</span>
                            <span className="font-medium text-yellow-600 dark:text-yellow-400 ml-auto">{exam?.examDiscountFee || "..."}</span>
                            <img src={coin} alt="Coin" className="w-6 h-6 animate-bounce" />
                        </div>
                        <AverageRating examId={exam?.examId} />
                    </div>

                    <div className="bg-gray-50/50 dark:bg-gray-700/50 rounded-lg p-4">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{exam?.examDescription}</p>
                    </div>

                    <div className="flex gap-4">
                        <CustomButton
                            label='Start Exam'
                            disabled={!isPurchased}
                            onClick={() => navigate("./simulation")}
                            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-3"
                        >
                            <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Start Exam
                        </CustomButton>

                        <div className="relative group">
                            <CustomButton
                                onClick={handleFetchPeerReviews}
                                disabled={!isPeerReviewEnabled && !isPurchased}
                                className={`w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-3 ${!isPeerReviewEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Peer Reviews
                            </CustomButton>
                            {!isPeerReviewEnabled && (
                                <div className="ml-2 absolute hidden group-hover:block bg-gradient-to-r bg-indigo-500 text-white text-sm rounded-lg px-4 py-2 w-full left-full top-1/2 transform -translate-y-1/2 translate-x-2 shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 z-10">
                                    You didn't pass this exam.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    {["Detail", "Feedback"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 p-4 text-center font-semibold transition-all duration-300
                                ${activeTab === tab
                                    ? "border-b-4 border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-900/30 backdrop-blur"
                                    : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-50/70 dark:hover:bg-gray-700/30"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="p-6">
                    {activeTab === "Detail" && (
                        <div className="space-y-8 animate-fadeIn">
                            <ExamResultTable props={exam} onScoreChange={handleScoreChange} />
                        </div>
                    )}
                    {activeTab === "Feedback" && (
                        <div className="animate-fadeIn">
                            <ExamFeedback />
                        </div>
                    )}
                </div>
            </div>            

            <Modal
                title="Peer Reviews"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <ul>
                    {peerReviews.map((review) => (
                        <li key={review.peerReviewId} className="mb-2">
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
                                <p><strong>Reviewed User:</strong> {review.reviewedUserName}</p>
                                <p><strong>Exam:</strong> {review.examName}</p>
                                <p><strong>Max Question Score:</strong> {review.maxQuestionScore}</p>
                                <button
                                    onClick={() => handleReviewClick(review.peerReviewId)}
                                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out mt-2"
                                >
                                    Peer Review
                                </button>
                            </div>
                        </li>
                    ))} 
                </ul>
                {peerReviews.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    No peer review requests have been submitted yet.
                </div>
            )}
            </Modal>
            {loading && (<Loading />)}
        </div>
    );
};

export default ExamDetailPage;
