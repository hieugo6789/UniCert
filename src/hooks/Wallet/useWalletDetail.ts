import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  WalletDetailFailure,
  WalletDetailsStart,
  WalletDetailSuccess,
} from "../../redux/slice/Wallet/walletDetailSlice";
import agent from "../../utils/agent";

const useWalletDetail = () => {
  const state = useAppSelector((state) => state.walletDetail);
  const dispatch = useAppDispatch();

  const getWalletDetails = async (id: string, input: number | null) => {
    dispatch(WalletDetailsStart());
    try {
      const response = await agent.Checkout.getUpdateWalletAfterCheckout(
        id,
        input
      );
      dispatch(WalletDetailSuccess({ userId: id, wallet: response.data }));
      console.log(input);
    } catch (error) {
      console.error("Error fetching Wallet details:", error);
      dispatch(WalletDetailFailure());
    }
  };

  return { wallets: state.wallets, getWalletDetails };
};

export default useWalletDetail;
