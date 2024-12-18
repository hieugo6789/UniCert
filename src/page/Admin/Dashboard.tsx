import { useState } from "react";
import AdminChart from "../../components/Dashboard/AdminChart";
import Summary from "../../components/Dashboard/Summary";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import useMonthlyRevenue from "../../hooks/Dashboard/useMonthlyRevenue";
import AdminNotification from "../../components/Notification/AdminNotification";
import DailyRevenue from "../../components/Dashboard/DailyRevenue";
// import PieChart from "../../components/Dashboard/PieChart";
// import CustomSale from "../../components/Dashboard/CustomSale";

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
        <div className="mr-10 flex items-center">
          <div className="mr-6">
            <AdminNotification />
          </div>
          <AvatarAdmin />
        </div>
      </div>
      <div className="gap-4 p-2 ">
        <div className="w-full">
          <Summary />
        </div>
        {/* <div className="grid grid-cols-10 mt-6">
          <div className="col-span-4">
            <PieChart />
          </div>
          <div className="col-span-4">
            <CustomSale />
          </div>
        </div> */}

        <AdminChart
          data={revenue}
          year={year}
          onYearChange={handleYearChange}
          loading={loading}
        />
        <DailyRevenue />
      </div>
    </>
  );
};

export default Dashboard;
