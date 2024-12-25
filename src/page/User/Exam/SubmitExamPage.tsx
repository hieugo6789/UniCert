import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../components/UI/CustomButton";
import { createScore } from "../../../models/score";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useCreateScore } from "../../../hooks/Score/useCreateScore";

type Answer = {
    questionId: number;
    userAnswerId: number[];
    essayAnswer?: string;
};

const SubmitExamPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = Number(useParams().id || 0);

    useEffect(() => {
        if (!location.state?.formattedAnswers) {
            console.log(formattedAnswers)
            navigate(`/exam/${id}/simulation`);
        }
    }, [location.state, id, navigate]);

    const formattedAnswers: Answer[] = location.state?.formattedAnswers || [];
    const timeLeft: number = location.state?.timeLeft || 0;
    const { state, handleCreateScore, clearCreateScore } = useCreateScore();
    const [currentTimeLeft, setCurrentTimeLeft] = useState(timeLeft);

    useEffect(() => {
        if (currentTimeLeft === 0) {
            handleSubmitResults();
            return;
        }

        const countdown = setInterval(() => {
            setCurrentTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(countdown);
    }, [currentTimeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    const handleSubmitResults = async () => {
        try {
            
            const sendInput: createScore = {
                userId: Number(Cookie.get("userId") || 0),
                examId: id,
                questionRequests: formattedAnswers.map((answer: Answer) => ({
                    questionId: answer.questionId,
                    userAnswerId: answer.userAnswerId.length>0 ? answer.userAnswerId : answer.essayAnswer? [] : [0],
                    userAnswerText: answer.essayAnswer || "",
                    questionType: answer.essayAnswer ? 2 : 1
                }))
            };
            console.log(sendInput)

            await handleCreateScore(sendInput);
        } catch (error) {
            console.error("Error submitting exam results:", error);
            alert("Failed to submit results. Please try again.");
        }
    };

    useEffect(() => {
        if (state.createdScore) {
            console.log(state.createdScore);
            navigate("/exam/"+id+"/simulation/result", { state: state.createdScore });
            clearCreateScore();
        }
    }, [state, navigate]);

    const isUnanswered = (answer: Answer) => {
        if (answer.essayAnswer !== undefined) {
            return !answer.essayAnswer || answer.essayAnswer.trim() === '';
        }
        return !answer.userAnswerId || 
               answer.userAnswerId.length === 0 || 
               (answer.userAnswerId.length === 1 && answer.userAnswerId[0] === 0);
    };

    const handleBackToExam = () => {
        navigate("/exam/" + id + "/simulation", { 
            state: { 
                formattedAnswers: formattedAnswers, 
                timeLeft: currentTimeLeft 
            } 
        });
    };    

    if (!location.state?.formattedAnswers) {
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 dark:from-gray-900 to-white dark:to-gray-800">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-lg w-full mx-4">
                <div className="text-center">
                    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-4 mb-6 border border-gray-100 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Time Remaining</h3>
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                            {formatTime(currentTimeLeft)}
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Submit Your Exam</h2>
                    <div className="w-16 h-1 bg-blue-500 dark:bg-blue-400 mx-auto mb-8"></div>
                    
                    {formattedAnswers.some(isUnanswered) && (
                        <div className="bg-orange-50 dark:bg-orange-900/30 border-l-4 border-orange-400 rounded-lg p-6 mb-6 text-left shadow-sm">
                            <div className="flex items-center mb-3">
                                <svg className="w-6 h-6 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <p className="text-lg font-semibold text-orange-800 dark:text-orange-200">Unanswered Questions</p>
                            </div>
                            <div className="grid grid-cols-4 gap-2 ml-8">
                                {formattedAnswers.map((answer, index) => (
                                    isUnanswered(answer) && (
                                        <span 
                                            key={index} 
                                            className="inline-flex items-center justify-center px-3 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-200 rounded-full text-sm font-medium hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors duration-200 cursor-pointer"
                                            onClick={() => handleBackToExam()}
                                        >
                                            Q.{index + 1}
                                        </span>
                                    )
                                ))}
                            </div>
                            <p className="text-orange-600 dark:text-orange-300 text-sm mt-3 ml-8">
                                You can still submit, but consider reviewing these questions first.
                            </p>
                        </div>
                    )}

                    <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-8">
                        <p className="text-gray-700 dark:text-gray-200 text-lg">
                            Are you sure you want to submit your answers? 
                            <br/>
                            <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">
                                Please note that this action cannot be undone.
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <CustomButton 
                            onClick={handleBackToExam}
                            label="Return to Exam"
                            className="px-8 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-black dark:text-white rounded-lg font-medium transition-colors duration-200"
                            variant="secondary"
                        />
                        <CustomButton
                            onClick={handleSubmitResults}
                            label="Submit Exam"
                            className="px-8 py-3 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitExamPage;
