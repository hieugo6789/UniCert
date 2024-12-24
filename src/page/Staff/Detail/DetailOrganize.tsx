import { useNavigate, useParams } from "react-router-dom";
import useOrganizeDetail from "../../../hooks/Organization/useOrganizeDetail";
import { useEffect, useState } from "react";
import { currentOrganization } from "../../../models/organization";
import { Button, Descriptions } from "antd";
import Notification from "../../../components/Notification/Notification";
import AvatarAdmin from "../../../components/Header/AvatarAdmin";
import { HomeOutlined } from "@ant-design/icons";

const DetailOrganize = () => {
  const organizeId = useParams().id;
  const navigate = useNavigate();
  const { state, getOrganizeDetails } = useOrganizeDetail();
  const [organization, setOrganization] = useState<
    currentOrganization | undefined
  >(undefined);

  useEffect(() => {
    const fetchOrganizeDetail = async () => {
      try {
        getOrganizeDetails(organizeId);
      } catch (error) {
        console.error("Error fetching JobPosition details:", error);
      }
    };
    fetchOrganizeDetail();
  }, [organizeId]);

  useEffect(() => {
    setOrganization(state?.currentOrganize);
  }, [state]);

  if (!state.currentOrganize) {
    return <p className="text-center mt-10">No organization details found.</p>;
  }

  return (
    <>
      <div className="h-[10vh] flex justify-between items-center">
        <div className="flex items-center w-full ">
          <div>
            <Button
              type="link"
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:text-blue-800 font-semibold text-lg flex items-center gap-2 transition-all"
            >
              <span className="text-2xl mb-1">←</span> Back
            </Button>
          </div>
        </div>
        <div className="mr-10 flex items-center">
          <div className="mr-6">
            <Notification />
          </div>
          <AvatarAdmin />
        </div>
      </div>
      <div className="p-2">
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl text-blue-600">Organization Detail</h3>
            <div
              className={`text-sm px-3 py-1 rounded-md shadow ${
                organization?.organizePermission === "Approve"
                  ? "text-white bg-green-500"
                  : organization?.organizePermission === "Reject"
                  ? "text-white bg-red-500"
                  : "text-white bg-blue-500"
              }`}
            >
              {organization?.organizePermission === "Approve"
                ? "Approved"
                : organization?.organizePermission === "Reject"
                ? "Rejected"
                : "Pending"}
            </div>
          </div>
          <Descriptions
            bordered
            size="middle"
            column={1}
            className="mb-4"
            labelStyle={{ width: "150px", fontWeight: "bold" }} // Cố định độ dài label
            contentStyle={{ width: "300px", textAlign: "left" }}
          >
            <Descriptions.Item label="Name">
              <span className="text-blue-700">
                {state.currentOrganize.organizeName}
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
export default DetailOrganize;
