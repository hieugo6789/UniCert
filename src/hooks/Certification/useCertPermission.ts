import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UpdateDetailCertFailure,
  UpdateDetailCertStart,
  UpdateDetailCertSuccess,
} from "../../redux/slice/Certification/certDetailSlice";
import agent from "../../utils/agent";

const useCertPermission = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.certificateDetail);

  const updatePermissionCertDetails = async (certId: number, data: number) => {
    dispatch(UpdateDetailCertStart());
    try {
      const response = await agent.Certificate.updateCertPermission(
        certId,
        data
      );
      console.log("Response:", response);
      dispatch(UpdateDetailCertSuccess(response.data));
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response) {
        // Log the response data for more details
        console.error("Response data:", error.response.data);
      }
      dispatch(
        UpdateDetailCertFailure(error.message || "Failed to update cert detail")
      );
    }
  };

  return {
    updatePermissionCertDetails,
    state,
  };
};
export default useCertPermission;
