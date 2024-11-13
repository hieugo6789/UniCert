import { useNavigate } from "react-router-dom";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-500 mb-4">403</h1>
      <p className="text-xl mb-8">
        You don't have permission to access this page.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Go Back
      </button>
    </div>
  );
};

export default ForbiddenPage;
