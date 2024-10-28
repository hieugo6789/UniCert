import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  VoucherDetailFailure,
  VoucherDetailsStart,
  VoucherDetailSuccess,
} from "../../redux/slice/Voucher/voucherDetailSlice";
import agent from "../../utils/agent";

const useVoucherDetail = () => {
  const state = useAppSelector((state) => state.voucherDetail);
  const dispatch = useAppDispatch();
  const getVoucherDetails = async (voucherId: number) => {
    dispatch(VoucherDetailsStart());
    try {
      const response = await agent.Voucher.getDetailVoucher(voucherId);
      dispatch(VoucherDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching Voucher details:", error);
      dispatch(VoucherDetailFailure());
    }
  };
  return { state, getVoucherDetails };
};
export default useVoucherDetail;
