import React, { useEffect, useState } from "react";
import agent from "../../../utils/agent";
import { Link, useParams } from "react-router-dom";

const PeerDetailPage: React.FC = () => {
    const scoreId = useParams<{ id: string }>().id;
    const examId = useParams<{ examId: string }>().examId;
    const [peerReviews, setPeerReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Error</h1>
                <p className="text-lg text-red-500">{error}</p>
                <Link
                    to={`/exam/${examId}`}
                    className="mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                >
                    Back
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6 text-center">PEER REVIEWS</h1>
            {/* back button */}
            <Link to={`/exam/${examId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-6 fixed right-10 top-24">
                Back
            </Link>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {peerReviews.map((review) => (
                    <div key={review.peerReviewId} className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-blue-500">{review.examName}</h2>
                        <p className="mt-2 text-gray-600">Reviewer: {review.reviewerName}</p>
                        <p className="mt-2 text-gray-500">Feedback: {review.feedbackPeerReviewer}</p>
                        <p className="mt-2 text-gray-400">Review Date: {new Date(review.reviewDate).toLocaleString()}</p>
                        <p className="mt-2 text-gray-500">Score: {review.scorePeerReviewer}</p>
                        <p className="mt-2 text-gray-500">Max Question Score: {review.maxQuestionScore}</p>

                        <div className="mt-4">
                            <Link to={`/peer/${examId}/${review.peerReviewId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PeerDetailPage;
