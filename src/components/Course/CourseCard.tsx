import { useNavigate } from "react-router-dom";
import { allCoursePaginationData } from "../../models/course";
import Coin from "../../assets/images/Coin.png"
interface CourseCardProps {
  course: allCoursePaginationData;
  onClick?: () => void;
  isInCart: boolean;
  isPurchased: boolean;
}

const CourseCard = ({ course, onClick, isInCart, isPurchased }: CourseCardProps) => {
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
      <div className="flex items-center mt-4">
        <p className="text-black-500 ">Course Fee: </p>
        <img
          src={Coin}
          alt="Coin Icon"
          className="w-5 h-5"
        />
        <span className="ml-1 text-yellow-600 font-bold">
          {course.courseFee}
        </span>
      </div>
      <p className="text-black-500 mt-4">Course Duration: {course.courseTime}</p>
      
      {/* Button positioned in the bottom-right corner */}
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
    </div>
  );
};

export default CourseCard;
