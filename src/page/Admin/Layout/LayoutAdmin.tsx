import { Outlet } from "react-router-dom";
import AdminHeader from "../../../components/Header/AdminHeader";

const LayoutAdmin = () => {
  return (
    <div className="flex">
      <AdminHeader />
      <Outlet />
    </div>
  );
};
export default LayoutAdmin;
