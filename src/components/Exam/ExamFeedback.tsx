import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { feedbackPagination } from "../../models/feedback";
import useFeedback from "../../hooks/Feedback/useFeedback";
import { useCreateFeedback } from "../../hooks/Feedback/useCreateFeedback";
import Cookies from "js-cookie";
import useDeleteFeedback from "../../hooks/Feedback/useDeleteFeedback";
import useUpdateFeedback from "../../hooks/Feedback/useUpdateFeedback";
import { showToast } from "../../utils/toastUtils";

const ExamFeedback = () => {
    const { state, handleCreateFeedback } = useCreateFeedback();
    const {  handleDeleteFeedback } = useDeleteFeedback();
    const { updateFeedbackDetails } = useUpdateFeedback();

    const id = useParams().id || 0;
    const { feedback, refetchFeedbacks } = useFeedback({ examId: Number(id) });
    const [feedbacks, setFeedbacks] = useState<feedbackPagination[]>([]);
    const [editingFeedback, setEditingFeedback] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        refetchFeedbacks(Number(id));
    }, [id]);

    useEffect(() => {
        setFeedbacks(feedback);
    }, [feedback]);

    const handleSubmitFeedback = async () => {
        handleCreateFeedback({
            userId: Cookies.get("userId") || "",
            examId: Number(id),
            feedbackDescription: (document.getElementById("feedbackDescriptionInput") as HTMLInputElement).value,
            feedbackImage: "",
            feedbackCreatedAt: new Date(),
        })
    };

    useEffect(() => {
        if (state.createdFeedback) {
            refetchFeedbacks(Number(id));
            showToast("Feedback created successfully","success");
            (document.getElementById("feedbackDescriptionInput")as HTMLInputElement)!.value = "";
        }
    }, [state]);
    const handleEditFeedback = (feedbackId: number, feedbackDescription: string) => {
        setEditingFeedback((prev) => ({
            ...prev,
            [feedbackId]: feedbackDescription,
        }));
    };
    

    const handleUpdateFeedback = async (feedbackId: number) => {
        if (editingFeedback[feedbackId] !== undefined) {
            await updateFeedbackDetails(feedbackId, {
                feedbackDescription: editingFeedback[feedbackId],
                feedbackImage: "",
            });
            setEditingFeedback((prev) => {
                const updated = { ...prev };
                delete updated[feedbackId];
                return updated;
            });
            refetchFeedbacks(Number(id));
        }
    };

    const handleDelete = async (feedbackId: number) => {
        await handleDeleteFeedback(feedbackId);
        refetchFeedbacks(Number(id));
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold">Feedback</h1>
            {/* Thêm feedback */}
            <div className="mt-4">
                <textarea id="feedbackDescriptionInput" className="w-full p-4 border-2 border-gray-200 rounded-lg" placeholder="Write your feedback here..." />
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={handleSubmitFeedback}>Submit</button>
            </div>
            <div className="mt-4">
                {feedbacks.map((feedback) => (
                    <div key={feedback.feedbackId} className="border-b-2 border-gray-200 p-4">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">Nguyễn Trung Tín</h2>
                                {editingFeedback[feedback.feedbackId] !== undefined ? (
                                    <div>
                                        <textarea
                                            className="w-full p-2 border-2 border-gray-200 rounded-lg"
                                            value={editingFeedback[feedback.feedbackId]}
                                            onChange={(e) =>
                                                setEditingFeedback((prev) => ({
                                                    ...prev,
                                                    [feedback.feedbackId]: e.target.value,
                                                }))
                                            }
                                        />
                                        <button
                                            className="mt-2 bg-green-500 text-white py-1 px-3 rounded-lg flex items-center"
                                            onClick={() => handleUpdateFeedback(feedback.feedbackId)}
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <p className="ml-6 mt-2">{feedback.feedbackDescription}</p>
                                )}
                            </div>
                            <div>
                                <p>{new Date(feedback.feedbackCreatedAt).toLocaleString()}</p>
                                {feedback.userId === Number(Cookies.get("userId")) && (
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className="bg-yellow-500 text-white py-1 px-3 rounded-lg flex items-center"
                                            onClick={() => handleEditFeedback(feedback.feedbackId, feedback.feedbackDescription)}
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M9 11l6 6-6-6z"></path>
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white py-1 px-3 rounded-lg flex items-center"
                                            onClick={() => handleDelete(feedback.feedbackId)}
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18l12-12M6 6l12 12"></path>
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExamFeedback;
