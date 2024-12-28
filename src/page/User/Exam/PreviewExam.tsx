import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import agent from "../../../utils/agent";

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

interface ExamData {
    examId: number;
    userId: number;
    totalScore: number;
    questions: Question[];
}

const PreviewExam = () => {
    const userId = Cookies.get("userId")?.toString() || "";
    const { id: examId, scoreId } = useParams();
    const [examData, setExamData] = useState<ExamData | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchExamData = async () => {
            try {
                const data = await agent.reviewExam.getReviewExam({
                    userId,
                    examId: examId || "",
                    scoreId: scoreId || "",
                });
                setExamData(data);
            } catch (error) {
                console.error("Error fetching exam data:", error);
            }
        };

        fetchExamData();
    }, [userId, examId, scoreId]);

    if (!examData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg font-semibold text-gray-500 animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
            {/* nút back exam fixed */}
            <button
                onClick={() => navigate(`/exam/${examId}`)}
                className="fixed top-24 right-5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
            >
                Back to Exam
            </button>
            <div className="fixed flex top-24 left-5 items-right bg-gray-200 p-5 rounded-xl flex-col justify-center mt-4">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">Legend:</p>
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
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800">
                <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
                    Exam Preview
                </h1>
                <h2 className="text-lg font-semibold text-center mb-6 text-gray-600 dark:text-gray-300">
                    Total Score: <span className="font-bold text-blue-500">{examData.totalScore}</span>
                </h2>

                {examData.questions.map((question, index) => (
                    <div
                        key={question.questionId}
                        className="mb-6 p-5 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700"
                    >
                        <div className="flex justify-between items-center">
                            <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2"> Question {index + 1}</h1>
                            <span className={`text-md font-bold text-gray-600 dark:text-gray-300 mb-2 ${question.isCorrectQuestion ? "text-green-500" : "text-red-500"}`}>
                                Score: {question.scoreValue}
                            </span>
                        </div>
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: question.questionName || "",
                            }}
                        />

                        {/* Multiple Choice Question */}
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
                                            <span
                                                className={`font-medium ${question.userAnswersForChoice.includes(answer.answerId)
                                                    ? "text-black-600"
                                                    : ""
                                                    }`}
                                            >
                                                {answer.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                {question.userAnswersForChoice.length > 0 ? (
                                    <p className="mt-3 text-sm">
                                        <strong>Your Answer:</strong>{" "}
                                        {question.userAnswersForChoice
                                            .map((id) =>
                                                question.systemAnswers.find((answer) => answer.answerId === id)
                                                    ?.text
                                            )
                                            .join(", ")}
                                    </p>
                                ) : (
                                    <p className="mt-3 text-sm text-red-500">No answer selected.</p>
                                )}
                            </div>
                        ) : (
                            // Essay Question
                            <div className="mt-2">
                                <strong>Your Answer:</strong>{" "}
                                <p className="mt-1 italic text-gray-700 dark:text-gray-300">
                                    {question.userAnswerContentForEssay || "No answer provided."}
                                </p>
                            </div>
                        )}
                        <div className="flex justify-between items-center mt-4">

                            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                                Submitted At: {new Date(question.submittedAt).toLocaleString()}
                            </p>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreviewExam;
