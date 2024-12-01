
import { createCertProps } from "../../models/certificate";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { createCertFailure, createCertStart, createCertSuccess } from "../../redux/slice/Certification/createSelectedCertSlice";
import agent from "../../utils/agent";

export function useCreateSelectedCert() {
  const state = useAppSelector((state) => state.createCertificate);
  const dispatch = useAppDispatch();

  const handleCreateCert = async (certificationData: createCertProps) => {
    dispatch(createCertStart());
    try {
      const response = await agent.selectedCert.createSelectedCert(
        certificationData
      );
      dispatch(createCertSuccess(response));
    } catch (error) {
      console.error("Error creating certification:", error);
      dispatch(createCertFailure());
    }
  };

  return { state, handleCreateCert };
}
