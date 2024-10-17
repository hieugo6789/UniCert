import { Outlet } from "react-router-dom";
import MenuAdmin from "../../../components/Layout/MenuAdmin";
// import AdminHeader from "../../../components/Header/AdminHeader";

const LayoutAdmin = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <MenuAdmin />
      </div>
      <div className="col-span-10">
        <Outlet />
      </div>
    </div>
  );
};
export default LayoutAdmin;
