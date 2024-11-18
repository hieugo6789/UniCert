import { Avatar, Dropdown, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import defaultAvatar from "../../assets/images/Avatar/DefaultAvatar.jpg";
import useProfile from "../../hooks/useProfile";
import { useEffect, useState } from "react";
import { LuLogOut, LuUser, LuWallet, LuHistory, LuArrowLeft } from "react-icons/lu";

interface AvatarImageProps {
  isMobile?: boolean;
  onMobileItemClick?: () => void;
}

const AvatarImage = ({ isMobile = false, onMobileItemClick }: AvatarImageProps) => {
  const navigate = useNavigate();
  const { state, getProfileDetails } = useProfile();
  const userId = Cookies.get("userId");
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    getProfileDetails(userId);
  }, []);

  const handleLogout = async () => {
    await localStorage.clear();
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("userId");
    navigate("/login");
  };

  const handleItemClick = (path: string) => {
    navigate(path);
    if (onMobileItemClick) {
      onMobileItemClick();
    }
  };

  // Mobile version
  if (isMobile) {
    if (showUserMenu) {
      return (
        <div className="fixed inset-0 bg-gray-950 z-50">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <button 
              onClick={() => setShowUserMenu(false)}
              className="text-white/80 p-2"
            >
              <LuArrowLeft size={24} />
            </button>
            <div className="text-white font-medium">User Menu</div>
            <div className="w-10" />
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => handleItemClick('/profile')}
              className="flex items-center gap-3 px-6 py-4 text-gray-300 hover:bg-gray-900"
            >
              <LuUser size={20} /> Profile
            </button>
            <button
              onClick={() => handleItemClick('/wallet')}
              className="flex items-center gap-3 px-6 py-4 text-gray-300 hover:bg-gray-900"
            >
              <LuWallet size={20} /> Coins
            </button>
            <button
              onClick={() => handleItemClick(`/history/${state.profile.userId}`)}
              className="flex items-center gap-3 px-6 py-4 text-gray-300 hover:bg-gray-900"
            >
              <LuHistory size={20} /> My Purchases
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-6 py-4 text-red-400 hover:bg-gray-900"
            >
              <LuLogOut size={20} /> Logout
            </button>
          </div>
        </div>
      );
    }

    return (
      <button 
        onClick={() => setShowUserMenu(true)}
        className="flex items-center gap-3 px-6 py-4 text-gray-300 hover:bg-gray-900 w-full"
      >
        <img
          src={state.profile.userImage || defaultAvatar}
          alt="Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span>{state.profile.username}</span>
      </button>
    );
  }

  // Desktop version
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<LuUser />}>
        <Link to="/profile">{state.profile.username}</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<LuWallet />}>
        <Link to="/wallet">Coins</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<LuHistory />}>
        <Link to={`/history/${state.profile.userId}`}>My Purchases</Link>
      </Menu.Item>
      <Menu.Item key="4" onClick={handleLogout} icon={<LuLogOut />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <Avatar
        src={state.profile.userImage || defaultAvatar}
        size="large"
        className="cursor-pointer"
      />
    </Dropdown>
  );
};

export default AvatarImage;
