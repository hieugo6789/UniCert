import { Outlet } from "react-router-dom";
// import AdminHeader from "../../../components/Header/AdminHeader";

const LayoutAdmin = () => {
  return (
    <div>
      {/* <AdminHeader /> */}
      <Outlet />
    </div>
  );
};
export default LayoutAdmin;
