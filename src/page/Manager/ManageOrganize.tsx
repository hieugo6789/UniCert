import { Pagination, Table, Tag } from "antd";
import ViewOrganize from "../../components/Organization/ViewOrganize";
import { useState } from "react";
import useOrganization from "../../hooks/Organization/useOrganization";
import UpdatePermission from "../../components/Permission/UpdatePermission";
import useOrganizePermission from "../../hooks/Organization/useOrganizePermission";
import { useNavigate } from "react-router-dom";

const ManageOrganize = () => {
  const navigate = useNavigate();
  const { organization, loading, refetchOrganizations } = useOrganization();
  const { updatePermissionOrganizeDetails } = useOrganizePermission();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };
  const columns = [
    { title: "Name", dataIndex: "organizeName", key: "organizeName" },
    { title: "Contact", dataIndex: "organizeContact", key: "organizeContact" },
    {
      title: "Address",
      dataIndex: "organizeAddress",
      key: "organizeAddress",
    },
    {
      title: "Status",
      dataIndex: "organizePermission",
      key: "organizePermission",
      render: (permission: string) => {
        let color = "";
        switch (permission) {
          case "Approve":
            color = "green";
            break;
          case "Reject":
            color = "red";
            break;
          case "Pending":
            color = "blue";
            break;
          default:
            color = "default";
            break;
        }
        return (
          <Tag
            color={color}
            className="flex justify-center w-16"
          >
            {permission}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          <div onClick={(e) => e.stopPropagation()}>
            <ViewOrganize organizeId={record.organizeId} />
            <UpdatePermission
              Id={record.organizeId}
              refetch={refetchOrganizations}
              updateFunction={updatePermissionOrganizeDetails}
            />
          </div>
        </>
      ),
    },
  ];
  const paginatedData = organization.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <>
      <div className="gap-4 p-2  h-full">
        <div className=" bg-white p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
          <div className="h-[76vh]">
            {loading ? (
              <div>Loading...</div>
            ) : organization.length > 0 ? (
              <Table
                columns={columns}
                dataSource={paginatedData}
                rowKey="organizeId"
                pagination={false}
                loading={loading}
                rowClassName={() => "h-[8.7vh]"}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      navigate(`/manager/organizations/${record.organizeId}`);
                    },
                  };
                }}
                className="header-bg-pink"
              />
            ) : (
              <div>No organizations available.</div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={organization.length}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageOrganize;
