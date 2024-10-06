import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
// import { allTotalPaginationData } from "../../models/tableParam";
import { allMajorPaginationData } from "../../models/major";
import { fetchAllMajorPagination } from "../../redux/slice/majorSlice";
import CreateMajor from "../../components/Majors/CreateMajor";
import MenuAdmin from "../../components/Layout/MenuAdmin";

const Major = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [major, setMajor] = useState<allMajorPaginationData[]>([]);
  const majors = useAppSelector((state) => state.major.majors);
  const [searchTerm, setSearchTerm] = useState("");
  // const [total, setTotal] = useState<allTotalPaginationData | any>();
  useEffect(() => {
    fetchServices(searchTerm);
  }, [dispatch, searchTerm]);

  const fetchServices = async (name: string) => {
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
    <>
      <div className="flex">
        <input
          type="text"
          placeholder="Search by major name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input
          style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
        />
        <CreateMajor />
      </div>
      <div className="grid grid-cols-12 gap-4 p-2 bg-slate-100 h-[91vh]">
        <div className="col-span-2 bg-white p-2 rounded-lg shadow-lg  ">
          <MenuAdmin />
        </div>

        <div className="col-span-10">
          {loading ? (
            <div>Loading...</div>
          ) : major.length > 0 ? (
            major.map((m) => (
              <div key={m.majorCode}>{m.majorCode}</div> // Render majorCode
            ))
          ) : (
            <div>No majors available.</div> // Message if no majors are found
          )}
        </div>
      </div>
    </>
  );
};
export default Major;
