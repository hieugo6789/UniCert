import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import agent from "../../../utils/agent";

interface UserAnswer {
  userAnswerId: number;
  questionId: number;
  questionName: string;
  scoreValue: number;
  answerContent: string;
  feedbackForEachQuestion: string;
}

interface PeerReviewDetail {
  peerReviewId: number;
  reviewerId: number;
  reviewedUserId: number;
  scoreId: number;
  scorePeerReviewer: number;
  feedbackPeerReviewer: string;
  reviewDate: string;
  maxQuestionScore: number;
  userAnswers: UserAnswer[];
}

const Peer: React.FC = () => {
  const id = useParams<{ id: string }>().id;
    const examId = useParams<{ examId: string }>().examId;
  const [peerReviewDetail, setPeerReviewDetail] = useState<PeerReviewDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeerReviewDetail = async () => {
      try {
        const response = await agent.peerReview.getPeerDetailById(Number(id),1);
        console.log(response)
        setPeerReviewDetail(response); // Assuming response is in the format as described in the question
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch peer review details");
        setLoading(false);
      }
    };

    fetchPeerReviewDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center text-blue-600">Loading...</div>;
  }

  if (error) {
<div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Error</h1>
                <p className="text-lg text-red-500">{error}</p>
                <Link
                    to={`/peer-detail/${examId}/${peerReviewDetail?.scoreId}`}
                    className="mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                >
                    Back
                </Link>
            </div>  }

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-8">Peer Review Detail</h1>
      {/* back button */}
        <Link to={`/peer-detail/${examId}/${peerReviewDetail?.scoreId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-6 fixed right-10 top-24">
            Back
        </Link>
      {peerReviewDetail && (
        <div className="bg-white shadow-2xl rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">General Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <p><strong className="text-gray-800">Feedback:</strong> {peerReviewDetail.feedbackPeerReviewer}</p>
            <p><strong className="text-gray-800">Review Date:</strong> {new Date(peerReviewDetail.reviewDate).toLocaleString()}</p>
            <p><strong className="text-gray-800">Score:</strong> {peerReviewDetail.scorePeerReviewer}</p>
            <p><strong className="text-gray-800">Max Question Score:</strong> {peerReviewDetail.maxQuestionScore}</p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">Peers Detail</h2>
      <div className="space-y-8">
        {peerReviewDetail?.userAnswers.map((answer) => (
          <div key={answer.userAnswerId} className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Question</h3>
            <div
              dangerouslySetInnerHTML={{ __html: answer.questionName }}
              className="text-gray-600 mb-4"
            />
            <p><strong className="text-gray-800">Answer:</strong> {answer.answerContent}</p>
            <p><strong className="text-gray-800">Score:</strong> {answer.scoreValue}</p>
            <p><strong className="text-gray-800">Feedback:</strong> {answer.feedbackForEachQuestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Peer;
