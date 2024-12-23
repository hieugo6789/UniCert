import { Button, Descriptions, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCertDetail from "../../hooks/Certification/useCertDetail";
import { allCertificationData } from "../../models/certificate";
import ScheduleForCert from "../../components/Calendar/ScheduleForCert";
import DetailPermission from "../../components/Permission/DetailPermission";
import useCertPermission from "../../hooks/Certification/useCertPermission";

const ManageCertDetail = () => {
  const { updatePermissionCertDetails } = useCertPermission();
  const certId = Number(useParams().id);
  const { state, getCertDetails } = useCertDetail();
  const [cert, setCertificate] = useState<allCertificationData | undefined>(
    undefined
  );
  const navigate = useNavigate();

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
    const fetchCertificateDetail = async () => {
      try {
        getCertDetails(certId);
      } catch (error) {
        console.error("Error fetching certificate details:", error);
      }
    };
    fetchCertificateDetail();
  }, [certId]);

  useEffect(() => {
    setCertificate(state?.currentCert);
  }, [state.currentCert]);

  if (!state.currentCert) {
    return <p className="text-center mt-10">No certificate details found.</p>;
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
            <h3 className="text-2xl text-blue-600">Certification Details</h3>
            <DetailPermission
              Id={certId}
              updateFunction={updatePermissionCertDetails}
              initialStatus={mapStatusToNumber(
                state.currentCert?.permission || "Pending"
              )}
              onUpdateSuccess={() => getCertDetails(certId)}
            />
          </div>
          <div className="flex ">
            <Descriptions
              bordered
              size="middle"
              column={1}
              labelStyle={{ fontWeight: "bold" }}
              contentStyle={{ textAlign: "left" }}
              className="ant-descriptions min-w-10000 "
            >
              <Descriptions.Item label="Name">
                <span className="text-blue-700">{cert?.certName}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Code">
                <span className="text-gray-600">
                  {state.currentCert.certCode}
                </span>
              </Descriptions.Item>

              <Descriptions.Item label="Point System">
                <div
                  className="prose list-disc whitespace-pre-wrap text-sm"
                  dangerouslySetInnerHTML={{
                    __html: state.currentCert.certPointSystem || "",
                  }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Image">
                {state.currentCert.certImage ? (
                  <img
                    src={state.currentCert.certImage}
                    alt="Certification"
                    className="w-32 h-32 bg-gray-300 mb-4"
                  />
                ) : (
                  <p>Loading image...</p>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Cost for Official Exam">
                {state.currentCert.certCost} $
              </Descriptions.Item>
              <Descriptions.Item label="Validity Period">
                {state.currentCert.certValidity}
              </Descriptions.Item>
              <Descriptions.Item label="Prerequisite Certifications">
                {state.currentCert.certPrerequisite?.length
                  ? state.currentCert.certPrerequisite.map(
                      (prerequisite, index) => (
                        <Tag
                          color="blue"
                          key={index}
                        >
                          {prerequisite}
                        </Tag>
                      )
                    )
                  : "No Prerequisite Certifications"}
              </Descriptions.Item>
              <Descriptions.Item label="Organization">
                {state.currentCert.organizeName}
              </Descriptions.Item>
              <Descriptions.Item label="Level">
                {state.currentCert.typeName}
              </Descriptions.Item>
              <Descriptions.Item label="Job Positions">
                {state.currentCert.jobPositionNames?.length
                  ? state.currentCert.jobPositionNames.map((job, index) => (
                      <Tag
                        color="purple"
                        key={index}
                      >
                        {job}
                      </Tag>
                    ))
                  : "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Major">
                {state.currentCert.majorNames?.length
                  ? state.currentCert.majorNames.map((major, index) => (
                      <Tag
                        color="green"
                        key={index}
                      >
                        {major}
                      </Tag>
                    ))
                  : "None"}
              </Descriptions.Item>
            </Descriptions>
            <div className="border border-l-0 rounded-e-lg p-4 w-full">
              <div
                className="prose list-disc whitespace-pre-wrap text-sm"
                dangerouslySetInnerHTML={{
                  __html: state.currentCert.certDescription || "",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-2">
        <ScheduleForCert />
      </div>
    </>
  );
};
export default ManageCertDetail;
