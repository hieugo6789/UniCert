import { useState } from "react";
import CreateMajor from "../../components/Majors/CreateMajor";
import MenuAdmin from "../../components/Layout/MenuAdmin";
import { Input, Button } from "antd"; // Import Input and Button from antd
import { SearchOutlined } from "@ant-design/icons";
import useMajor from "../../hooks/useMajor";

const Major = () => {
  const { major, loading, refetchMajors } = useMajor();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    refetchMajors(searchTerm);
  };

  return (
    <>
      <div className="grid grid-cols-12 h-[10vh]">
        <div className="col-span-8">
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
      <div className="grid grid-cols-12 gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className="col-span-2">
          <MenuAdmin />
        </div>

        <div className="col-span-10 bg-white p-4 rounded-lg shadow-lg">
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
