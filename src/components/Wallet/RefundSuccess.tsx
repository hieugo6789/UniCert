import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const RefundSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-purple-300 to-purple-500 text-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 dark:text-gray-200">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="green"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4">Refund Successful!</h1>
        <p className="text-lg text-gray-200 dark:text-gray-400 mb-8 text-center">
          Your refund request has been submitted successfully. <br />
          Please wait while we process your request.
        </p>
        <div className="flex space-x-4">
          <Button
            type="primary"
            onClick={() => navigate("/wallet")}
            className="px-6 py-3 text-lg bg-purple-700 hover:bg-purple-800 border-none rounded-full shadow-lg dark:bg-purple-600 dark:hover:bg-purple-700"
          >
            Back to Wallet
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="px-6 py-3 text-lg bg-white hover:bg-gray-100 text-purple-700 border border-white rounded-full shadow-lg dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          >
            Home Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RefundSuccess;
