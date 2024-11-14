import { useEffect } from "react";
import useProfile from "../../hooks/useProfile";
import defaultAvatar from "../../assets/images/Avatar/DefaultAvatar.jpg";
import { Dropdown, Menu, Button } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

const AvatarAdmin = () => {
  const navigate = useNavigate();
  const { state, getProfileDetails } = useProfile();
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      getProfileDetails(userId);
    }
  }, [token]);

  const handleLogout = async () => {
    await localStorage.clear();
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("userId");
    localStorage.clear();
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item
        onClick={handleLogout}
        style={{ fontSize: "16px" }}
      >
        <LuLogOut style={{ marginRight: "8px" }} />
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {token ? (
        <div className="flex items-center gap-2 rounded-lg ">
          <div className="flex-grow text-right mr-1 w-full">
            <p className="text-lg font-bold">{state.profile.username}</p>
            <p className="block text-sm text-gray-400">{state.profile.role}</p>
          </div>
          <Dropdown
            overlay={menu}
            className="cursor-pointer"
            trigger={["click"]}
          >
            <img
              src={
                state.profile.userImage
                  ? state.profile.userImage
                  : defaultAvatar
              }
              className="size-12 rounded-lg"
            />
          </Dropdown>
        </div>
      ) : (
        <Button
          type="primary"
          onClick={() => navigate("/login")}
        >
          Log In
        </Button>
      )}
    </>
  );
};

export default AvatarAdmin;
