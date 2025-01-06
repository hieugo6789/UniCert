import React, { useEffect, useState } from "react";
import agent from "../../../utils/agent";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftOutlined, UserOutlined, MessageOutlined, CalendarOutlined, TrophyOutlined, EyeOutlined, InboxOutlined } from "@ant-design/icons";

const PeerDetailPage: React.FC = () => {
    const scoreId = useParams<{ id: string }>().id;
    const examId = useParams<{ examId: string }>().examId;
    const [peerReviews, setPeerReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const scrollToTop = () => {
          window.scrollTo({
            top: 0,
            behavior: "smooth", // Cuộn mượt mà
          });
        };
        scrollToTop();
      });

    useEffect(() => {
        const fetchPeerReviews = async () => {
            try {
                const response = await agent.peerReview.getPeerReviewByScoreId(Number(scoreId));
                console.log(response);
                setPeerReviews(response); // Assuming response is in the format as described in the question
                setLoading(false);
            } catch (err: any) {
                console.log("Test", err)
                setError(err.response.data.message);
                setLoading(false);
            }
        };

        fetchPeerReviews();
    }, [scoreId]);

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Peer Reviews</h1>
                <Link 
                    to={`/exam/${examId}`} 
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm"
                >
                    <ArrowLeftOutlined /> Back to Exam
                </Link>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 bg-red-50 dark:bg-red-900/30 rounded-lg">
                    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h2>
                    <p className="text-red-500 dark:text-red-300 mb-6">{error}</p>
                    <Link
                        to={`/exam/${examId}`}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                    >
                        Return to Exam
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {peerReviews.map((review) => (
                        <div key={review.peerReviewId} 
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">{review.examName}</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <UserOutlined className="text-gray-400" />
                                        <p className="text-gray-700 dark:text-gray-300">Reviewer: {review.reviewerName}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <MessageOutlined className="text-gray-400 mt-1" />
                                        <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                                            {review.feedbackPeerReviewer || "No feedback provided"}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarOutlined className="text-gray-400" />
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {new Date(new Date(review.reviewDate).getTime() + 7 * 60 * 60 * 1000).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TrophyOutlined className="text-gray-400" />
                                        <p className="text-gray-700 dark:text-gray-300">Max Score: {review.maxQuestionScore}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t dark:border-gray-700">
                                <Link 
                                    to={`/peer/${examId}/${review.peerReviewId}`}
                                    className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                                >
                                    <EyeOutlined /> View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {!loading && !error && peerReviews.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <div className="text-gray-400 mb-4">
                        <InboxOutlined style={{ fontSize: '48px' }} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Reviews Yet</h3>
                    <p className="text-gray-500 dark:text-gray-400">There are no peer reviews available for this exam.</p>
                </div>
            )}
        </div>
    );
};

export default PeerDetailPage;
