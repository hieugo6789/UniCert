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
    <div className="w-full mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-8">Review Detail</h1>
      <div className="fixed flex top-24 left-5 items-right bg-gray-200 p-5 rounded-xl flex-col justify-center mt-4">
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">Note:</p>
        <div className="flex items-center mr-4">
          <div className="w-4 h-4 bg-green-100 rounded-md mr-2"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Correct Answer</span>
        </div>
        <div className="flex items-center mr-4">
          <div className="w-4 h-4 bg-green-100 border-l-4 border-green-500 rounded-md mr-2"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Your Correct Answer</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-300 border-l-4 border-red-500 rounded-md mr-2"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Your Incorrect Answer</span>
        </div>
      </div>
      {/* back button */}
      <Link to={`/peer-detail/${examId}/${peerReviewDetail?.scoreId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-6 fixed right-10 top-24">
        Back
      </Link>
      {/* {peerReviewDetail && (
        <div className="bg-white shadow-2xl rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">General Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <p><strong className="text-gray-800">Feedback:</strong> {peerReviewDetail.feedbackPeerReviewer}</p>
            <p><strong className="text-gray-800">Review Date:</strong> {new Date(peerReviewDetail.reviewDate).toLocaleString()}</p>
            <p><strong className="text-gray-800">Score:</strong> {peerReviewDetail.scorePeerReviewer}</p>
            <p><strong className="text-gray-800">Max Question Score:</strong> {peerReviewDetail.maxQuestionScore}</p>
          </div>
        </div>
      )} */}

      {/* <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">Peers Detail</h2> */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800">
        {/* {peerReviewDetail?.userAnswers.map((answer) => (
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
        ))} */}

        {questions.map((question, index) => {
          const userAnswerFeedback = peerReviewDetail?.userAnswers.find(
            (userAnswer) => userAnswer.questionId === question.questionId
          );

          return (
            <div
              key={question.questionId}
              className="mb-6 p-5 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2"> Question {index + 1}</h1>
                <span className={`text-md font-bold ${question.isCorrectQuestion || question.scoreValue > 0 ? "text-green-500" : "text-red-500"}`}>
                  Score: {question.scoreValue}
                </span>
              </div>
              <div
                className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: question.questionName || "",
                }}
              />

              {question.questionType.toLowerCase() === "choice" ? (
                <div>
                  <ul className="space-y-2">
                    {question.systemAnswers.map((answer) => (
                      <li
                        key={answer.answerId}
                        className={`p-2 rounded-md ${answer.isCorrect && question.userAnswersForChoice.includes(answer.answerId)
                          ? "bg-green-100 border-l-4 border-green-500 text-green-700"
                          : answer.isCorrect
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-800 dark:bg-gray-600"
                          } 
                                ${question.userAnswersForChoice.includes(answer.answerId) && !answer.isCorrect
                            ? "bg-red-300 border-l-4 border-red-500 text-red-700"
                            : ""}`}
                      >
                        <span>{answer.text}</span>
                      </li>
                    ))}
                  </ul>
                  {question.userAnswersForChoice.length > 0 ? (
                    <p className="mt-3 text-sm">
                      <strong>Your Answer:</strong>{" "}
                      {question.userAnswersForChoice
                        .map((id) =>
                          question.systemAnswers.find((answer) => answer.answerId === id)?.text
                        )
                        .join(", ")}
                    </p>
                  ) : (
                    <p className="mt-3 text-sm text-red-500">No answer selected.</p>
                  )}
                </div>
              ) : (
                <div className="mt-2">
                  <strong>Your Answer:</strong>{" "}
                  <p className="mt-1 italic text-gray-700 dark:text-gray-300">
                    {question.userAnswerContentForEssay || "No answer provided."}
                  </p>
                </div>
              )}

              {userAnswerFeedback && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-300 rounded-md">
                  <strong>Feedback:</strong>{" "}
                  <p className="italic text-blue-700">{userAnswerFeedback.feedbackForEachQuestion}</p>
                </div>
              )}

              <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Submitted At: {new Date(question.submittedAt).toLocaleString()}
              </p>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default Peer;
