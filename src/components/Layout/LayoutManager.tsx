import { Outlet } from "react-router-dom";
import MenuManager from "../Menu/MenuManager";
import AvatarAdmin from "../Header/AvatarAdmin";

const LayoutManager = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <MenuManager />
      </div>
      <div className="col-span-10">
        <div className="h-[8vh] flex justify-end mr-10 items-center">
          <AvatarAdmin />
        </div>
        <div className="h-[92vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default LayoutManager;
