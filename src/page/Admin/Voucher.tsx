import { Pagination, Table } from "antd";
import useVoucher from "../../hooks/Voucher/useVoucher";
import { useState } from "react";

const Voucher = () => {
  // const { voucher, loading, refetchVouchers } = useVoucher();
  const { voucher, loading } = useVoucher();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  const columns = [
    { title: "Name", dataIndex: "voucherName", key: "voucherName" },
  ];
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };
  const paginatedData = voucher.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <>
      <div className="h-[76vh]">
        {loading ? (
          <div>Loading...</div>
        ) : voucher.length > 0 ? (
          <Table
            columns={columns}
            dataSource={paginatedData}
            rowKey="organizeId"
            pagination={false}
            loading={loading}
            rowClassName={() => "h-[8.7vh]"}
          />
        ) : (
          <div>No vouchers available.</div>
        )}
      </div>
      <div className="mt-6 flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={voucher.length}
          onChange={handlePaginationChange}
        />
      </div>
    </>
  );
};
export default Voucher;
