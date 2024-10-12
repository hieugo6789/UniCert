import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  WalletDetailFailure,
  WalletDetailsStart,
  WalletDetailSuccess,
} from "../redux/slice/walletDetailSlice";
import agent from "../utils/agent";

const useWalletDetail = () => {
  const state = useAppSelector((state) => state.walletDetail);
  const dispatch = useAppDispatch();

  const getWalletDetails = async (id: string) => {
    dispatch(WalletDetailsStart());
    try {
      const response = await agent.Account.getAccountWallet(id);
      dispatch(WalletDetailSuccess({ userId: id, wallet: response.data })); // Truyền userId kèm data
    } catch (error) {
      console.error("Error fetching Wallet details:", error);
      dispatch(WalletDetailFailure());
    }
  };

  return { wallets: state.wallets, getWalletDetails };
};

export default useWalletDetail;
