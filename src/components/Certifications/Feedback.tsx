import { feedbackPagination } from "../../models/feedback";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import DefaultImage from "../../assets/images/Avatar/DefaultAvatar.jpg";
import { FaStar } from "react-icons/fa";

const Feedback = ({ feedback }: { feedback: feedbackPagination[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<feedbackPagination[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  useEffect(() => {
    const approvedFeedbacks = feedback.filter(f => f.feedbackPermission == true);
    setFeedbacks(approvedFeedbacks);
    console.log(approvedFeedbacks);
  }, [feedback]);

  useEffect(() => {
    if (selectedRating === -1) {
      setFeedbacks(feedback.filter(f => f.feedbackPermission == true));
    } else {
      setFeedbacks(feedback.filter(f => f.feedbackPermission == true && f.feedbackRatingvalue == selectedRating));
    }
  }, [selectedRating]);

  return (
    <>
      <div className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            What Our Students Say
          </h1>          
          <div className="flex justify-center mb-6">
            <label className="text-gray-700 dark:text-gray-300 mr-4">
              Filter by Rating:
            </label>
            <select
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 dark:bg-gray-800 dark:text-gray-100"
              value={selectedRating}
              onChange={(e) => setSelectedRating(Number(e.target.value))}
            >
              <option value={-1}>All</option>
              <option value={0}>Just Comment</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {feedbacks.length === 0 && (
              <div className="text-center text-gray-700 dark:text-gray-300">
                No feedbacks found.
                </div>
                )}
            {feedbacks.map((item) => (
              <div 
                key={item.examId} 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >                
                {/* User Info */}
                <div className="flex items-center space-x-4 mb-6 mt-4">                  
                  <img 
                    src={item.userDetails.userImage || DefaultImage} 
                    alt={`${item.userDetails.username}'s avatar`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-violet-600 shadow-md"
                  />                                      
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{item.userDetails.username}</h2>                                      
                </div>

                {/* Feedback Content */}
                <div className="space-y-4">
                  {item.feedbackRatingvalue > 0 && (
                    <div className="flex">
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label key={index}>
                                    <FaStar
                                        size={30}
                                        className="cursor-pointer text-yellow-500 hover:text-yellow-600 transition-all duration-300"
                                        color={ratingValue <= item.feedbackRatingvalue ? "orange" : "gray"}
                                    />
                                </label>
                            );
                        })}
                    </div>
                  )}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item.feedbackDescription}
                  </p>
                  
                  {item.feedbackImage && (
                    <div 
                      className="mt-4 rounded-lg overflow-hidden shadow-md cursor-pointer"
                      onClick={() => setSelectedImage(item.feedbackImage || "")}
                    >
                      <img 
                        src={item.feedbackImage} 
                        alt="feedback" 
                        className="w-full h-auto transform hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  )}
                </div>

                {/* Date */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 italic">
                  <p className="text-right text-sm text-gray-500 dark:text-gray-400">
                    Posted on {new Date(item.feedbackCreatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 modal-background"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative bg-white dark:bg-gray-800 p-2 rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
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
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;
