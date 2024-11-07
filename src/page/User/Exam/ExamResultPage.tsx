import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../../../components/UI/CustomButton";

const ExamResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Nhận dữ liệu từ `state`
    const { scoreId, examId, scoreValue, userId, createdAt } = location.state || {};
    console.log(scoreId, examId, scoreValue, userId, createdAt);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg text-center w-full max-w-xs">
                <h2 className="text-sm font-semibold bg-blue-700 rounded-full px-4 py-1 mb-4">
                    {scoreValue >= 5 ? "Congratulations!" : "Try again!"}
                </h2>
                <h1 className="text-4xl font-extrabold mb-4">SCORE</h1>
                <p className="text-3xl font-bold mb-4">{scoreValue} / 10</p>
                <div className="flex justify-center items-center space-x-2 mb-4">
                    {/* <span className="text-xl">⭐</span>
                    <span className="text-xl">⭐</span>
                    <span className="text-xl">⭐</span> */}
                    {/* từ 1-10, cứ 2 điểm sẽ được 1 sao, điểm lẻ thì 1 nửa ngôi sao */}
                    {Array.from({ length: 5 }, (_, index) => {
                        const starValue = index * 2 + 1;
                        return (
                            <span key={index} className="text-xl">
                                {scoreValue >= starValue ? "⭐" : scoreValue >= starValue - 1 ? "🌟" : "☆"}
                            </span>
                        );
                    })}
                </div>
                <p className="text-sm mb-6">Date: {new Date(createdAt).toLocaleString("vi")}</p>
                {scoreValue >= 5 ? (
                    <CustomButton onClick={() => navigate("/")} label="Reward" />) : (
                    <CustomButton onClick={() => navigate("/exam/" + examId + "/simulation")} label="Try again" />)}
            </div>
        </div>
    );
};

export default ExamResultPage;
