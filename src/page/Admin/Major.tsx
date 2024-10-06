import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allMajorPaginationData } from "../../models/major";
import { fetchAllMajorPagination } from "../../redux/slice/majorSlice";
import CreateMajor from "../../components/Majors/CreateMajor";
import MenuAdmin from "../../components/Layout/MenuAdmin";
import { Input, Button } from "antd"; // Import Input and Button from antd
import { SearchOutlined } from "@ant-design/icons";

const Major = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [major, setMajor] = useState<allMajorPaginationData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchServices(); // Fetch services initially
  }, [dispatch]);

  const fetchServices = async (name?: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllMajorPagination(name)); // Pass the search term to the API call
      setMajor(response.payload.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchServices(searchTerm); // Call fetchServices with the searchTerm
  };

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <Input
            placeholder="Search by major name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "20px", padding: "10px", width: "80%" }}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            style={{ marginLeft: "10px" }}
          ></Button>
        </div>
        <CreateMajor />
      </div>
      <div className="grid grid-cols-12 gap-4 p-2 bg-slate-100 h-[91vh]">
        <div className="col-span-2 bg-white p-2 rounded-lg shadow-lg">
          <MenuAdmin />
        </div>

        <div className="col-span-10">
          {loading ? (
            <div>Loading...</div>
          ) : major.length > 0 ? (
            major.map((m) => (
              <div key={m.majorId}>{m.majorName}</div> // Render majorName
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
