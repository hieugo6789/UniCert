import { Outlet } from "react-router-dom";
import MenuAdmin from "../Menu/MenuAdmin";

const LayoutAdmin = () => {
  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-2">
        <MenuAdmin />
      </div>
      <div className="col-span-10 bg-gradient-to-r from-indigo-50 to-indigo-100">
        <Outlet />
      </div>
    </div>
  );
};
export default LayoutAdmin;
