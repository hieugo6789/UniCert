import { updateCert } from "../../models/certificate";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UpdateDetailCertFailure,
  UpdateDetailCertStart,
  UpdateDetailCertSuccess,
} from "../../redux/slice/certDetailSlice";
import agent from "../../utils/agent";

const useUpdateCert = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.certificateDetail);

  const updateCertDetails = async (certId: string, data: updateCert) => {
    dispatch(UpdateDetailCertStart());
    try {
      const response = await agent.Certificate.updateCertificate(certId, data);
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
    updateCertDetails,
    state,
  };
};
export default useUpdateCert;
