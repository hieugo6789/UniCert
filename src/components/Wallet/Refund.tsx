import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Input, InputNumber, Button, message } from "antd";
import useWalletDetail from "../../hooks/Wallet/useWalletDetail";
import { bankInformation } from "../../models/user";

const Refund = () => {
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState<bankInformation[]>([]);
  const [ownerName, setOwnerName] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [points, setPoints] = useState<number | null>(null);

  const userId = Cookies.get("userId");
  const { wallets, getWalletDetails } = useWalletDetail();

  useEffect(() => {
    if (userId) {
      getWalletDetails(userId, 0);
    }
    fetchBanks();
  }, [userId]);

  const walletId = userId ? wallets[userId]?.walletId : null;

  const fetchBanks = async () => {
    try {
      const response = await axios.get(
        "https://certificateinformationportal.azurewebsites.net/api/v1/banks"
      );
      setBanks(response.data.data || []);
    } catch (error) {
      message.error("Failed to fetch bank list. Please try again.");
    }
  };

  const handleCheckAccount = async () => {
    if (!selectedBank || !accountNumber) {
      message.error("Please fill in bank and account details first.");
      return;
    }

    setVerifying(true);
    try {
      const response = await axios.post(
        `https://certificateinformationportal.azurewebsites.net/api/v1/banks?bankCode=${selectedBank}&accountNumber=${accountNumber}`
      );
      setOwnerName(response.data.data.ownerName || null);
      message.success("Bank account verified successfully!");
    } catch (error) {
      message.error(
        "Failed to verify bank account. Please check your details."
      );
      setOwnerName(null);
    } finally {
      setVerifying(false);
    }
  };

  const handleRefund = async () => {
    if (!walletId) {
      message.error("User wallet is not available.");
      return;
    }

    if (!points || points <= 0) {
      message.error("Please enter a valid point amount.");
      return;
    }

    if (!ownerName) {
      message.error("Please verify the bank account before submitting.");
      return;
    }

    setLoading(true);

    const requestData = {
      walletId: walletId,
      point: points,
      bankAccount: {
        bankCode: selectedBank,
        accountNumber: accountNumber,
      },
    };

    try {
      const response = await axios.post(
        "https://certificateinformationportal.azurewebsites.net/api/v1/refund/SendRequestRefund",
        requestData
      );
      message.success("Refund request sent successfully!");
      console.log("Refund response:", response.data);
    } catch (error) {
      message.error("Failed to send refund request. Please try again.");
      console.error("Refund error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 grid grid-cols-8">
      <div className="col-span-6 p-4">
        <h2 className="mb-4 text-lg">Select bank:</h2>

        <div className="grid grid-cols-5 gap-4 mb-4">
          {banks.map((bank) => (
            <div
              key={bank.code}
              onClick={() => {
                setSelectedBank(bank.code);
              }}
              className={`flex items-center justify-center border rounded-lg p-0 hover:shadow-md cursor-pointer ${
                selectedBank === bank.code ? "border-blue-500 bg-blue-100" : ""
              }`}
            >
              <img
                src={bank.logo_url}
                alt={bank.name}
                className="h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2 ">
        <div className="mb-4 ">
          <label className="block mb-2 pt-4">Account Number</label>
          <Input
            placeholder="Enter account number"
            value={accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value);
              setOwnerName(null); // Reset owner name when account changes
            }}
          />
        </div>
        <Button
          type="primary"
          onClick={handleCheckAccount}
          loading={verifying}
          className="mb-4 w-full"
        >
          Verify Account
        </Button>
        {ownerName && (
          <div className="mb-4">
            <p>
              <strong>Account Owner:</strong> {ownerName}
            </p>
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-2">Points</label>
          <InputNumber
            placeholder="Enter points"
            min={1}
            className="w-full"
            value={points}
            onChange={(value) => setPoints(value)}
          />
        </div>
        <Button
          type="primary"
          onClick={handleRefund}
          loading={loading}
          className="w-full"
          disabled={!ownerName}
        >
          Submit Refund Request
        </Button>
      </div>
    </div>
  );
};

export default Refund;
