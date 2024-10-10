import MenuAdmin from "../../components/Layout/MenuAdmin";

const Dashboard = () => {
  return (
    <>
      <div className="h-[10vh] ">header</div>
      <div className="grid grid-cols-12 gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className="col-span-2">
          <MenuAdmin />
        </div>
        <div className="col-span-10 bg-white p-4 rounded-lg shadow-lg">
          Dashboard
        </div>
      </div>
    </>
  );
};
export default Dashboard;
