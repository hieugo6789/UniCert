import { Outlet } from "react-router-dom";
import MenuStaff from "../Menu/MenuStaff";

const LayoutStaff = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <MenuStaff />
      </div>
      <div
        className="col-span-10"
        style={{
          background:
            "linear-gradient(to right, rgb(240,248,255), rgb(228 242 255))",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};
export default LayoutStaff;
