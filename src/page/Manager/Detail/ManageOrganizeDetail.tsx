import { useNavigate, useParams } from "react-router-dom";
import useOrganizePermission from "../../../hooks/Organization/useOrganizePermission";
import { useEffect, useState } from "react";
import useOrganizeDetail from "../../../hooks/Organization/useOrganizeDetail";
import { currentOrganization } from "../../../models/organization";
import { Button, Descriptions } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import DetailPermission from "../../../components/Permission/DetailPermission";

const ManageOrganizeDetail = () => {
  const organizeId = useParams().id;
  const navigate = useNavigate();
  const { state, getOrganizeDetails } = useOrganizeDetail();
  const [organization, setOrganization] = useState<
    currentOrganization | undefined
  >(undefined);
  const { updatePermissionOrganizeDetails } = useOrganizePermission();

  const mapStatusToNumber = (status: string): number => {
    switch (status) {
      case "Pending":
        return 0;
      case "Approve":
        return 1;
      case "Reject":
        return 2;
      default:
        return 0;
    }
  };

  useEffect(() => {
    const fetchOrganizationDetail = async () => {
      try {
        getOrganizeDetails(organizeId);
      } catch (error) {
        console.error("Error fetching certificate details:", error);
      }
    };
    fetchOrganizationDetail();
  }, [organizeId]);

  useEffect(() => {
    if (state?.currentOrganize) {
      setOrganization(state.currentOrganize);
    }
  }, [state.currentOrganize]);

  if (!state.currentOrganize) {
    return <p className="text-center mt-10">No job details found.</p>;
  }
  return (
    <>
      <div className="relative">
        <Button
          type="link"
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 font-semibold text-lg flex items-center gap-2 transition-all absolute bottom-4"
        >
          <span className="text-2xl mb-1">←</span> Back
        </Button>
      </div>
      <div className="p-2">
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl text-blue-600">Job Details</h3>
            <DetailPermission
              Id={Number(organizeId)}
              updateFunction={updatePermissionOrganizeDetails}
              initialStatus={mapStatusToNumber(
                state.currentOrganize?.organizePermission || "Pending"
              )}
              onUpdateSuccess={() => getOrganizeDetails(organizeId)}
            />
          </div>
          <Descriptions
            bordered
            size="middle"
            column={1}
            className="mb-4"
            labelStyle={{ width: "150px", fontWeight: "bold" }} 
            contentStyle={{ width: "300px", textAlign: "left" }}
          >
            <Descriptions.Item label="Name">
              <span className="text-blue-700">
                {organization?.organizeName}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Contact">
              <span className="text-gray-600">
                {state.currentOrganize.organizeContact}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              <HomeOutlined />{" "}
              <span className="text-gray-600">
                {state.currentOrganize.organizeAddress}
              </span>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </>
  );
};
export default ManageOrganizeDetail;
