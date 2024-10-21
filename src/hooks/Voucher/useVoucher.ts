import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allVoucherPaginationData } from "../../models/voucher";
import { fetchAllVoucherPagination } from "../../redux/slice/Voucher/voucherSlice";

const useVoucher = () => {
  const dispatch = useAppDispatch();
  const [voucher, setVoucher] = useState<allVoucherPaginationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchVouchers = async (name?: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllVoucherPagination(name));
      setVoucher(response.payload.data || []);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, [dispatch]);
  return { voucher, loading, refetchVouchers: fetchVouchers };
};
export default useVoucher;
