import { Avatar, Dropdown, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import defaultAvatar from "../../assets/images/Avatar/DefaultAvatar.jpg";
import useProfile from "../../hooks/useProfile";
import { useEffect } from "react";

const AvatarImage = () => {
  const navigate = useNavigate();
  const { state, getProfileDetails } = useProfile();
  const userId = Cookies.get("userId");

  useEffect(() => {
    getProfileDetails(userId);
    console.log(userId);
  }, []);

  const handleLogout = async () => {
    await localStorage.clear();
    Cookies.remove("token");
    navigate("/logIn");
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={
          <Avatar
            src={
              state.profile.userImage ? state.profile.userImage : defaultAvatar
              // state.profile.userImage
            }
            size="small"
          />
        }
      >
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/customer/orderHistory">Payment History</Link>
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={handleLogout}
      >
        Log Out
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
          size="large"
        />
      </Dropdown>
    </>
  );
};

export default AvatarImage;
