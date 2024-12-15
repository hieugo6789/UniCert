import { feedbackPagination } from "../../models/feedback";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import DefaultImage from "../../assets/images/Avatar/DefaultAvatar.jpg";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useFeedbackByCertId from "../../hooks/Feedback/useFeedbackByCertId";

const Feedback = () => {
  const id = Number(useParams().id);
  const { feedback,refetchFeedbacks } = useFeedbackByCertId();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<feedbackPagination[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(6); // Default to "All"

  useEffect(() => {
    refetchFeedbacks(id);
  }, [id]);
  useEffect(() => {
    refetchFeedbacks(id);
  },[selectedRating]);
  useEffect(() => {
    // console.log(feedback);
    setFilteredFeedbacks([]);
    // Lọc dữ liệu feedback dựa trên selectedRating
    const updatedFeedbacks = feedback.filter((f) => {
      if (!f.feedbackPermission) return false; // Loại bỏ feedback chưa được phép hiển thị

      if (selectedRating === 6) return true; // Hiển thị tất cả
      if (selectedRating === 0) return f.feedbackRatingvalue === 0; // Hiển thị "Just Comment"
      return f.feedbackRatingvalue === selectedRating; // Hiển thị theo số sao
    });
    // console.log(updatedFeedbacks);
    setFilteredFeedbacks(updatedFeedbacks); // Cập nhật danh sách feedback
  }, [feedback]); // Cập nhật mỗi khi selectedRating hoặc feedback thay đổi

  return (
    <>
      <div className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            What Our Students Say
          </h1>
          {/* Bộ lọc rating */}
          <div className="flex justify-center items-center mb-6">
            <label className="text-gray-700 dark:text-gray-300 mr-4">
              Filter by Rating:
            </label>
            <select
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 dark:bg-gray-800 dark:text-gray-100"
              value={selectedRating}
              onChange={(e) => setSelectedRating(Number(e.target.value))}
            >
              <option value={6}>All</option>
              <option value={0}>Just Comment</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>

          {/* Hiển thị danh sách feedback */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredFeedbacks.length === 0 ? (
              <div className="text-center text-gray-700 dark:text-gray-300">
                No feedbacks found.
              </div>
            ) : (
              filteredFeedbacks.map((item) => (
                <div
                  key={item.feedbackId}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Thông tin người dùng */}
                  <div className="flex items-center space-x-4 mb-6 mt-4">
                    <img
                      src={item.userDetails?.userImage || DefaultImage}
                      alt={`${item.userDetails?.username || "User"}'s avatar`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-violet-600 shadow-md"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                      {item.userDetails?.username || "Anonymous"}
                    </h2>
                  </div>

                  {/* Nội dung feedback */}
                  <div className="space-y-4">
                    {item.feedbackRatingvalue > 0 && (
                      <div className="flex">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            size={30}
                            className="cursor-pointer transition-all duration-300"
                            color={index < item.feedbackRatingvalue ? "orange" : "gray"}
                          />
                        ))}
                      </div>
                    )}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.feedbackDescription}
                    </p>
                    {item.feedbackImage && (
                      <div
                        className="mt-4 rounded-lg overflow-hidden shadow-md cursor-pointer"
                        onClick={() => setSelectedImage(item.feedbackImage || "")}                      >
                        <img
                          src={item.feedbackImage}
                          alt="feedback"
                          className="w-full h-auto transform hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </div>

                  {/* Ngày đăng */}
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 italic">
                    <p className="text-right text-sm text-gray-500 dark:text-gray-400">
                      Posted on{" "}
                      {new Date(item.feedbackCreatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal hiển thị ảnh */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 modal-background"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-white dark:bg-gray-800 p-2 rounded-lg max-w-4xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <IoMdClose size={32} />
            </button>
            <img
              src={selectedImage}
              alt="Feedback detail"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;
