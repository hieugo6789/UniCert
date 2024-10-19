import { useEffect, useState } from "react";
import { useCreateTransaction } from "../../hooks/useCreateTransaction";
import useWalletDetail from "../../hooks/useWalletDetail";
import Cookies from "js-cookie";
import { inputTransaction } from "../../models/transaction";
import agent from "../../utils/agent";

const TopUpWallet = () => {
  const userId = Cookies.get("userId");
  const { wallets, getWalletDetails } = useWalletDetail(); // Get wallet details hook
  const { state, handleCreateTransaction } = useCreateTransaction();
  const [topUpAmount, setTopUpAmount] = useState<number>(0);

  useEffect(() => {
    if (userId) {
      getWalletDetails(userId); // Fetch wallet details when component mounts
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

          // Step 2: Call Checkout API with the transactionId
          const checkoutResponse = await agent.Checkout.getCheckOut(
            transactionId
          );

          // Step 3: Redirect to the checkoutUrl
          if (
            checkoutResponse?.code === "00" &&
            checkoutResponse?.data?.checkoutUrl
          ) {
            window.location.href = checkoutResponse.data.checkoutUrl;
          } else {
            alert("Checkout failed. Please try again.");
          }
        }
      } catch (error) {
        console.error("Error during the top-up and checkout process:", error);
      }

      // Reset the input field after submission
      setTopUpAmount(0);
    } else {
      alert("Please enter a valid top-up amount.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">Top Up Wallet</h1>

      {/* Top-up input */}
      <div className="flex flex-col items-center">
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
          Top Up
        </button>
      </div>

      {/* Transaction Status */}
      {state.isCreating && (
        <p className="text-center text-yellow-500">Processing transaction...</p>
      )}
      {state.error && (
        <p className="text-center text-red-500">
          Transaction failed. Please try again.
        </p>
      )}
      {state.createdTransaction && (
        <p className="text-center text-green-500">Transaction successful!</p>
      )}
    </div>
  );
};

export default TopUpWallet;
