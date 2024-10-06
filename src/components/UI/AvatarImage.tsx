import { Avatar, Dropdown, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import defaultAvatar from "../../assets/images/Avatar/DefaultAvatar.jpg";

const AvatarImage = () => {
  const navigate = useNavigate();

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
            src={defaultAvatar}
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
          src={defaultAvatar}
          size="large"
        />
      </Dropdown>
    </>
  );
};
export default AvatarImage;
