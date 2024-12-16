import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allHistoryTransaction } from "../../models/transaction";
import { fetchAllTransactionAdmin } from "../../redux/slice/Transaction/historyTransactionSlice";

const useAllTransaction = () => {
  const dispatch = useAppDispatch();
  const [historyTransaction, setHistoryTransaction] = useState<
    allHistoryTransaction[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchHistoryTransactions = async () => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllTransactionAdmin());
      setHistoryTransaction(response.payload.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryTransactions();
  }, []);

  return {
    historyTransaction,
    loading,
  };
};

export default useAllTransaction;
