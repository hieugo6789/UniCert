import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  deleteVoucherFailure,
  deleteVoucherStart,
  deleteVoucherSuccess,
} from "../../redux/slice/Voucher/deleteVoucherSlice";

import agent from "../../utils/agent";

const useDeleteVoucher = () => {
  const state = useAppSelector((state) => state.deleteVoucher);
  const dispatch = useAppDispatch();

  const handleDeleteVoucher = async (voucherId: number) => {
    dispatch(deleteVoucherStart());
    try {
      const response = await agent.Voucher.deleteVoucher(voucherId);
      dispatch(deleteVoucherSuccess(response.data));
    } catch (error) {
      console.error("Error deleting certification:", error);
      dispatch(deleteVoucherFailure());
    }
  };
  return { state, handleDeleteVoucher };
};
export default useDeleteVoucher;
