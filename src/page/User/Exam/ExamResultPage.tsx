import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomButton from "../../../components/UI/CustomButton";
import { useCreateFeedback } from "../../../hooks/Feedback/useCreateFeedback";
import Cookies from "js-cookie";
import { showToast } from "../../../utils/toastUtils";
import axios from "axios";

const ExamResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState("");
    const { state, handleCreateFeedback } = useCreateFeedback();
    const [isLeaveFeedback, setIsLeaveFeedback] = useState(false);

    const { examId, scoreValue, createdAt } = location.state || {};

    const handleFeedbackSubmit = async () => {
        let imageUrl = "";
        if (selectedImage) {
            imageUrl = await uploadCloudinary() || "";
        }

        await handleCreateFeedback({
            userId: Cookies.get("userId") || "",
            examId: examId,
            feedbackDescription: (document.getElementById("feedbackDescriptionInput") as HTMLInputElement).value,
            feedbackImage: imageUrl,
            feedbackCreatedAt: new Date(),
        }).then(() => {
            setIsLeaveFeedback(true);
        });
    };

    useEffect(() => {
        if (state.createdFeedback) {
            showToast("Feedback submitted successfully", "success");
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-10 text-center">
                        <div className={`inline-flex items-center justify-center p-2 rounded-full mb-4 ${scoreValue >= 5 ? "bg-green-500" : "bg-yellow-500"
                            }`}>
                            {scoreValue >= 5 ? (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            )}
                        </div>
                        <h1 className="text-5xl font-bold text-white mb-4">
                            {scoreValue.toFixed(1)}<span className="text-3xl">/10</span>
                        </h1>
                        <div className="flex justify-center space-x-1 mb-4">
                            {Array.from({ length: 5 }, (_, index) => {
                                const starValue = index * 2 + 1;
                                return (
                                    <span key={index} className="text-2xl">
                                        {scoreValue >= starValue ? "⭐" : scoreValue >= starValue - 1 ? "🌟" : "☆"}
                                    </span>
                                );
                            })}
                        </div>
                        <p className="text-blue-100">
                            Completed on {new Date(createdAt).toLocaleDateString("en-US", {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>

                    {/* Actions Section */}
                    <div className="px-8 py-6 bg-white space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {scoreValue >= 5 ? (
                                <CustomButton
                                    onClick={() => navigate("/")}
                                    label="View Certificate"
                                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200"
                                />
                            ) : (
                                <CustomButton
                                    onClick={() => navigate("/exam/" + examId + "/simulation")}
                                    label="Try Again"
                                    className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors duration-200"
                                />
                            )}
                            <CustomButton
                                onClick={() => navigate("/exam/" + examId)}
                                label="Return to Exam Page"
                                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200"
                            />
                        </div>

                        {/* Feedback Section */}
                        {!isLeaveFeedback ? (
                            <div className="mt-8 border-t pt-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Share Your Experience</h3>
                                <div className="space-y-4">
                                    <textarea
                                        id="feedbackDescriptionInput"
                                        className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        rows={4}
                                        placeholder="Help us improve by sharing your thoughts about the exam..."
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                    />
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
                                            <img src={previewImage} alt="Preview" className="w-1/2 h-auto rounded-lg" onClick={() => handleOpenModal(previewImage)} />
                                        </div>
                                    )}
                                    <CustomButton
                                        onClick={handleFeedbackSubmit}
                                        label="Submit Feedback"
                                        disabled={!feedback.trim()}
                                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-green-600 font-medium">Thank you for your valuable feedback!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center modal-background"
                    onClick={handleModalClick}
                >
                    <div className="max-w-3xl max-h-[90vh] overflow-auto bg-white rounded-lg p-2">
                        <img src={modalImage || ''} alt="Enlarged preview" className="w-full h-auto" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamResultPage;
