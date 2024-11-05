import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { feedbackPagination } from "../../models/feedback";
import useFeedback from "../../hooks/Feedback/useFeedback";


const ExamFeedback = () => {
    const id = useParams().id || 0;
    const { feedback, refetchFeedbacks } = useFeedback({ examId: Number(id) });
    const [feedbacks, setFeedbacks] = useState<feedbackPagination[]>([]);
    useEffect(() => {
        refetchFeedbacks(Number(id));
    }, [id]);
    useEffect(() => {
        console.log(feedback);
        setFeedbacks(feedback);
    }, [feedback]);
    return (
        <div>
            <h1 className="text-2xl font-semibold">Feedback</h1>
            <div className="mt-4">
                {feedbacks.map((feedback) => (
                    <div key={feedback.examId} className="border-b-2 border-gray-200 p-4">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">Nguyễn Trung Tín</h2>
                                <p className="ml-6 mt-2">{feedback.feedbackDescription}</p>
                            </div>
                            <div>
                                <p>{new Date(feedback.feedbackCreatedAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExamFeedback
