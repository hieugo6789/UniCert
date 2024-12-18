import { useState } from "react";
import axios from "axios";

const CustomSale = () => {
  const [totalPoint, setTotalPoint] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const fetchTotalPoint = async () => {
    try {
      const response = await axios.get(
        "https://certificateinformationportal.azurewebsites.net/api/v1/dashboard/total-point",
        {
          params: {
            period: 3,
            startDate: startDate.replace(/-/g, "/"),
            endDate: endDate.replace(/-/g, "/"),
          },
        }
      );
      setTotalPoint(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data");
      setTotalPoint(null);
      console.error(err);
    }
  };

  return (
    <div className="px-10 py-2 bg-white rounded-lg w-fit h-44">
      <h2 className="text-lg font-bold mb-2">Sales Report:</h2>

      <div className="flex gap-4 mb-2">
        <div>
          <label className="block mb-1 font-medium">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded min-w-44 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded min-w-44"
          />
        </div>
      </div>
      <div className="relative">
        <div className="absolute">
          {error && <p className="text-red-500">{error}</p>}
          {totalPoint !== null ? (
            <p className="text-green-600 font-bold">{totalPoint}</p>
          ) : (
            <p></p>
          )}
        </div>

        <button
          onClick={fetchTotalPoint}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-64 absolute"
        >
          View Sales
        </button>
      </div>
    </div>
  );
};

export default CustomSale;
