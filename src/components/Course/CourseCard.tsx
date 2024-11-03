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
  const buttonStyles = isPurchased || isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700";

  return (
    <div
      className="border p-6 rounded-lg shadow-lg relative"
      onClick={() => navigate("/course/" + course.courseId)}
    >
      <h2 className="text-xl font-bold">{course.courseName}</h2>
      <p className="text-gray-500 mt-2">{course.courseCode}</p>
      <img src={course.courseImage} alt={course.courseName} className="mt-4 h-30 m-auto shadow-lg" />            
      <p className="text-black-500 mt-4">Course Duration: {course.courseTime}</p>
      <div className="flex items-center mt-4">
        <p className="text-black-500 ">Course Fee: </p>
        {course.courseDiscountFee === course.courseFee ? (          
          <div className="flex items-center ml-2">
            <img src={Coin} alt="Coin Icon" className="w-5 h-5" />
            <span className="ml-1 text-yellow-600 font-bold">
              {course.courseDiscountFee.toLocaleString('en-US')}
            </span>
          </div>
        ) : (          
          <>            
            <div className="flex items-center ml-2">
              <span className="text-yellow-600 font-bold">
                {course.courseDiscountFee.toLocaleString('en-US')}
              </span>
              <img src={Coin} alt="Coin Icon" className="w-5 h-5" />
            </div>
            <div className="flex items-center ml-2">
              <span className="text-gray-500 line-through mr-1">
                {course.courseFee.toLocaleString('en-US')}
              </span>
              <img src={Coin} alt="Coin Icon" className="w-5 h-5" />
            </div>
          </>
        )}
      </div>
      
      {/* Chỉ render nút nếu hideButton là false */}
      {!hideButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();  // Prevent navigating on button click
            if (onClick) onClick();
          }}
          className={`${buttonStyles} text-white px-4 py-2 rounded-lg absolute bottom-4 right-4`}
          disabled={isInCart || isPurchased}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default CourseCard;
