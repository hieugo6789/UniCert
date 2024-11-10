import { feedbackPagination } from "../../models/feedback";
import { FaQuoteLeft } from "react-icons/fa";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Feedback = ({ feedback }: { feedback: feedbackPagination[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">
            What Our Students Say
          </h1>          
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {feedback.map((item) => (
              <div 
                key={item.examId} 
                className="bg-white rounded-2xl shadow-lg p-8 relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >                

                {/* User Info */}
                <div className="flex items-center space-x-4 mb-6 mt-4">                  
                  <img 
                    src={item.userDetails.userImage || "https://randomuser.me/api/portraits"} 
                    alt={`${item.userDetails.username}'s avatar`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-violet-600 shadow-md"
                  />                                      
                  <h2 className="text-xl font-semibold text-gray-800">{item.userDetails.username}</h2>                                      
                </div>

                {/* Feedback Content */}
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
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
                <div className="mt-6 pt-4 border-t border-gray-100 italic">
                  <p className="text-right text-sm text-gray-500">
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
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
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
