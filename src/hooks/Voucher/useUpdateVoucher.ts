import { updateVoucher } from "../../models/voucher";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UpdateDetailVoucherFailure,
  UpdateDetailVoucherStart,
  UpdateDetailVoucherSuccess,
} from "../../redux/slice/Voucher/voucherDetailSlice";
import agent from "../../utils/agent";

const useUpdateVoucher = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.voucherDetail);

  const updateVoucherDetails = async (
    voucherId: number,
    data: updateVoucher
  ) => {
    dispatch(UpdateDetailVoucherStart());
    try {
      const response = await agent.Voucher.updateVoucher(voucherId, data);
      console.log("Response:", response);
      dispatch(UpdateDetailVoucherSuccess(response.data));
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      dispatch(
        UpdateDetailVoucherFailure(
          error.message || "Failed to update voucher detail"
        )
      );
    }
  };

  return {
    updateVoucherDetails,
    state,
  };
};
export default useUpdateVoucher;
