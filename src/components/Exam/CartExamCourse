import { useNavigate } from "react-router-dom";
import { currentCart } from "../../models/cart";

interface CartExamCardProps {
  exam: currentCart["examDetails"][0];
}

const CartExamCard = ({ exam }: CartExamCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="border p-6 rounded-lg shadow-lg" onClick={() => navigate(`/exam/${exam.examId}`)}>
      <h2 className="text-xl font-bold">{exam.examName}</h2>
      <p className="text-gray-500 mt-2">{exam.examCode}</p>
      <img src={exam.examImage} alt={exam.examName} className="mt-4 h-30 m-auto shadow-lg" />
      <p className="text-black-500 mt-4">Discount Fee: ${exam.examDiscountFee}</p>
      <a href="#" className="text-blue-500 mt-4 block rounded-full text-l text-right">Remove from Cart {">"}</a>
    </div>
  );
};

export default CartExamCard;
