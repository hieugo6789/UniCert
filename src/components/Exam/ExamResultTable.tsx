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

    return (
        <div className="bg-white shadow-lg rounded-lg w-full p-4">
            <h2 className="text-2xl font-bold text-center mb-2">Exam Results</h2>

            {examResults.length > 0 && (
                <p className="text-center text-gray-500 mb-2">
                    Average score: {(examResults.reduce((acc, cur) => acc + cur.scoreValue, 0) / examResults.length).toFixed(2)} / 10
                </p>
            )}

            {examResults.length > 0 && examResults[0].scoreValue > 5 ? (
                <p className="text-center text-green-500 font-semibold">You have passed the exam</p>
            ) :
                examResults.length > 0 ?
                    (
                        <p className="text-center text-red-500 font-semibold">You have failed the exam</p>)
                    :
                    (<p className="text-center text-red-500 font-semibold">You have not taken the exam yet</p>)
            }
            <table className="w-full bg-white rounded-xl shadow m-auto">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b-2 border-black text-center">Score ID</th>
                        <th className="py-2 px-4 border-b-2 border-black text-center">Score Value</th>
                        <th className="py-2 px-4 border-b-2 border-black text-center">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {examResults.length > 0 && examResults.map((result) => (
                        <tr key={result.scoreId} className={`${result.scoreValue <= 5 && "bg-red-100"} text-center`}>
                            <td className="py-2 px-4 border-b border-black">{result.scoreId}</td>
                            <td className="py-2 px-4 border-b border-black">{result.scoreValue}</td>
                            <td className="py-2 px-4 border-b border-black">
                                {new Date(result.createdAt).toLocaleString("vi", { timeZone: "Asia/Ho_Chi_Minh" })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExamResultTable;
