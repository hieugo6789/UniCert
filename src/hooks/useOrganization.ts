import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hook";
import { allOrganizationPaginationData } from "../models/organization";
import { fetchAllOrganizationPagination } from "../redux/slice/organizationSlice";

const useOrganization = () => {
  const dispatch = useAppDispatch();
  const [organization, setOrganization] = useState<
    allOrganizationPaginationData[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrganizations = async (name?: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllOrganizationPagination(name));
      setOrganization(response.payload.data || []);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, [dispatch]);
  return { organization, loading, refetchOrganizations: fetchOrganizations };
};
export default useOrganization;
