import Summary from "../../components/Dashboard/Summary";
import AvatarAdmin from "../../components/Header/AvatarAdmin";

const Dashboard = () => {
  return (
    <>
      <div className="h-[9vh] flex justify-between items-center">
        <div></div>
        <div className="mr-10">
          <AvatarAdmin />
        </div>
      </div>
      <div className=" gap-4 p-2  h-[91vh]">
        <Summary />
      </div>
    </>
  );
};
export default Dashboard;
