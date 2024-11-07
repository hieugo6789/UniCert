import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../components/UI/CustomButton";
import { useCreateScore } from "../../../hooks/Scope/useCreateScope";
import { createScore } from "../../../models/score";
import { useEffect } from "react";
import Cookie from "js-cookie";
const SubmitExamPage = () => {
    // const {} = useScop
    const location = useLocation();
    const navigate = useNavigate();
    const id = Number(useParams().id || 0);

    // Access formattedAnswers from location.state
    const formattedAnswers = location.state?.formattedAnswers || [];
    const { state, handleCreateScore } = useCreateScore();

    const handleSubmitResults = async () => {
        try {
            const sendInput: createScore = {
                userId: Number(Cookie.get("userId")),
                examId: id,
                questionRequests: formattedAnswers
            }
            console.log(sendInput);
            handleCreateScore(sendInput);
            // const createScope = await agent.Scope.submitScope(formattedAnswers);
            // Here, you should handle submitting the formatted answers, for example:
            // await submitExamResults(formattedAnswers);

            alert("Exam results submitted successfully!");
            // navigate("/"); // Redirect after successful submission
        } catch (error) {
            alert("Failed to submit results. Please try again.");
        }
    };
    useEffect(() => {
        if (state.createdExam) {
            console.log(state.createdExam);
            alert("Exam results submitted successfully!");
            navigate("/"); // Redirect after successful submission
        }
    }, [state]);

    console.log("Formatted Answers (JSON):", JSON.stringify(formattedAnswers, null, 2));

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
