import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCreateFeedback } from "../../../hooks/Feedback/useCreateFeedback";
import Cookies from "js-cookie";
import { showToast } from "../../../utils/toastUtils";
import axios from "axios";
import { FaCertificate, FaRedo, FaArrowLeft, FaComment, FaCloudUploadAlt, FaSearch, FaPaperPlane, FaCheckCircle, FaStar } from "react-icons/fa";

const ExamResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState("");
    const { state, handleCreateFeedback } = useCreateFeedback();
    const [isLeaveFeedback, setIsLeaveFeedback] = useState(false);
    const [rating, setRating] = useState(0);

    const { examId, scoreValue, createdAt } = location.state || {};

    const handleFeedbackSubmit = async () => {
        let imageUrl = "";
        if (selectedImage) {
            imageUrl = await uploadCloudinary() || "";
        }
        const vietnamTime = new Date();
        vietnamTime.setHours(vietnamTime.getHours() + 7);
        await handleCreateFeedback({
            userId: Cookies.get("userId") || "",
            examId: examId,
            feedbackDescription: (document.getElementById("feedbackDescriptionInput") as HTMLInputElement).value,
            feedbackImage: imageUrl,
            feedbackCreatedAt: vietnamTime,
            feedbackRatingvalue: rating
        }).then(() => {
            setIsLeaveFeedback(true);
        });
        showToast("Feedback submitted successfully", "success");
    };

    useEffect(() => {
        if (state.createdFeedback) {
            (document.getElementById("feedbackDescriptionInput") as HTMLInputElement)!.value = "";
            setSelectedImage(null);
            setPreviewImage(null);
        }
    }, [state]);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState<string | null>(null);
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

    const formatVietnameseDateTime = (date: string | Date) => {
        const utcDate = new Date(date);
        const vietnamTime = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

        return vietnamTime.toLocaleString("en-US", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };
    const handleRatingChange = (value: number) => {
        setRating(value);
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 dark:from-gray-900 to-white dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    {/* Score Section */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 px-8 py-12 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${scoreValue >= 50
                                    ? "bg-green-500 dark:bg-green-400"
                                    : "bg-yellow-500 dark:bg-yellow-400"
                                }`}>
                                <span className="text-4xl font-bold text-white">
                                    {scoreValue.toFixed(0)}
                                </span>
                            </div>

                            <div className="flex justify-center space-x-2 mb-6">
                                {Array.from({ length: 5 }, (_, index) => {
                                    const starValue = (index * 2 + 1) * 10;
                                    return (
                                        <span
                                            key={index}
                                            className={`text-3xl transition-all duration-300 ${scoreValue >= starValue
                                                    ? "text-yellow-300 transform scale-110"
                                                    : scoreValue >= starValue - 10
                                                        ? "text-yellow-200 transform scale-105"
                                                        : "text-gray-400"
                                                }`}
                                        >
                                            ★
                                        </span>
                                    );
                                })}
                            </div>

                            <p className="text-white/80 font-medium">
                                Completed on {formatVietnameseDateTime(createdAt)}
                            </p>
                        </div>

                        {/* Decorative circles */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4" />
                    </div>

                    {/* Actions Section */}
                    <div className="px-8 py-6 space-y-8">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {scoreValue >= 50 ? (
                                <button
                                    onClick={() => navigate("/")}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    <FaCertificate />
                                    View Certificate
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate("/exam/" + examId + "/simulation")}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    <FaRedo />
                                    Try Again
                                </button>
                            )}
                            <button
                                onClick={() => navigate("/exam/" + examId)}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition-all duration-200 shadow hover:shadow-lg"
                            >
                                <FaArrowLeft />
                                Return to Exam
                            </button>
                        </div>

                        {/* Feedback Section */}
                        {!isLeaveFeedback ? (
                            <div className="border-t dark:border-gray-700 pt-8">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
                                    <FaComment className="text-purple-500" />
                                    Share Your Experience
                                </h3>
                                <div className="space-y-6">
                                    <textarea
                                        id="feedbackDescriptionInput"
                                        className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
                                        rows={4}
                                        placeholder="Help us improve by sharing your thoughts about the exam..."
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                    />
                                    <div className="flex space-x-3 justify-center">
                                        {[...Array(5)].map((_, index) => {
                                            const ratingValue = index + 1;
                                            return (
                                                <label key={index}>
                                                    <input
                                                        type="radio"
                                                        name="rating"
                                                        value={ratingValue}
                                                        onClick={() => handleRatingChange(ratingValue)}
                                                        className="hidden"
                                                    />
                                                    <FaStar
                                                        size={30}
                                                        className="cursor-pointer text-yellow-500 hover:text-yellow-600 transition-all duration-300"
                                                        color={ratingValue <= (rating || 0) ? "orange" : "gray"}
                                                    />
                                                </label>
                                            );
                                        })}</div>
                                    {/* Image Upload Area */}
                                    <div className="relative">
                                        <label
                                            htmlFor="uploadFile1"
                                            className="group bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
                                        >
                                            <div className="flex flex-col items-center">
                                                <FaCloudUploadAlt className="w-12 h-12 mb-2 text-gray-400 group-hover:text-purple-500 transition-colors" />
                                                <span className="font-medium group-hover:text-purple-500">Upload Screenshot</span>
                                                <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG, WEBP, or GIF</p>
                                            </div>
                                            <input type="file" id="uploadFile1" className="hidden" onChange={handleImageChange} accept="image/*" />
                                        </label>

                                        {previewImage && (
                                            <div className="mt-4 relative group">
                                                <img
                                                    src={previewImage}
                                                    alt="Preview"
                                                    className="w-full h-48 object-cover rounded-xl cursor-pointer"
                                                    onClick={() => handleOpenModal(previewImage)}
                                                />
                                                <div
                                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center"
                                                    onClick={() => handleOpenModal(previewImage)}
                                                >
                                                    <FaSearch className="text-white text-xl" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleFeedbackSubmit}
                                        disabled={!feedback.trim()}
                                        className={`w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${feedback.trim()
                                                ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl'
                                                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        <FaPaperPlane />
                                        Submit Feedback
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                                    <FaCheckCircle className="text-3xl text-green-500" />
                                </div>
                                <p className="text-green-600 dark:text-green-400 font-medium text-lg">
                                    Thank you for your valuable feedback!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center modal-background backdrop-blur-sm"
                    onClick={handleModalClick}
                >
                    <div className="max-w-4xl max-h-[90vh] overflow-auto bg-white dark:bg-gray-800 rounded-xl p-2 m-4">
                        <img src={modalImage || ''} alt="Enlarged preview" className="w-full h-auto rounded-lg" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamResultPage;
