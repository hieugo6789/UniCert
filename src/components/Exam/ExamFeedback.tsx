import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { feedbackPagination } from "../../models/feedback";
import useFeedback from "../../hooks/Feedback/useFeedback";
import { useCreateFeedback } from "../../hooks/Feedback/useCreateFeedback";
import useDeleteFeedback from "../../hooks/Feedback/useDeleteFeedback";
import useUpdateFeedback from "../../hooks/Feedback/useUpdateFeedback";
import Cookies from "js-cookie";
import { showToast } from "../../utils/toastUtils";
import DefaultImage from "../../assets/images/Avatar/DefaultAvatar.jpg";
import axios from "axios";
import { FaStar } from 'react-icons/fa';

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
    const [rating, setRating] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [editRating, setEditRating] = useState(0);
    const [isRated, setIsRated] = useState(false);

    // Refetch feedback when examId changes
    useEffect(() => {
        refetchFeedbacks(Number(id));
    }, [id]);

    useEffect(() => {
        if (feedback.length > 0) {
            const approvedFeedbacks = feedback.filter(f => f.feedbackPermission === true);
            setFeedbacks(approvedFeedbacks);
    
            // Kiểm tra nếu có bất kỳ feedback nào của user hiện tại có feedbackRatingvalue > 0
            const hasRated = approvedFeedbacks.some(
                f => f.userId === Number(Cookies.get("userId")) && f.feedbackRatingvalue > 0
            );
            setIsRated(hasRated);
    
            console.log("Approved feedbacks:", approvedFeedbacks);
            console.log("Is rated:", hasRated);
        }
    }, [feedback]);
    
    const vietnamTime = new Date();
    vietnamTime.setHours(vietnamTime.getHours() + 7);
    // Handle creating feedback
    const handleSubmitFeedback = async () => {
        const feedbackDescription = (document.getElementById("feedbackDescriptionInput") as HTMLInputElement).value.trim();
        const userId = Cookies.get("userId") || "";
        const examId = Number(id);

        // Kiểm tra điều kiện: phải có ít nhất description hoặc rating
        if (!feedbackDescription && (!rating || rating === 0)) {
            showToast("Please provide a description or a rating to submit feedback.", "error");
            return;
        }

        let feedbackImage = "";
        if (selectedImage) {
            feedbackImage = await uploadCloudinary() || "";
        }

        const feedbackData = {
            userId,
            examId,
            feedbackDescription,
            feedbackImage,
            feedbackCreatedAt: vietnamTime,
            feedbackRatingvalue: rating || 0, // Nếu không có rating thì đặt mặc định là 0
        };

        try {
            const response = await handleCreateFeedback(feedbackData);

            console.log("Test", response);
            if (response?.data.feedbackPermission === false) {
                showToast("Your feedback contains inappropriate content and is pending review.", "error");
            } else {
                showToast("Feedback created successfully", "success");
                // kiểm tra trong feedback có feedbackRatingValue khác 0 thì set isRated = true
                if (response?.data.feedbackRatingvalue > 0) {
                    setIsRated(true);
                } else {
                    setIsRated(false);
                }
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            showToast("An error occurred while submitting feedback. Please try again.", "error");
        }
    };


    useEffect(() => {
        if (state.createdFeedback) {
            refetchFeedbacks(Number(id));
            (document.getElementById("feedbackDescriptionInput") as HTMLInputElement).value = "";
            setSelectedImage(null);
            setPreviewImage(null);
            setRating(0);
        }
    }, [state]);

    // Handle editing feedback
    const handleEditFeedback = (
        feedbackId: number,
        feedbackDescription: string,
        feedbackImage: string,
        feedbackRatingvalue: number
    ) => {
        setEditingFeedback((prev) => ({
            ...prev,
            [feedbackId]: feedbackDescription || " ", // Đảm bảo có giá trị rỗng nếu không có description
        }));
        setSelectedImage(null); // Reset selected image
        setPreviewImage(feedbackImage); // Đặt hình ảnh hiện tại nếu có
        setEditRating(feedbackRatingvalue || 0); // Đặt giá trị rating hiện tại hoặc 0
        console.log("Edit rating", feedbackRatingvalue);
        console.log(editingFeedback);
    };
    


    // Handle canceling edit
    const handleCancelEdit = (feedbackId: number) => {
        setEditingFeedback((prev) => {
            const updated = { ...prev };
            delete updated[feedbackId];
            return updated;
        });
        setSelectedImage(null);
        setPreviewImage(null);
        setEditRating(0);
    };

    const handleUpdateFeedback = async (feedbackId: number) => {
        if (editingFeedback[feedbackId] !== undefined) {
            let updatedFeedbackImage = "";

            // If there's a new image selected, upload it to Cloudinary
            if (selectedImage) {
                updatedFeedbackImage = await uploadCloudinary(); // Upload new image
            }

            // Update feedback details including description and the new image (if any)
            const response = await updateFeedbackDetails(feedbackId, {
                feedbackDescription: editingFeedback[feedbackId],
                feedbackImage: updatedFeedbackImage || "", // If no new image, keep it blank
                feedbackRatingvalue: editRating,
            });

            // Clean up editing state and refetch feedback
            setEditingFeedback((prev) => {
                const updated = { ...prev };
                delete updated[feedbackId]; // Remove the edited feedback from the state
                return updated;
            });
            if (response?.data.feedbackPermission == false) {
                showToast("Your feedback contains inappropriate content and is pending review.", "error");
            } else {
                showToast("Feedback updated successfully", "success");
            }
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

    // Handle rating change
    const handleRatingChange = (value: number) => {
        setRating(value);
    };
    const handleEditRatingChange = (value: number) => {
        setEditRating(value);
    }

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
        <div className="p-6 bg-gray-100 dark:bg-gray-800">
            <h1 className="text-3xl font-semibold text-center mb-6 text-gray-900 dark:text-white">Feedback</h1>

            {/* Add New Feedback */}
            <div className="mb-6 max-w-3xl mx-auto">
                {!previewImage ? (
                    <label
                        htmlFor="uploadFile1"
                        className="bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-semibold text-base rounded mb-4 h-32 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 dark:border-gray-600 border-dashed mx-auto font-[sans-serif] hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 mb-2 fill-gray-500 dark:fill-gray-300" viewBox="0 0 32 32">
                            <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                            <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                        </svg>
                        <span className="text-sm">Upload file</span>
                        <input type="file" id="uploadFile1" className="hidden" onChange={handleImageChange} accept="image/*" />
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                    </label>
                ) : (
                    <div className="relative group mb-4">
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg cursor-pointer"
                            onClick={() => handleOpenModal(previewImage)}
                        />
                        <div
                            className="absolute top-2 right-2 bg-red-500 dark:bg-red-600 p-1 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                                setSelectedImage(null);
                                setPreviewImage(null);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                )}
                <div className="px-40">
                    {!isRated && (
                        <div className="flex space-x-3 justify-center mb-2">
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <label key={index} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onChange={() => handleRatingChange(ratingValue)}
                                            className="hidden"
                                        />
                                        <FaStar
                                            size={30}
                                            className="cursor-pointer text-yellow-500 hover:text-yellow-600 transition-all duration-300"
                                            color={ratingValue <= (rating || 0) ? "orange" : "gray"}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                    )}


                </div>
                <textarea
                    id="feedbackDescriptionInput"
                    className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Write your feedback here..."
                    rows={4}
                />

                <button
                    className="mt-4 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-all duration-300 w-full sm:w-auto"
                    onClick={handleSubmitFeedback}
                >
                    Submit Feedback
                </button>
            </div>

            {/* Display Feedback */}
            <div className="space-y-4 max-w-3xl mx-auto">
                {feedbacks.length === 0 && (
                    <p className="text-center text-gray-500 dark:text-gray-400">No feedback yet.</p>
                )}
                {feedbacks.map((feedback) => (
                    <div key={feedback.feedbackId} className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 flex items-start space-x-4">
                        <img
                            src={feedback.userDetails.userImage || DefaultImage}
                            alt={feedback.userDetails.username}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex space-x-3 justify-center mb-2">

                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="font-semibold text-lg text-gray-900 dark:text-white">{feedback.userDetails.username}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(feedback.feedbackCreatedAt).toLocaleString("vi", {
                                            timeZone: "Asia/Ho_Chi_Minh",
                                        })}
                                    </p>

                                </div>

                                {feedback.userId === Number(Cookies.get("userId")) && (
                                    <div className="flex space-x-2">
                                        <button
                                            className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-white py-1 px-3 rounded-lg flex items-center transition-all"
                                            onClick={() => handleEditFeedback(feedback.feedbackId, feedback.feedbackDescription, feedback.feedbackImage || "", feedback.feedbackRatingvalue)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white py-1 px-3 rounded-lg flex items-center transition-all"
                                            onClick={() => handleDelete(feedback.feedbackId)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>

                            {editingFeedback[feedback.feedbackId] ? (
                                <div>
                                    {feedback.feedbackDescription && (
                                        <textarea
                                            value={editingFeedback[feedback.feedbackId]}
                                            onChange={(e) =>
                                                setEditingFeedback({
                                                    ...editingFeedback,
                                                    [feedback.feedbackId]: e.target.value,
                                                })
                                            }
                                            className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg mt-2 resize-none focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            rows={4}
                                        />
                                    )}
                                    {feedback.feedbackRatingvalue > 0 && (
                                        <div className="flex mt-2">
                                            {[...Array(5)].map((_, index) => {
                                                const editValue = index + 1;
                                                return (
                                                    <label key={index}>
                                                        <input
                                                            type="radio"
                                                            name={`rating-${feedback.feedbackId}`}
                                                            value={editValue}
                                                            onClick={() => handleEditRatingChange(editValue)}
                                                            className="hidden"
                                                        />
                                                        <FaStar
                                                            size={30}
                                                            className="cursor-pointer text-yellow-500 hover:text-yellow-600 transition-all duration-300"
                                                            color={editValue <= (editRating || 0) ? "orange" : "gray"}
                                                        />
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}
                                    <div className="mt-4 flex space-x-2">
                                        <button
                                            className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-all"
                                            onClick={() => handleUpdateFeedback(feedback.feedbackId)}
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            className="bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700 text-white py-2 px-6 rounded-lg transition-all"
                                            onClick={() => handleCancelEdit(feedback.feedbackId)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {feedback.feedbackRatingvalue > 0 && (
                                        <div className="flex">
                                            {[...Array(5)].map((_, index) => {
                                                const ratingValue = index + 1;
                                                return (
                                                    <label key={index}>
                                                        <FaStar
                                                            size={30}
                                                            className="cursor-pointer text-yellow-500 hover:text-yellow-600 transition-all duration-300"
                                                            color={ratingValue <= feedback.feedbackRatingvalue ? "orange" : "gray"}
                                                        />
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {feedback.feedbackDescription && (
                                        <p className="mt-2 text-gray-900 dark:text-white">{feedback.feedbackDescription}</p>
                                    )}
                                </>
                            )}


                            {feedback.feedbackImage && !editingFeedback[feedback.feedbackId] && (
                                <div className="mt-4">
                                    <img
                                        src={feedback.feedbackImage}
                                        alt="Feedback Image"
                                        className="w-full sm:w-1/2 h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                        onClick={() => handleOpenModal(feedback.feedbackImage || "")}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 modal-background"
                    onClick={handleModalClick}
                >
                    <div className="relative bg-white dark:bg-gray-800 p-2 rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
                        <img src={modalImage || ""} alt="Preview" className="max-w-full h-auto" />
                        <button
                            className="absolute top-2 right-2 bg-red-500 dark:bg-red-600 text-white p-2 rounded-full hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
                            onClick={handleCloseModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamFeedback;
