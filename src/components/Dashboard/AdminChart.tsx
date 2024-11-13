import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Spin } from "antd";

interface DashboardChartProps {
  data: Record<number, number>;
  year: number;
  onYearChange: (year: number) => void;
  loading: boolean;
}

const AdminChart: React.FC<DashboardChartProps> = ({
  data,
  year,
  onYearChange,
  loading,
}) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartData = Object.keys(data).map((month) => ({
    month: monthNames[Number(month) - 1],
    value: data[Number(month)],
  }));

  const years = [2024, 2025];

  return (
    <div className="bg-white mt-6 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Revenue</h2>
        <div>
          <label
            htmlFor="year"
            className="mr-2 text-gray-600"
          >
            Year:{" "}
          </label>
          <select
            id="year"
            value={year}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {years.map((y) => (
              <option
                key={y}
                value={y}
              >
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Phần loading và biểu đồ */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Spin size="large" />
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={400}
        >
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#8884d8"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AdminChart;
