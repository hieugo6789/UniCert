import { useEffect, useState } from "react";
import { PieChartModel } from "../../models/dashboard";

const PieChart = () => {
  const [data, setData] = useState<PieChartModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://certificateinformationportal.azurewebsites.net/api/v1/dashboard/percentage-distribution"
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (!data) return <div className="text-center">No data available</div>;

  const chartData = [
    {
      label: "Only Enrolled in Course",
      value: data.percentageOnlyEnrolledInCourse,
      color: "#3b82f6", // Tailwind blue-500
    },
    {
      label: "Only Purchase Exam",
      value: data.percentageOnlyPurchaseSimulationExams,
      color: "#22c55e", // Tailwind green-500
    },
    {
      label: "Purchase Both",
      value: data.percentagePurchaseBoth,
      color: "#a855f7", // Tailwind purple-500
    },
    {
      label: "Purchase Nothing",
      value: data.percentagePurchaseNothing,
      color: "#ef4444", // Tailwind red-500
    },
  ];

  // Calculate conic-gradient string
  let currentAngle = 0;
  const conicGradient = chartData
    .map((item) => {
      const sliceAngle = (item.value / 100) * 360;
      const gradient = `${item.color} ${currentAngle}deg ${
        currentAngle + sliceAngle
      }deg`;
      currentAngle += sliceAngle;
      return gradient;
    })
    .join(", ");

  return (
    <div className="bg-white rounded-lg w-fit">
      <div className="flex items-center">
        {/* Pie Chart */}
        <div
          className="w-36 h-36 rounded-full ml-6"
          style={{
            background: `conic-gradient(${conicGradient})`,
          }}
        ></div>
        {/* Legend */}
        <div className="p-6 px-6">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 mb-2"
            >
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              ></div>
              <span>
                {item.label}: {item.value.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
