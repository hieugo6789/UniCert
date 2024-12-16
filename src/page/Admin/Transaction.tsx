import { Table, Tag } from "antd";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import AdminNotification from "../../components/Notification/AdminNotification";
import useAllTransaction from "../../hooks/Transactions/useAllTransaction";

const Transaction = () => {
  const { historyTransaction, loading } = useAllTransaction();

  const renderStatusTag = (status: string) => {
    switch (status) {
      case "Success":
        return (
          <span className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-b from-green-50 to-green-300 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="maroon"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <div className="ml-2">Deposit</div>
          </span>
        );

      case "Refunded":
        return (
          <span className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-b from-pink-100 to-pink-400 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="maroon"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </div>
            <div className="ml-2">Refund</div>
          </span>
        );
      default:
        return <Tag className="rounded-3xl">{status}</Tag>;
    }
  };
  // Define the columns for Ant Design Table
  const columns = [
    {
      title: "Type",
      dataIndex: "transStatus",
      key: "transStatus",
      render: (status: string) => renderStatusTag(status),
    },
    {
      title: "Wallet ID",
      dataIndex: "walletId",
      key: "walletId",
    },
    {
      title: "Description",
      dataIndex: "transDesription",
      key: "transDesription",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => amount.toLocaleString("vi-VN"),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) =>
        new Date(
          new Date(date).setHours(new Date(date).getHours() + 7)
        ).toLocaleString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
  ];

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <>
      <div className="h-[9vh] flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold ml-6">History Transaction</h2>
        </div>
        <div className="mr-10 flex items-center">
          <div className="mr-6">
            <AdminNotification />
          </div>
          <AvatarAdmin />
        </div>
      </div>
      <div className="px-6">
        <Table
          columns={columns}
          dataSource={historyTransaction
            .filter((transaction) => transaction.transStatus !== "Pending")
            .map((transaction) => ({
              ...transaction,
              key: transaction.transactionId,
            }))}
          pagination={false}
        />
      </div>
    </>
  );
};

export default Transaction;
