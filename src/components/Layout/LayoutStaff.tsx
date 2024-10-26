import { Outlet } from "react-router-dom";
import MenuStaff from "../Menu/MenuStaff";

const LayoutStaff = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <MenuStaff />
      </div>
      <div className="col-span-10">
        <Outlet />
      </div>
    </div>
  );
};
export default LayoutStaff;
