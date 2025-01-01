import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Spin } from "antd";
import useDailyRevenue from "../../hooks/Dashboard/useDailyRevenue";

const DailyRevenue = () => {
  const [year, setYear] = useState<number>(2025); // Default year
  const [month, setMonth] = useState<number>(1); // Default month (January)
  const { revenue, loading, refetchRevenues } = useDailyRevenue({
    year,
    month,
  });

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

  // Prepare data for the chart
  const chartData = Object.keys(revenue).map((day) => ({
    day: ` ${day}`,
    value: revenue[Number(day)],
  }));

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = Number(e.target.value);
    setYear(selectedYear);
    refetchRevenues(selectedYear, month); // Refetch API with new year
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = Number(e.target.value);
    setMonth(selectedMonth);
    refetchRevenues(year, selectedMonth); // Refetch API with new month
  };

  return (
    <div className="bg-white mt-6 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Daily Revenue</h2>

        {/* Year and Month Selectors */}
        <div className="flex items-center">
          <div className="mr-4">
            <label
              htmlFor="year"
              className="mr-2 text-gray-600"
            >
              Year:
            </label>
            <select
              id="year"
              value={year}
              onChange={handleYearChange}
              className="border border-gray-300 rounded px-2 py-1"
            >
              {[2024, 2025].map((y) => (
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
            <label
              htmlFor="month"
              className="mr-2 text-gray-600"
            >
              Month:
            </label>
            <select
              id="month"
              value={month}
              onChange={handleMonthChange}
              className="border border-gray-300 rounded px-2 py-1"
            >
              {monthNames.map((name, index) => (
                <option
                  key={index + 1}
                  value={index + 1}
                >
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Chart or Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Spin size="large" />
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={400}
        >
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DailyRevenue;
