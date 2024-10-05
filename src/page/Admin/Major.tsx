import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
// import { allTotalPaginationData } from "../../models/tableParam";
import { allMajorPaginationData } from "../../models/major";
import { fetchAllMajorPagination } from "../../redux/slice/majorSlice";

const Major = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [major, setMajor] = useState<allMajorPaginationData[]>([]);
  const majors = useAppSelector((state) => state.major.majors);
  // const [total, setTotal] = useState<allTotalPaginationData | any>();
  useEffect(() => {
    fetchServices();
  }, [dispatch]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllMajorPagination());
      console.log(response);
      setMajor(response.payload.data || []);
      // const response1 = await dispatch(fetchTotalShopPagination());
      // setTotal(response1.payload || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {major.length > 0 ? (
        major.map((m) => (
          <div key={m.majorCode}>{m.majorCode}</div> // Add unique key for each major
        ))
      ) : (
        <div>No majors available.</div> // Message when no majors are found
      )}
    </div>
  );
};
export default Major;
