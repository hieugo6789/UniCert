import { useState } from "react";
import AdminChart from "../../components/Dashboard/AdminChart";
import Summary from "../../components/Dashboard/Summary";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import useMonthlyRevenue from "../../hooks/Dashboard/useMonthlyRevenue";

const Dashboard = () => {
  const [year, setYear] = useState<number>(2024);
  const { revenue, loading, refetchRevenues } = useMonthlyRevenue({ year });

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    refetchRevenues(newYear);
  };

  return (
    <>
      <div className="h-[9vh] flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold ml-6">Dashboard</h2>
        </div>
        <div className="mr-10">
          <AvatarAdmin />
        </div>
      </div>
      <div className="gap-4 p-2 h-[91vh]">
        <Summary />
        <AdminChart
          data={revenue}
          year={year}
          onYearChange={handleYearChange}
          loading={loading}
        />
      </div>
    </>
  );
};

export default Dashboard;
