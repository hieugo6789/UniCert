import { useEffect } from "react";
import useProfile from "../../hooks/useProfile";
import { Avatar } from "antd";
import Cookies from "js-cookie";

const AvatarAdmin = () => {
  const { state, getProfileDetails } = useProfile();
  const userId = Cookies.get("userId");
  useEffect(() => {
    getProfileDetails(userId);
  }, []);
  return (
    <Avatar
      src={state.profile.userImage}
      className="size-14"
    />
  );
};
export default AvatarAdmin;
