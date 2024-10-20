import { useEffect } from "react";
import useWalletDetail from "../../../hooks/Wallet/useWalletDetail";
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
      <div className="flex justify-around">
        <div className="">
          <h1 className="text-2xl font-bold">History payment</h1>
          <div>{userId ? wallets[userId]?.walletId || 0 : 0}</div>
        </div>

        <div className="bg-white shadow-md rounded-xl px-4 py-2 flex items-center justify-center space-x-2 max-w-56 h-full">
          <span className=" text-gray-700">Your Coins:</span>
          <div className="flex items-center">
            <img
              src={Coin}
              alt="Coin Icon"
              className="w-5 h-5"
            />
            <span className="ml-1 text-yellow-600 font-bold">
              {userId ? wallets[userId]?.point : 0}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Wallet;
