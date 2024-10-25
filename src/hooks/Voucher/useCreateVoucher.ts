import { createVoucher } from "../../models/voucher";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  createVoucherFailure,
  createVoucherStart,
  createVoucherSuccess,
} from "../../redux/slice/Voucher/createVoucherSlice";
import agent from "../../utils/agent";

export function useCreateVoucher() {
  const state = useAppSelector((state) => state.createVoucher);
  const dispatch = useAppDispatch();

  const handleCreateVoucher = async (voucherData: createVoucher) => {
    dispatch(createVoucherStart());
    try {
      const response = await agent.Voucher.createVoucher(voucherData);
      dispatch(createVoucherSuccess(response));
    } catch (error) {
      console.error("Error creating certification:", error);
      dispatch(createVoucherFailure());
    }
  };

  return { state, handleCreateVoucher };
}
