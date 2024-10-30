import { message, Modal, Pagination, Spin, Table, Tag } from "antd";
import useVoucher from "../../hooks/Voucher/useVoucher";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import useDeleteVoucher from "../../hooks/Voucher/useDeleteVoucher";
import CreateVoucher from "../../components/Voucher/CreateVoucher";
import UpdateVoucher from "../../components/Voucher/UpdateVoucher";
import useVoucherDetail from "../../hooks/Voucher/useVoucherDetail";

const { confirm } = Modal;

const Voucher = () => {
  const { voucher, loading, refetchVouchers } = useVoucher();
  const { state, getVoucherDetails } = useVoucherDetail();
  const { handleDeleteVoucher } = useDeleteVoucher();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleView = async (voucherId: number) => {
    setIsModalVisible(true);
    await getVoucherDetails(voucherId);
  };

  const columns = [
    { title: "Name", dataIndex: "voucherName", key: "voucherName" },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage: number) => (
        <Tag
          color={percentage >= 50 ? "volcano" : "geekblue"}
          style={{ fontWeight: "bold" }}
          className="flex justify-center max-w-16"
        >
          {percentage}%
        </Tag>
      ),
    },
    {
      title: "Expire Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (expiryDate: string) => {
        const formattedDate = new Date(expiryDate).toLocaleDateString();
        return formattedDate;
      },
    },
    {
      title: "Status",
      dataIndex: "voucherStatus",
      key: "voucherStatus",
      render: (status: boolean) => (
        <Tag
          color={status ? "green" : "red"}
          className=" flex justify-center max-w-16"
        >
          {status ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          <EyeOutlined
            onClick={() => handleView(record.voucherId)}
            style={{ color: "blue" }}
          />
          <UpdateVoucher
            voucherId={record.voucherId}
            refetchVouchers={refetchVouchers}
          />
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
      <CreateVoucher refetchVouchers={refetchVouchers} />
      <div className="h-[76vh]">
        {loading ? (
          <div>Loading...</div>
        ) : voucher.length > 0 ? (
          <Table
            columns={columns}
            dataSource={paginatedData}
            rowKey="voucherId"
            pagination={false}
            loading={loading}
            rowClassName={() => "h-[8.7vh]"}
            // className="header-bg-pink"
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
      <Modal
        title="Voucher Details"
        width={900}
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentVoucher ? (
          <div className="text-lg">
            <p>
              <strong>Name: </strong> {state.currentVoucher.voucherName}
            </p>
            <p>
              <strong>Description: </strong>{" "}
              {state.currentVoucher.voucherDescription}
            </p>
            <p>
              <strong>Percentage: </strong> {state.currentVoucher.percentage}%
            </p>
            <p>
              <strong>Start date: </strong>
              {new Date(state.currentVoucher.creationDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Expire date: </strong>
              {new Date(state.currentVoucher.expiryDate).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};
export default Voucher;
