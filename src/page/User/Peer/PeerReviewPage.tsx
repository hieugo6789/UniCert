import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import agent from '../../../utils/agent';
import { updatePeerReview } from '../../../models/peerReview';
import Cookies from 'js-cookie';
import { showToast } from '../../../utils/toastUtils';
import { TrophyOutlined } from '@ant-design/icons';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

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
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const data = await agent.peerReview.getPeerDetailById(Number(id),1);
                console.log("Test sieu cap", data)
                //const resp = await agent.peerReview.getPeerReviewByScoreId(data.scoreId);
                //console.log(resp)
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
        if (isSubmitting) return;
        setIsSubmitting(true);

        const hasError = peerReview.userAnswers.some((answer) => answer.error);
        if (hasError) {
            showToast('Please fix the errors before submitting.','error');
            setIsSubmitting(false);
            return;
        }

        const payload: updatePeerReview = {
            reviewerId: Cookies.get('userId') ? Number(Cookies.get('userId')) : 0,
            feedbackPeerReviewer: peerReview.feedbackPeerReviewer,
            peerReviewQuestionScores: peerReview.userAnswers.map(answer => ({
                questionId: answer.questionId,
                userAnswerId: answer.userAnswerId,
                feedBackForQuestion: answer.feedbackForEachQuestion || '',
                scoreForQuestion: answer.scoreValue
            }))
        };

        try {
            await agent.peerReview.updatePeerDetail(peerReview.peerReviewId, payload);
            showToast('Peer review saved successfully.','success');
            navigate("/exam/" + examId);
        } catch (error: any) {
            console.error('Error updating peer review:', error);
            showToast(`${error?.response?.data?.message || "Unknown error"}`, "error");
        } finally {
            setIsSubmitting(false);
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
        <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Peer Review Form</h1>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <TrophyOutlined />
                        <span>Max Score: {peerReview?.maxQuestionScore}</span>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Overall Feedback</h2>
                    <textarea
                        value={peerReview?.feedbackPeerReviewer}
                        onChange={handleFeedbackChange}
                        placeholder="Enter your overall feedback for this exam..."
                        className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        rows={4}
                    />
                </div>

                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Question Reviews</h2>
                    {peerReview?.userAnswers.map((answer, index) => (
                        <div key={answer.userAnswerId} 
                            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4 border border-gray-200 dark:border-gray-600"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    Question {index + 1}
                                </h3>                                
                            </div>

                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: answer.questionName }} />
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                <p className="font-medium text-gray-700 dark:text-gray-300">Student's Answer:</p>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">{answer.answerContent}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Score (0-{peerReview.maxQuestionScore})
                                    </label>
                                    <input
                                        type="number"  
                                        value={answer.scoreValue}                                      
                                        onChange={(e) => handleAnswerChange(answer.userAnswerId, 'scoreValue', Number(e.target.value))}
                                        max={peerReview.maxQuestionScore}
                                        min={0}                                        
                                        className="w-full p-2 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg"
                                    />
                                    {answer.error && (
                                    <span className="text-red-500 text-sm">{answer.error}</span>
                                )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Feedback
                                    </label>
                                    <textarea
                                        value={answer.feedbackForEachQuestion || ''}
                                        onChange={(e) => handleAnswerChange(answer.userAnswerId, 'feedbackForEachQuestion', e.target.value)}
                                        placeholder="Provide feedback for this answer..."
                                        className="w-full p-2 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-end gap-4">
                    <Link
                        to={`/exam/${examId}`}
                        className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                        Cancel
                    </Link>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        <div className="flex items-center justify-center gap-2">
                            {isSubmitting && <AiOutlineLoading3Quarters className="animate-spin" />}
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </div>                        
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PeerReviewPage;
