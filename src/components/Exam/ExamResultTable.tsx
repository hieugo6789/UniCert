import { useEffect, useState } from "react";
import { score } from "../../models/score";
import useScoreDetail from "../../hooks/Score/useScoreDetail";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const ExamResultTable = ({props} : any) => {
    const userId = Cookies.get("userId") || 0;
    const examId = useParams().id;
    const [examResults, setExamResults] = useState<score[]>([]);
    const { state, getScoreDetails } = useScoreDetail();

    console.log("Test", props.passingScore)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getScoreDetails(Number(userId), Number(examId));
            } catch (error) {
                console.error("Error fetching exam details:", error);
            }
        };
        fetchData();
    }, [userId, examId]);

    useEffect(() => {
        setExamResults(state);
    }, [state]);

    const averageScore = examResults.length > 0 
        ? (examResults.reduce((acc, cur) => acc + cur.scoreValue, 0) / examResults.length).toFixed(0)
        : null;

    const formatVietnameseDateTime = (utcDate: string) => {
        const date = new Date(utcDate);        
        const vietnamTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);
        
        return vietnamTime.toLocaleString("vi-VN", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Exam Results</h2>
            <p className="text-lg sm:text-lg font-bold text-center mb-4 text-gray-800 dark:text-gray-100">The minimum score required to pass the exam is {props.passingScore}.</p>
            {averageScore && (
                <div className="text-center mb-6">
                    <p className={`font-semibold text-base sm:text-lg ${Number(averageScore) >= props.passingScore ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                        Average Score: {averageScore}/100
                    </p>
                    {examResults.length > 1 && (
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Based on {examResults.length} attempts
                        </p>
                    )}
                </div>
            )}

            {examResults.length > 0 && (
                <div className={`text-center mb-6 p-3 rounded-lg ${
                    examResults[0].scoreValue >= props.passingScore 
                        ? "bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800" 
                        : "bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                }`}>
                    <p className="font-semibold text-sm sm:text-base">
                        {examResults[0].scoreValue >= props.passingScore 
                            ? "Congratulations! You have passed the exam" 
                            : "You have not passed the exam yet. Keep practicing!"}
                    </p>
                </div>
            )}

            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">#</th>
                            <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Score</th>
                            <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                        {examResults.length > 0 && [...examResults]
                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map((result, index) => (
                                <tr key={index} 
                                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150`}
                                >
                                    <td className="py-3 sm:py-4 px-4 sm:px-6 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                        {examResults.length - index}
                                    </td>
                                    <td className={`py-3 sm:py-4 px-4 sm:px-6 text-center text-xs sm:text-sm font-medium ${
                                        result.scoreValue >= 50 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                    }`}>
                                        {result.scoreValue.toFixed(0)}/100
                                    </td>
                                    <td className="py-3 sm:py-4 px-4 sm:px-6 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                        {formatVietnameseDateTime(result.createdAt)}
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {examResults.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    No exam attempts yet
                </div>
            )}
        </div>
    );
};

export default ExamResultTable;
