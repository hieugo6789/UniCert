import { useEffect, useState } from "react";
import { score } from "../../models/score";
import useScoreDetail from "../../hooks/Score/useScoreDetail";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const ExamResultTable = () => {
    const userId = Cookies.get("userId") || 0;
    const examId = useParams().id;
    const [examResults, setExamResults] = useState<score[]>([]);
    const { state, getScoreDetails } = useScoreDetail();

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
        ? (examResults.reduce((acc, cur) => acc + cur.scoreValue, 0) / examResults.length).toFixed(2)
        : null;

    return (
        <div className="bg-white shadow-lg rounded-lg w-full p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Exam Results</h2>

            {averageScore && (
                <div className="text-center mb-6">
                    <p className={`font-semibold text-base sm:text-lg ${Number(averageScore) >= 5 ? "text-green-600" : "text-red-600"}`}>
                        Average Score: {averageScore}/10
                    </p>
                    {examResults.length > 1 && (
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            Based on {examResults.length} attempts
                        </p>
                    )}
                </div>
            )}

            {examResults.length > 0 && (
                <div className={`text-center mb-6 p-3 rounded-lg ${
                    examResults[0].scoreValue >= 5 
                        ? "bg-green-50 text-green-700 border border-green-200" 
                        : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                    <p className="font-semibold text-sm sm:text-base">
                        {examResults[0].scoreValue >= 5 
                            ? "Congratulations! You have passed the exam" 
                            : "You have not passed the exam yet. Keep practicing!"}
                    </p>
                </div>
            )}

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">#</th>
                            <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Score</th>
                            <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {examResults.length > 0 && [...examResults]
                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map((result, index) => (
                                <tr key={index} 
                                    className={`hover:bg-gray-50 transition-colors duration-150`}
                                >
                                    <td className="py-3 sm:py-4 px-4 sm:px-6 text-center text-xs sm:text-sm text-gray-600">
                                        {index + 1}
                                    </td>
                                    <td className={`py-3 sm:py-4 px-4 sm:px-6 text-center text-xs sm:text-sm font-medium ${
                                        result.scoreValue >= 5 ? "text-green-600" : "text-red-600"
                                    }`}>
                                        {result.scoreValue}/10
                                    </td>
                                    <td className="py-3 sm:py-4 px-4 sm:px-6 text-center text-xs sm:text-sm text-gray-600">
                                        {new Date(result.createdAt).toLocaleString("vi", {
                                            timeZone: "Asia/Ho_Chi_Minh",
                                            dateStyle: "medium",
                                            timeStyle: "short"
                                        })}
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {examResults.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
                    No exam attempts yet
                </div>
            )}
        </div>
    );
};

export default ExamResultTable;
