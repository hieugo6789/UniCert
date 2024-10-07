import MenuAdmin from "../../components/Layout/MenuAdmin";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-4 p-2 bg-slate-100 h-[90vh]">
      <div className="col-span-2">
        <MenuAdmin />
      </div>
      <div className="col-span-10">Dashboard</div>
    </div>
  );
};
export default Dashboard;
