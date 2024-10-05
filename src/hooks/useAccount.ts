import { useState, useEffect } from "react";
import { useAppDispatch } from "../redux/hook";
import { fetchAllAccount } from "../redux/slice/accountSlice";
import { UserDetail } from "../models/user";

export const useAccounts = (roleFilter?: string) => {
  const dispatch = useAppDispatch();
  const [accounts, setAccounts] = useState<UserDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const response = await dispatch(fetchAllAccount());
        let fetchedAccounts = response.payload.data || [];

        // Filter by role if a roleFilter is provided
        if (roleFilter) {
          fetchedAccounts = fetchedAccounts.filter(
            (account: UserDetail) => account.role === roleFilter
          );
        }

        setAccounts(fetchedAccounts);
      } catch (err) {
        setError("Error fetching accounts.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [dispatch, roleFilter]);

  return { accounts, loading, error };
};
