import { message, Modal, Pagination, Spin, Table, Tag } from "antd";
import useVoucher from "../../hooks/Voucher/useVoucher";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import useDeleteVoucher from "../../hooks/Voucher/useDeleteVoucher";
import CreateVoucher from "../../components/Voucher/CreateVoucher";
import UpdateVoucher from "../../components/Voucher/UpdateVoucher";
import useVoucherDetail from "../../hooks/Voucher/useVoucherDetail";
import bronze from "../../assets/userLevel/bronze.png";
import silver from "../../assets/userLevel/silver.png";
import gold from "../../assets/userLevel/star.png";
import diamond from "../../assets/userLevel/diamond.png";

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
      title: "Level",
      dataIndex: "voucherLevel",
      key: "voucherLevel",
      render: (voucherLevel: string) => {
        const levelImages: { [key: string]: string } = {
          Bronze: bronze,
          Silver: silver,
          Gold: gold,
          Diamond: diamond,
        };

        return (
          <div className="flex items-center">
            {levelImages[voucherLevel] && (
              <img
                src={levelImages[voucherLevel]}
                alt={voucherLevel}
                className="size-8"
              />
            )}
          </div>
        );
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
      title: "Are you sure you want to delete this voucher?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        await handleDeleteVoucher(voucherId);
        message.success("Voucher deleted successfully!");
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
      <div className="gap-4 p-2 h-full">
        <div className="relative bg-white p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
          <div className="mb-2 flex justify-start absolute -top-14">
            <CreateVoucher refetchVouchers={refetchVouchers} />
          </div>

          <div className="h-[77vh]">
            {loading ? (
              <div>Loading...</div>
            ) : voucher.length > 0 ? (
              <Table
                columns={columns}
                dataSource={paginatedData}
                rowKey="voucherId"
                pagination={false}
                loading={loading}
                rowClassName={() => "h-[8.2vh]"}
                className="header-bg-pink"
              />
            ) : (
              <div>No vouchers available.</div>
            )}
          </div>
          <div className="mt-2 flex justify-end">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={voucher.length}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
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
          <div className="text-lg space-y-4">
            {/* Name */}
            <p>
              <strong>Name: </strong>
              <span className="text-blue-500">
                {state.currentVoucher.voucherName}
              </span>
            </p>
            <p>
              <strong>Description: </strong>
              {state.currentVoucher.voucherDescription}
            </p>
            <p>
              <strong>Percentage: </strong>
              <Tag color="green">{state.currentVoucher.percentage}%</Tag>
            </p>
            <p>
              <strong>Start Date: </strong>
              <Tag
                icon={<CheckCircleOutlined />}
                color="blue"
              >
                {new Date(
                  state.currentVoucher.creationDate
                ).toLocaleDateString()}
              </Tag>
            </p>
            <p>
              <strong>Expire Date: </strong>
              <Tag
                icon={
                  new Date(state.currentVoucher.expiryDate) > new Date() ? (
                    <CheckCircleOutlined />
                  ) : (
                    <CloseCircleOutlined />
                  )
                }
                color={
                  new Date(state.currentVoucher.expiryDate) > new Date()
                    ? "red"
                    : "gray"
                }
              >
                {new Date(state.currentVoucher.expiryDate).toLocaleDateString()}
              </Tag>
            </p>

            <p>
              <strong>Voucher Level: </strong>
              {(() => {
                switch (state.currentVoucher.voucherLevel) {
                  case "Bronze":
                    return <Tag color="default">Bronze</Tag>;
                  case "Silver":
                    return <Tag color="silver">Silver</Tag>;
                  case "Gold":
                    return <Tag color="gold">Gold</Tag>;
                  case "Diamond":
                    return <Tag color="purple">Diamond</Tag>;
                  default:
                    return <Tag color="default">Unknown</Tag>;
                }
              })()}
            </p>
            <p>
              <strong>Image: </strong> {state?.currentVoucher?.voucherImage ? (
                <img
                  src={state.currentVoucher.voucherImage}
                  alt="Certification"
                  className="w-32 h-32 bg-gray-300 mb-4"
                />
              ) : (
                <p>Loading image...</p>
              )}
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
