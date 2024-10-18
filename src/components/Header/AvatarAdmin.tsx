import { useEffect } from "react";
import useProfile from "../../hooks/useProfile";
import defaultAvatar from "../../assets/images/Avatar/DefaultAvatar.jpg";
import { Avatar, Dropdown, Menu } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

const AvatarAdmin = () => {
  const navigate = useNavigate();
  const { state, getProfileDetails } = useProfile();
  const userId = Cookies.get("userId");

  useEffect(() => {
    getProfileDetails(userId);
  }, []);

  const handleLogout = async () => {
    await localStorage.clear();
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("userId");
    navigate("/logIn");
  };
  const menu = (
    <Menu>
      <Menu.Item
        onClick={handleLogout}
        style={{ fontSize: "16px", padding: "" }}
      >
        <LuLogOut style={{ marginRight: "8px" }} />
        Log out
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Dropdown
        overlay={menu}
        className="cursor-pointer"
        trigger={["click"]}
      >
        <Avatar
          src={
            state.profile.userImage ? state.profile.userImage : defaultAvatar
          }
          // size="large"
          className="size-12"
        />
      </Dropdown>
    </>
  );
};
export default AvatarAdmin;
