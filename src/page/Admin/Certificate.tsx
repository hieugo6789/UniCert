import { Button, Form, Input, Pagination, Table } from "antd";
import MenuAdmin from "../../components/Layout/MenuAdmin";
import useCertificate from "../../hooks/useCertificate";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

const Certificate = () => {
  const { certificate, loading, refetchCertificates } = useCertificate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");

  const [form] = Form.useForm();
  const handleSearch = () => {
    refetchCertificates(searchTerm); // Call fetchServices with the searchTerm
  };
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    { title: "Name", dataIndex: "certName", key: "certName" },
    { title: "Code", dataIndex: "certCode", key: "certCode" },
    { title: "Expire", dataIndex: "expiryDate", key: "expiryDate" },
  ];

  // Paginated data
  const paginatedData = certificate.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <>
      <div className="h-[10vh] ">
        <div className="flex  items-center mb-4">
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
          <Button
            type="primary"
            // onClick={showModal}
          >
            + Certificate
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className="col-span-2">
          <MenuAdmin />
        </div>
        <div className="col-span-10 bg-white p-4 rounded-lg shadow-lg">
          <div className="h-[76vh]">
            {loading ? (
              <div>Loading...</div>
            ) : certificate.length > 0 ? (
              <Table
                columns={columns}
                dataSource={paginatedData}
                rowKey="certId"
                pagination={false}
                loading={loading}
                rowClassName={() => "h-[8.7vh]"}
              />
            ) : (
              <div>No organizations available.</div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={certificate.length}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Certificate;
