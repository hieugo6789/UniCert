import { useNavigate } from "react-router-dom";
import { currentCart } from "../../models/cart";

interface CartCourseCardProps {
  course: currentCart["courseDetails"][0];
}

const CartCourseCard = ({ course }: CartCourseCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="border p-6 rounded-lg shadow-lg" onClick={() => navigate(`/course/${course.courseId}`)}>
      <h2 className="text-xl font-bold">{course.courseName}</h2>
      <p className="text-gray-500 mt-2">{course.courseCode}</p>
      <img src={course.courseImage} alt={course.courseName} className="mt-4 h-30 m-auto shadow-lg" />
      <p className="text-black-500 mt-4">Discount Fee: ${course.courseDiscountFee}</p>
      <a href="#" className="text-blue-500 mt-4 block rounded-full text-l text-right">Remove from Cart {">"}</a>
    </div>
  );
};

export default CartCourseCard;
