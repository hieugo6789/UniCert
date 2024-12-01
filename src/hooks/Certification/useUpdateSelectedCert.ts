
import { createCertProps } from "../../models/certificate";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { updateCertFailure, updateCertStart, updateCertSuccess } from "../../redux/slice/Certification/updateSelectedCertSlice";
import agent from "../../utils/agent";

export function useUpdateSelectedCert() {
  const state = useAppSelector((state) => state.createCertificate);
  const dispatch = useAppDispatch();

  const handleCreateCert = async (certificationData: createCertProps) => {
    dispatch(updateCertStart());
    try {
      const response = await agent.selectedCert.createSelectedCert(
        certificationData
      );
      dispatch(updateCertSuccess(response));
    } catch (error) {
      console.error("Error creating certification:", error);
      dispatch(updateCertFailure());
    }
  };

  return { state, handleCreateCert };
}
