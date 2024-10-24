import { message, Modal, Pagination, Table } from "antd";
import useVoucher from "../../hooks/Voucher/useVoucher";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import useDeleteVoucher from "../../hooks/Voucher/useDeleteVoucher";

const { confirm } = Modal;

const Voucher = () => {
  const { voucher, loading, refetchVouchers } = useVoucher();
  const { handleDeleteVoucher } = useDeleteVoucher();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  const columns = [
    { title: "Name", dataIndex: "voucherName", key: "voucherName" },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          {" "}
          <DeleteOutlined
            onClick={() => showDeleteConfirm(record.voucherId)}
            style={{ color: "red", marginLeft: 12 }}
          />
        </>
      ),
    },
  ];
  const showDeleteConfirm = (voucherId: number) => {
    confirm({
      title: "Are you sure delete this job position?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        await handleDeleteVoucher(voucherId);
        message.success("Job deleted successfully!");
        refetchVouchers();
      },
      onCancel() {
        console.log("Cancel deletion");
      },
    });
  };
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
