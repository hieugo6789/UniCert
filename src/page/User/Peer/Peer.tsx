import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import agent from "../../../utils/agent";
import { ArrowLeftOutlined } from "@ant-design/icons";

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
interface Question {
  questionId: number;
  questionType: string;
  userAnswersForChoice: number[];
  userAnswerContentForEssay: string | null;
  systemAnswers: { answerId: number; text: string; isCorrect: boolean }[];
  isCorrectQuestion: boolean;
  scoreValue: number;
  submittedAt: string;
  questionName: string;
}
const Peer: React.FC = () => {
  const id = useParams<{ id: string }>().id;
  const examId = useParams<{ examId: string }>().examId;
  const [peerReviewDetail, setPeerReviewDetail] = useState<PeerReviewDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchPeerReviewDetail = async () => {
      try {
        const response = await agent.peerReview.getPeerDetailById(Number(id), 1);
        const data = await agent.peerReview.getPeerDetailById(Number(id), 2);
        setQuestions(data.questionReviews);
        console.log(data)
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
    </div>
  }

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Review Details</h1>
            <Link 
                to={`/peer-detail/${examId}/${peerReviewDetail?.scoreId}`}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm"
            >
                <ArrowLeftOutlined /> Back to Reviews
            </Link>
        </div>        

        <div className="max-w-4xl mx-auto">
            {questions.map((question, index) => {
                if (question.questionType.toLowerCase() !== "essay") return null;
                const userAnswerFeedback = peerReviewDetail?.userAnswers.find(
                    (userAnswer) => userAnswer.questionId === question.questionId
                );

                return (
                    <div key={question.questionId} 
                        className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                    >
                        <div className="p-6 border-b dark:border-gray-700">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    Question {index + 1}
                                </h2>
                                <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                                    question.isCorrectQuestion || question.scoreValue > 0
                                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                                        : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                                }`}>
                                    Score: {question.scoreValue}
                                </span>
                            </div>
                            <div className="prose prose-lg dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: question.questionName || "" }}
                            />
                        </div>

                        <div className="p-6 bg-gray-50 dark:bg-gray-700/50">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Your Answer</h3>
                            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                                {question.userAnswerContentForEssay || "No answer provided."}
                            </p>

                            {userAnswerFeedback && (
                                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                    <h4 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Feedback</h4>
                                    <p className="text-blue-600 dark:text-blue-300">
                                        {userAnswerFeedback.feedbackForEachQuestion}
                                    </p>
                                </div>
                            )}

                            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                Submitted: {new Date(question.submittedAt).toLocaleString()}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
};

export default Peer;
