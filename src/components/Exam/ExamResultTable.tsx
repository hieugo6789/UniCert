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
        <div className="bg-white shadow-lg rounded-lg w-full p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Exam Results</h2>

            {averageScore && (
                <div className="text-center mb-6">
                    <p className={`font-semibold text-lg ${Number(averageScore) >= 5 ? "text-green-600" : "text-red-600"}`}>
                        Average Score: {averageScore}/10
                    </p>
                    {examResults.length > 1 && (
                        <p className="text-sm text-gray-600 mt-1">
                            Based on {examResults.length} attempts
                        </p>
                    )}
                </div>
            )}

            {examResults.length > 0 && (
                <div className={`text-center mb-6 p-3 rounded-lg ${
                    examResults[0].scoreValue >= 5 
                        ? "bg-green-50 text-green-700" 
                        : "bg-red-50 text-red-700"
                }`}>
                    <p className="font-semibold">
                        {examResults[0].scoreValue >= 5 
                            ? "Congratulations! You have passed the exam" 
                            : "You have not passed the exam yet. Keep practicing!"}
                    </p>
                </div>
            )}

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-sm font-semibold text-gray-700">Attempt</th>
                            <th className="py-3 px-6 text-sm font-semibold text-gray-700">Score</th>
                            <th className="py-3 px-6 text-sm font-semibold text-gray-700">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {examResults.map((result, index) => (
                            <tr key={result.scoreId} 
                                className={`hover:bg-gray-50 transition-colors duration-150`}
                            >
                                <td className="py-4 px-6 text-center text-sm text-gray-600">
                                    #{examResults.length - index}
                                </td>
                                <td className={`py-4 px-6 text-center font-medium ${
                                    result.scoreValue >= 5 ? "text-green-600" : "text-red-600"
                                }`}>
                                    {result.scoreValue}/10
                                </td>
                                <td className="py-4 px-6 text-center text-sm text-gray-600">
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
                <div className="text-center py-8 text-gray-500">
                    No exam attempts yet
                </div>
            )}
        </div>
    );
};

export default ExamResultTable;
