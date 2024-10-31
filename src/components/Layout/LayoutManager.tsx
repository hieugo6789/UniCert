import { Outlet } from "react-router-dom";
import MenuManager from "../Menu/MenuManager";
import AvatarAdmin from "../Header/AvatarAdmin";

const LayoutManager = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <MenuManager />
      </div>
      <div className="col-span-10 bg-gradient-to-r from-indigo-50 to-indigo-100">
        <div className="h-[9vh] flex justify-end mr-10 items-center">
          <AvatarAdmin />
        </div>
        <div className="h-[91vh] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default LayoutManager;
