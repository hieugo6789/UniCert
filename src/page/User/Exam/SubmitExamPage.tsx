import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../components/UI/CustomButton";
import { createScore } from "../../../models/score";
import { useEffect } from "react";
import Cookie from "js-cookie";
import { useCreateScore } from "../../../hooks/Score/useCreateScore";
type Answer = {
    questionId: number;
    userAnswerId: number[];
};

const SubmitExamPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = Number(useParams().id || 0);

    // Định nghĩa kiểu dữ liệu cho formattedAnswers
    const formattedAnswers: Answer[] = location.state?.formattedAnswers || [];
    const timeLeft: number = location.state?.timeLeft || 0;
    const { state, handleCreateScore } = useCreateScore();

    const handleSubmitResults = async () => {
        try {
            const sendInput: createScore = {
                userId: Number(Cookie.get("userId") || 0), // đảm bảo userId có giá trị hợp lệ
                examId: id,
                questionRequests: formattedAnswers.map((answer: Answer) => ({
                    questionId: answer.questionId,
                    userAnswerId: Array.isArray(answer.userAnswerId) ? answer.userAnswerId : [answer.userAnswerId]
                }))
            };

            // console.log(sendInput);
            await handleCreateScore(sendInput); // Đảm bảo chờ xử lý xong trước khi chuyển trang

            alert("Exam results submitted successfully!");
            // navigate("/"); // Uncomment nếu muốn chuyển hướng sau khi gửi thành công
        } catch (error) {
            console.error("Error submitting exam results:", error);
            alert("Failed to submit results. Please try again.");
        }
    };

    useEffect(() => {
        if (state.createdScore) {
            console.log(state.createdScore);
            navigate("/exam/"+id+"/simulation/result", { state: state.createdScore }); // Điều hướng đến trang kết quả
        }
    }, [state, navigate]);
    const handleBackToExam = () => {
        // loại bỏ cách answerId = 0
        const filteredAnswers = formattedAnswers.filter(answer => answer.userAnswerId[0] !== 0);
        navigate("/exam/" + id + "/simulation", { state: { formattedAnswers: filteredAnswers, timeLeft } });
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full mx-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Submit Your Exam</h2>
                    <div className="w-16 h-1 bg-blue-500 mx-auto mb-8"></div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                        <p className="text-gray-700 text-lg">
                            Are you sure you want to submit your answers? 
                            <br/>
                            <span className="text-sm text-gray-500 mt-2 block">
                                Please note that this action cannot be undone.
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <CustomButton 
                            onClick={handleBackToExam}
                            label="Return to Exam"
                            className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200"
                        />
                        <CustomButton
                            onClick={handleSubmitResults}
                            label="Submit Exam"
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitExamPage;
