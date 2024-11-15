import { useEffect, useState } from "react";
import { useCreateTransaction } from "../../hooks/Wallet/useCreateTransaction";
import useWalletDetail from "../../hooks/Wallet/useWalletDetail";
import Cookies from "js-cookie";
import { inputTransaction } from "../../models/transaction";
import agent from "../../utils/agent";
import CoinPackage from "../../assets/images/CoinPackage.png";
import Coin from "../../assets/images/Coin.png";
import { showToast } from "../../utils/toastUtils";

const packages = [
  { points: 20, price: 20000 },
  { points: 50, price: 50000 },
  { points: 100, price: 100000 },
  { points: 200, price: 200000 },
  { points: 500, price: 500000 },
  { points: 1000, price: 1000000 },
];

const TopUpWallet = () => {
  const userId = Cookies.get("userId");
  const { wallets, getWalletDetails } = useWalletDetail();
  const { state, handleCreateTransaction } = useCreateTransaction();
  const [topUpAmount, setTopUpAmount] = useState<number>(0);

  useEffect(() => {
    if (userId) {
      getWalletDetails(userId, null);
    }
  }, [userId]);

  const handleTopUp = async () => {
    if (topUpAmount > 0 && userId) {
      const transactionData: inputTransaction = {
        walletId: wallets[userId]?.walletId,
        point: topUpAmount,
      };

      try {
        const transactionResponse = await handleCreateTransaction(
          transactionData
        );

        if (transactionResponse.data.transactionId) {
          const transactionId = transactionResponse.data.transactionId;

          const checkoutResponse = await agent.Checkout.getCheckOut(
            transactionId
          );

          if (
            checkoutResponse?.code === "00" &&
            checkoutResponse?.data?.checkoutUrl
          ) {
            window.location.href = checkoutResponse.data.checkoutUrl;
          } else {
            showToast("Checkout failed. Please try again", "error");
          }
        }
      } catch (error) {
        console.error("Error during the top-up and checkout process:", error);
        showToast("Checkout failed. Please try again", "error");
      }

      setTopUpAmount(0);
    } else {
      showToast("Please enter a valid top-up amount.", "error");
    }
  };

  const handleSelectPackage = (points: number) => {
    setTopUpAmount(points);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Top Up Coins
      </h1>
      <div className="flex flex-col items-center mt-4">
        <div className="flex  items-center relative w-full">
          <input
            type="number"
            value={topUpAmount}
            onChange={(e) => setTopUpAmount(parseInt(e.target.value))}
            className="mb-4 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-300"
            placeholder="Enter top-up amount"
          />
          <img
            src={Coin}
            alt="Coin Icon"
            className="absolute right-3 top-2 size-6 pointer-events-none"
          />
        </div>

        <button
          onClick={handleTopUp}
          className="bg-purple-500 text-white px-4 py-2 rounded-md w-full hover:bg-purple-600 transition duration-300"
        >
          Deposit
        </button>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">Select Package:</h2>
        <div className="grid grid-cols-2 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.points}
              className="bg-purple-100 border border-purple-300 p-4 rounded-md cursor-pointer hover:bg-purple-200 transition flex justify-around items-center"
              onClick={() => handleSelectPackage(pkg.points)}
            >
              <div>
                <p className="text-xl font-bold text-purple-700">
                  {pkg.points} coins
                </p>
                <p className="text-sm text-gray-600">
                  {pkg.price.toLocaleString()} VNĐ
                </p>
              </div>
              <img
                src={CoinPackage}
                alt="Coin Package"
                className="w-8 h-8"
              />
            </div>
          ))}
        </div>
      </div>
      {state.error && (
        <p className="text-center text-red-500">
          Transaction failed. Please try again.
        </p>
      )}
    </div>
  );
};

export default TopUpWallet;
