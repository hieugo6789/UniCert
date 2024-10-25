import { useEffect, useState } from "react";
import useWalletDetail from "../../../hooks/Wallet/useWalletDetail";
import Coin from "../../../assets/images/Coin.png";
import Cookies from "js-cookie";
import { Button, Modal } from "antd";
import TopUpWallet from "../../../components/Wallet/TopUpWallet";
import { useLocation } from "react-router-dom";

const Wallet = () => {
  const { wallets, getWalletDetails } = useWalletDetail();
  const userId = Cookies.get("userId");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transactionId, setTransactionId] = useState<number | null>(null); // Transaction ID state

  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const transIdFromPath = pathParts[pathParts.length - 1];

    const transIdNumber = parseInt(transIdFromPath, 10);
    if (!isNaN(transIdNumber)) {
      setTransactionId(transIdNumber);
      console.log("Transaction ID from URL:", transIdNumber);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (userId) {
      getWalletDetails(userId, transactionId);
    }
  }, [userId, transactionId]);

  // useEffect(() => {
  //   if (userId && transactionId === null) {
  //     getWalletDetails(userId, transactionId);
  //   }
  // }, [userId]);

  const handlePlusCoin = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
          <Button onClick={handlePlusCoin}> + </Button>
        </div>
      </div>

      <Modal
        title="Top Up Wallet"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null} // No default footer buttons
      >
        <TopUpWallet /> {/* Render TopUpWallet inside the modal */}
      </Modal>
    </>
  );
};

export default Wallet;
