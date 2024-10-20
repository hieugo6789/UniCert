import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allMajorPaginationData } from "../../models/major";
import { fetchAllMajorPagination } from "../../redux/slice/majorSlice";

const useMajor = () => {
  const dispatch = useAppDispatch();
  const [major, setMajor] = useState<allMajorPaginationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMajors = async (name?: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllMajorPagination(name)); // Pass the search term to the API call
      setMajor(response.payload.data || []);
    } catch (err) {
      console.log("Error fetching majors.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMajors(); // Fetch services initially
  }, [dispatch]);
  return {
    major,
    loading,
    refetchMajors: fetchMajors,
  };
};
export default useMajor;
