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
    

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h2 className="text-2xl font-bold mb-4">Submit Exam</h2>
            <p className="mb-6">Are you sure you want to submit your answers?</p>
            <div className="flex gap-4">
                <CustomButton onClick={() => navigate(-1)} label="Go Back" />
                <CustomButton onClick={handleSubmitResults} label="Submit" />
            </div>
        </div>
    );
};

export default SubmitExamPage;
