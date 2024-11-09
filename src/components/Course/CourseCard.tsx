import { useNavigate } from "react-router-dom";
import { allCoursePaginationData } from "../../models/course";
import Coin from "../../assets/images/Coin.png";

interface CourseCardProps {
  course: allCoursePaginationData;
  onClick?: () => void;
  isInCart: boolean;
  isPurchased: boolean;
  hideButton?: boolean; // Thêm prop hideButton
}

const CourseCard = ({ course, onClick, isInCart, isPurchased, hideButton }: CourseCardProps) => {
  const navigate = useNavigate();
  const buttonText = isPurchased ? "Purchased" : isInCart ? "In Cart" : "Add To Cart";
  const buttonStyles = isPurchased || isInCart 
    ? "bg-gray-400 cursor-not-allowed" 
    : "bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-200";

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl cursor-pointer group"
      onClick={() => navigate("/course/" + course.courseId)}
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={course.courseImage} 
          alt={course.courseName} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors duration-200">
            {course.courseName}
          </h2>
          <p className="text-sm text-gray-500">{course.courseCode}</p>
        </div>

        <div className="flex items-center text-gray-600">
          <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{course.courseTime}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={Coin} alt="Coin" className="w-5 h-5" />
            <div className="flex flex-col">
              <span className="font-bold text-purple-600">
                {course.courseDiscountFee.toLocaleString('en-US')}
              </span>
              {course.courseDiscountFee !== course.courseFee && (
                <span className="text-sm text-gray-400 line-through">
                  {course.courseFee.toLocaleString('en-US')}
                </span>
              )}
            </div>
          </div>

          {!hideButton && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick();
              }}
              className={`${buttonStyles} text-white px-4 py-2 rounded-lg text-sm font-medium`}
              disabled={isInCart || isPurchased}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
