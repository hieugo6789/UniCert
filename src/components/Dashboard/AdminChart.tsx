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
import { useState } from "react";

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
  const [filter, setFilter] = useState<"year" | "Q1" | "Q2" | "Q3" | "Q4">(
    "year"
  );

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

  const getFilteredData = () => {
    if (filter === "year") {
      return Object.keys(data).map((month) => ({
        month: monthNames[Number(month) - 1],
        value: data[Number(month)],
      }));
    }

    const quarterMonths: Record<string, number[]> = {
      Q1: [1, 2, 3],
      Q2: [4, 5, 6],
      Q3: [7, 8, 9],
      Q4: [10, 11, 12],
    };

    const selectedMonths = quarterMonths[filter];
    const quarterData = selectedMonths.map((month) => ({
      month: monthNames[month - 1],
      value: data[month] || 0,
    }));

    return quarterData;
  };

  const chartData = getFilteredData();
  const years = [2024, 2025];

  return (
    <div className="bg-white mt-6 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Revenue</h2>
        <div className="flex items-center gap-4">
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

          <div>
            
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="year">Year</option>
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading và biểu đồ */}
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
