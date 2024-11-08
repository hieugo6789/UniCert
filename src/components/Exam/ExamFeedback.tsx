import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { feedbackPagination } from "../../models/feedback";
import useFeedback from "../../hooks/Feedback/useFeedback";
import { useCreateFeedback } from "../../hooks/Feedback/useCreateFeedback";
import useDeleteFeedback from "../../hooks/Feedback/useDeleteFeedback";
import useUpdateFeedback from "../../hooks/Feedback/useUpdateFeedback";
import Cookies from "js-cookie";
import { showToast } from "../../utils/toastUtils";
import axios from "axios";

const ExamFeedback = () => {
    const { state, handleCreateFeedback } = useCreateFeedback();
    const { handleDeleteFeedback } = useDeleteFeedback();
    const { updateFeedbackDetails } = useUpdateFeedback();
    const id = useParams().id || 0;
    const { feedback, refetchFeedbacks } = useFeedback({ examId: Number(id) });

    const [feedbacks, setFeedbacks] = useState<feedbackPagination[]>([]);
    const [editingFeedback, setEditingFeedback] = useState<{ [key: number]: string }>({});
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState<string | null>(null);

    // Refetch feedback when examId changes
    useEffect(() => {
        refetchFeedbacks(Number(id));
    }, [id]);

    useEffect(() => {
        setFeedbacks(feedback);
    }, [feedback]);

    // Handle creating feedback
    const handleSubmitFeedback = async () => {
        const feedbackDescription = (document.getElementById("feedbackDescriptionInput") as HTMLInputElement).value;
        if (selectedImage) {
            const uploadedImageUrl = await uploadCloudinary();
            handleCreateFeedback({
                userId: Cookies.get("userId") || "",
                examId: Number(id),
                feedbackDescription,
                feedbackImage: uploadedImageUrl || "",
                feedbackCreatedAt: new Date(),
            });
        } else {
            handleCreateFeedback({
                userId: Cookies.get("userId") || "",
                examId: Number(id),
                feedbackDescription,
                feedbackImage: "",
                feedbackCreatedAt: new Date(),
            });
        }
    };

    useEffect(() => {
        if (state.createdFeedback) {
            refetchFeedbacks(Number(id));
            showToast("Feedback created successfully", "success");
            (document.getElementById("feedbackDescriptionInput") as HTMLInputElement).value = "";
            setPreviewImage(null);
        }
    }, [state]);

    // Handle editing feedback
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

    // Handle image selection for feedback
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // Upload image to Cloudinary
    const uploadCloudinary = async () => {
        if (selectedImage) {
            const formUpload = new FormData();
            formUpload.append("api_key", "994636724857583");
            formUpload.append("file", selectedImage);
            formUpload.append("upload_preset", "upload_image");
            formUpload.append("folder", "Feedback");

            try {
                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/unicert/image/upload",
                    formUpload
                );
                return response.data.url;
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const handleOpenModal = (imageUrl: string) => {
        setModalImage(imageUrl);
        setIsModalOpen(true);
    };

    // Handle closing the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalImage(null);
    };

    // Close modal if clicked outside
    const handleModalClick = (e: React.MouseEvent) => {
        // Only close modal if clicked outside the modal content area
        if ((e.target as HTMLElement).classList.contains("modal-background")) {
            handleCloseModal();
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold text-center mb-6">Feedback</h1>

            {/* Add New Feedback */}
            <div className="mb-6">
                <label
                    htmlFor="uploadFile1"
                    className="bg-white text-gray-500 font-semibold text-base rounded max-w-full mb-4 h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                        <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                        <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                    </svg>
                    Upload file

                    <input type="file" id="uploadFile1" className="hidden" onChange={handleImageChange} />
                    <p className="text-xs font-medium text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                </label>
                {previewImage && (
                    <div className="mt-4 mb-4">
                        <img src={previewImage} alt="Preview" className="w-1/2 h-auto rounded-lg" onClick={() => handleOpenModal(previewImage)}/>
                    </div>
                )}

                <textarea
                    id="feedbackDescriptionInput"
                    className="w-full p-4 border-2 border-gray-300 rounded-lg"
                    placeholder="Write your feedback here..."
                />

                <button
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-all"
                    onClick={handleSubmitFeedback}
                >
                    Submit
                </button>
            </div>

            {/* Display Feedback */}
            <div className="space-y-4">
                {feedbacks.map((feedback) => (
                    <div key={feedback.feedbackId} className="bg-white rounded-lg shadow p-4 flex items-start space-x-4">
                        <img
                            src={feedback.userDetails.userImage}
                            alt={feedback.userDetails.username}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="font-semibold text-lg">{feedback.userDetails.username}</h2>
                                    <p className="text-sm text-gray-500">
                                        {new Date(feedback.feedbackCreatedAt).toLocaleString("vi", {
                                            timeZone: "Asia/Ho_Chi_Minh",
                                        })}
                                    </p>
                                </div>

                                {feedback.userId === Number(Cookies.get("userId")) && (
                                    <div className="flex space-x-2">
                                        <button
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg flex items-center transition-all"
                                            onClick={() => handleEditFeedback(feedback.feedbackId, feedback.feedbackDescription)}
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M9 11l6 6-6-6z"></path>
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg flex items-center transition-all"
                                            onClick={() => handleDelete(feedback.feedbackId)}
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>

                            {editingFeedback[feedback.feedbackId] ? (
                                <div>
                                    <textarea
                                        value={editingFeedback[feedback.feedbackId]}
                                        onChange={(e) =>
                                            setEditingFeedback({
                                                ...editingFeedback,
                                                [feedback.feedbackId]: e.target.value,
                                            })
                                        }
                                        className="w-full p-4 border-2 border-gray-300 rounded-lg mt-2"
                                    />
                                    <button
                                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
                                        onClick={() => handleUpdateFeedback(feedback.feedbackId)}
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <p className="mt-2">{feedback.feedbackDescription}</p>
                            )}

                            {feedback.feedbackImage && (
                                <div className="mt-4">
                                    <img
                                        src={feedback.feedbackImage}
                                        alt="Feedback Image"
                                        className="w-1/4 h-auto rounded-lg cursor-pointer"
                                        onClick={() => handleOpenModal(feedback.feedbackImage)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <div
                    className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center modal-background"
                    onClick={handleModalClick} 
                >
                    <div className="relative bg-white p-2 rounded-lg max-w-screen-lg">
                        <img src={modalImage || ""} alt="Preview" className="max-w-full max-h-full" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamFeedback;
