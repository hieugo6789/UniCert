import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allHistoryTransaction } from "../../models/transaction";
import { fetchAllHistoryTransaction } from "../../redux/slice/Transaction/historyTransactionSlice";

interface UseHistoryTransactionProps {
  userId: number;
}

const useHistoryTransaction = ({ userId }: UseHistoryTransactionProps) => {
  const dispatch = useAppDispatch();
  const [historyTransaction, setHistoryTransaction] = useState<
    allHistoryTransaction[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchHistoryTransactions = async (userId: number) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllHistoryTransaction(userId));
      setHistoryTransaction(response.payload.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchHistoryTransactions(userId);
    }
  }, [dispatch, userId]);

  return {
    historyTransaction,
    loading,
    refetchHistoryTransactions: () => fetchHistoryTransactions(userId),
  };
};

export default useHistoryTransaction;
