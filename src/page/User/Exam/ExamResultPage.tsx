import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomButton from "../../../components/UI/CustomButton";
import { useCreateFeedback } from "../../../hooks/Feedback/useCreateFeedback";
import Cookies from "js-cookie";
import { showToast } from "../../../utils/toastUtils";
const ExamResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState("");
    const { state, handleCreateFeedback } = useCreateFeedback();
    const [isLeaveFeedback, setIsLeaveFeedback] = useState(false);

    // Extracting data from `state`
    const { scoreId, examId, scoreValue, userId, createdAt } = location.state || {};
    console.log(scoreId, examId, scoreValue, userId, createdAt);

    const handleFeedbackSubmit = async () => {
        await handleCreateFeedback({
            userId: Cookies.get("userId") || "",
            examId: examId,
            feedbackDescription: (document.getElementById("feedbackDescriptionInput") as HTMLInputElement).value,
            feedbackImage: "",
            feedbackCreatedAt: new Date(),
        }).then(() => {
            setIsLeaveFeedback(true);
        });
    };
    useEffect(() => {
        if (state.createdFeedback) {
            showToast("Feedback created successfully", "success");
            (document.getElementById("feedbackDescriptionInput") as HTMLInputElement)!.value = "";
        }
    }, [state]);

    return (
        <div className="bg-blue-500 w-full h-full text-white p-6 rounded-lg shadow-lg text-center min-h-screen">
            <h2 className="text-sm font-semibold bg-blue-700 rounded-full py-1 mb-4">
                {scoreValue >= 5 ? "Congratulations!" : "Try again!"}
            </h2>
            <h1 className="text-4xl font-extrabold mb-4">SCORE</h1>
            <p className="text-3xl font-bold mb-4">{scoreValue} / 10</p>
            <div className="flex justify-center items-center space-x-2 mb-4">
                {Array.from({ length: 5 }, (_, index) => {
                    const starValue = index * 2 + 1;
                    return (
                        <span key={index} className="text-xl">
                            {scoreValue >= starValue ? "⭐" : scoreValue >= starValue - 1 ? "🌟" : "☆"}
                        </span>
                    );
                })}
            </div>
            <p className="text-sm mb-6">Date: {new Date(createdAt).toLocaleString("vi-VN")}</p>
            {scoreValue >= 5 ? (
                <CustomButton onClick={() => navigate("/")} label="Reward" />
            ) : (
                <CustomButton onClick={() => navigate("/exam/" + examId + "/simulation")} label="Try again" />
            )}
            <CustomButton onClick={() => navigate("/exam/" + examId)} className="ml-2" label="Return to exam page" />

            {!isLeaveFeedback ? (
                <div className="mt-6 w-full">
                    <label htmlFor="uploadFile2"
                        className="bg-white text-gray-500 font-semibold text-base rounded max-w-full mb-4 h-32 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                            <path
                                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                data-original="#000000" />
                            <path
                                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                data-original="#000000" />
                        </svg>
                        Upload file

                        <input type="file" id='uploadFile2' className="hidden" />
                        {/* nếu input đã có file thì hiển thị file */}
                        
                        <p className="text-xs font-medium text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                    </label>
                    <textarea
                        id="feedbackDescriptionInput"
                        className="w-full p-2 rounded border text-black border-gray-300"
                        rows={3}
                        placeholder="Leave your feedback here..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />

                    <CustomButton
                        onClick={handleFeedbackSubmit}
                        label="Submit Feedback"
                        disabled={!feedback.trim()}
                        className="mt-2"
                    />
                </div>) : (
                <p className="text-sm mt-4">Thank you for your feedback!</p>
            )}
        </div>
    );
};

export default ExamResultPage;
