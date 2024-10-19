import { useEffect } from "react";
import useWalletDetail from "../../../hooks/useWalletDetail";
import Coin from "../../../assets/images/Coin.png";
import Cookies from "js-cookie";

const Wallet = () => {
  const { wallets, getWalletDetails } = useWalletDetail();
  const userId = Cookies.get("userId");
  useEffect(() => {
    if (userId) {
      getWalletDetails(userId);
    }
  }, [userId]);
  return (
    <>
      <div>
        <div className="flex items-center space-x-2">
          <span className=" text-gray-700">Your Coins:</span>
          <div className="flex items-center">
            <img
              src={Coin}
              alt="Coin Icon"
              className="w-5 h-5"
            />
            <span className="ml-1 text-yellow-600 font-bold">
              {userId ? wallets[userId]?.point || 0 : 0}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Wallet;
