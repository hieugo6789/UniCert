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
    <div className="bg-white mt-6 rounded-lg shadow">
      <div>Revenue</div>
      <div className="mb-6 pt-10 ml-10">
        <label htmlFor="year">Year: </label>
        <select
          id="year"
          value={year}
          onChange={(e) => onYearChange(Number(e.target.value))}
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

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Spin size="large" />{" "}
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
