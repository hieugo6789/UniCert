import { Outlet } from "react-router-dom";
import MenuManager from "../Menu/MenuManager";

const LayoutManager = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <MenuManager />
      </div>
      <div className="col-span-10">
        <Outlet />
      </div>
    </div>
  );
};
export default LayoutManager;
