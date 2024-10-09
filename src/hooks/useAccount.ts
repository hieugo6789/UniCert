import { useState, useEffect, useCallback } from "react";
import { useAppDispatch } from "../redux/hook";
import { fetchAllAccount } from "../redux/slice/accountSlice";
import { UserDetail } from "../models/user";

export const useAccounts = (roleFilter1?: string, roleFilter2?: string) => {
  const dispatch = useAppDispatch();
  const [accounts, setAccounts] = useState<UserDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllAccount());
      let fetchedAccounts = response.payload.data || [];

      if (roleFilter1 || roleFilter2) {
        fetchedAccounts = fetchedAccounts.filter((account: UserDetail) => {
          return account.role === roleFilter1 || account.role === roleFilter2;
        });
      }

      setAccounts(fetchedAccounts);
    } catch (err) {
      setError("Error fetching accounts.");
    } finally {
      setLoading(false);
    }
  }, [dispatch, roleFilter1, roleFilter2]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return { accounts, loading, error, refetch: fetchAccounts };
};
