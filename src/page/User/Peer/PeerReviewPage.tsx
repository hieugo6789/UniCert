import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import agent from '../../../utils/agent';
import { updatePeerReview } from '../../../models/peerReview';
import Cookies from 'js-cookie';
import { showToast } from '../../../utils/toastUtils';
interface UserAnswer {
    userAnswerId: number;
    questionId: number;
    questionName: string;
    scoreValue: number;
    answerContent: string;
    feedbackForEachQuestion: string | null;
    error?: string; // Thêm trường error cho validation
}

interface PeerReview {
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

const PeerReviewPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { examId } = useParams<{ examId: string }>();
    const [peerReview, setPeerReview] = useState<PeerReview | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const data = await agent.peerReview.getPeerDetailById(Number(id),1);
                const resp = await agent.peerReview.getPeerReviewByScoreId(data.scoreId);
                console.log(resp)
                if (data.reviewedUserId === Number(Cookies.get('userId')) ) {
                    setError('You cannot review your own exam!');
                    return;
                }
                // if (!resp.some((review: any) => review.reviewerId === Number(Cookies.get('userId')))) {
                    setPeerReview(data);
                // } else {
                    // setError('You are reviewed this exam!');
                // }
                console.log(error)
                // setPeerReview(data);
            } catch (error) {
                console.error('Error fetching peer review details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPeerReview((prev) => prev ? { ...prev, feedbackPeerReviewer: e.target.value } : null);
    };

    const handleAnswerChange = (userAnswerId: number, field: keyof UserAnswer, value: string | number) => {
        setPeerReview((prev) => {
            if (!prev) return null;
            const updatedAnswers = prev.userAnswers.map((answer) => {
                if (answer.userAnswerId === userAnswerId) {
                    let error = '';

                    // Validation cho scoreValue
                    if (field === 'scoreValue') {
                        const score = Number(value);
                        if (isNaN(score) || score < 0) {
                            error = 'Score cannot be negative.';
                        } else if (score > prev.maxQuestionScore) {
                            error = `Score cannot exceed ${prev.maxQuestionScore}.`;
                        }
                    }

                    return { ...answer, [field]: value, error };
                }
                return answer;
            });
            return { ...prev, userAnswers: updatedAnswers };
        });
    };
    const handleSubmit = async () => {
        if (!peerReview) return;

        const hasError = peerReview.userAnswers.some((answer) => answer.error);
        if (hasError) {
            showToast('Please fix the errors before submitting.','error');
            return;
        }

        const payload: updatePeerReview = {
            reviewerId: Cookies.get('userId') ? Number(Cookies.get('userId')) : 0,
            // scorePeerReviewer: peerReview.scorePeerReviewer,
            feedbackPeerReviewer: peerReview.feedbackPeerReviewer,
            peerReviewQuestionScores: peerReview.userAnswers.length > 0
                ? [{
                    questionId: peerReview.userAnswers[0].questionId,
                    userAnswerId: peerReview.userAnswers[0].userAnswerId,
                    feedBackForQuestion: peerReview.userAnswers[0].feedbackForEachQuestion || '',
                    scoreForQuestion: peerReview.userAnswers[0].scoreValue
                }]
                : [{
                    questionId: 0,
                    userAnswerId: 0,
                    feedBackForQuestion: '',
                    scoreForQuestion: 0
                }]
        };
        console.log(payload)
        try {
            await agent.peerReview.updatePeerDetail(peerReview.peerReviewId, payload);
            navigate("/exam/" + examId);
            showToast('Feedback saved successfully.','success');
        } catch (error) {
            console.error('Error updating peer review:', error);
            showToast('Failed to save feedback.','error');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!peerReview) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Error</h1>
                <p className="text-lg text-red-500">No review availble</p>
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
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Peer Review Details</h1>
            <div className="mb-4">
                <p><strong>Max Question Score:</strong> {peerReview.maxQuestionScore}</p>
            </div>

            {/* Feedback chung cho toàn bài */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Overall Feedback</h2>
                <textarea
                    value={peerReview.feedbackPeerReviewer}
                    onChange={handleFeedbackChange}
                    placeholder="Enter overall feedback"
                    className="w-full p-2 border rounded-md dark:border-gray-700 dark:bg-gray-700"
                    rows={3}
                />
            </div>

            {/* Danh sách câu trả lời */}
            <h2 className="text-xl font-semibold mb-2">User Answers</h2>
            <div>
                {peerReview.userAnswers.map((answer) => (
                    <div key={answer.userAnswerId} className="p-4 mb-4 border rounded-lg dark:border-gray-700">
                        <p>
                            <strong>Question:</strong>{' '}
                            <span dangerouslySetInnerHTML={{ __html: answer.questionName }} />
                        </p>
                        <p><strong>Answer:</strong> {answer.answerContent}</p>
                        <div className="mt-2">
                            <label className="block font-medium">Score:</label>
                            <input
                                type="number"
                                value={answer.scoreValue}
                                onChange={(e) => handleAnswerChange(answer.userAnswerId, 'scoreValue', Number(e.target.value))}
                                max={peerReview.maxQuestionScore}
                                min={0}
                                className="w-full p-2 border rounded-md dark:border-gray-700 dark:bg-gray-700"
                            />
                            {answer.error && (
                                <p className="text-red-500 text-sm mt-1">{answer.error}</p>
                            )}
                        </div>
                        <div className="mt-2">
                            <label className="block font-medium">Feedback:</label>
                            <textarea
                                value={answer.feedbackForEachQuestion || ''}
                                onChange={(e) => handleAnswerChange(answer.userAnswerId, 'feedbackForEachQuestion', e.target.value)}
                                placeholder="Enter feedback for this question"
                                className="w-full p-2 border rounded-md dark:border-gray-700 dark:bg-gray-700"
                                rows={2}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Nút Submit */}
            <div className="mt-6">
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Save Feedback
                </button>
            </div>
        </div>
    );
};

export default PeerReviewPage;
