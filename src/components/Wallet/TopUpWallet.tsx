import { useEffect, useState } from "react";
import { useCreateTransaction } from "../../hooks/Wallet/useCreateTransaction";
import useWalletDetail from "../../hooks/Wallet/useWalletDetail";
import Cookies from "js-cookie";
import { inputTransaction } from "../../models/transaction";
import agent from "../../utils/agent";
import { showToast } from "../../utils/toastUtils";

// Danh sách các gói nạp
const packages = [
  { points: 10, price: 10000 },
  { points: 20, price: 20000 },
  { points: 50, price: 50000 },
  { points: 100, price: 100000 },
  { points: 500, price: 500000 },
];

const TopUpWallet = () => {
  const userId = Cookies.get("userId");
  const { wallets, getWalletDetails } = useWalletDetail(); // Get wallet details hook
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
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">Coin</h1>
      <div className="flex flex-col items-center mt-4">
        <input
          type="number"
          value={topUpAmount}
          onChange={(e) => setTopUpAmount(parseInt(e.target.value))}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Enter top-up amount"
        />
        <button
          onClick={handleTopUp}
          className="bg-purple-600 text-white px-4 py-2 rounded-md w-full hover:bg-purple-700 transition duration-300"
        >
          Deposit
        </button>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Package:</h2>
        <div className="grid grid-cols-2 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.points}
              className="bg-blue-600 text-white p-4 rounded-md cursor-pointer hover:bg-blue-700 transition"
              onClick={() => handleSelectPackage(pkg.points)}
            >
              <p className="text-xl font-bold">{pkg.points} coin</p>
              <p className="text-sm">{pkg.price.toLocaleString()} VND</p>
            </div>
          ))}
        </div>
      </div>

      {state.isCreating && (
        <p className="text-center text-yellow-500">Processing transaction...</p>
      )}
      {state.error && (
        <p className="text-center text-red-500">
          Transaction failed. Please try again.
        </p>
      )}
    </div>
  );
};

export default TopUpWallet;
