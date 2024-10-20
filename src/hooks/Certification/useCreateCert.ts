import { createCertificate } from "../../models/certificate";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  createCertFailure,
  createCertStart,
  createCertSuccess,
} from "../../redux/slice/Certification/createCertSlice";
import agent from "../../utils/agent";

export function useCreateCert() {
  const state = useAppSelector((state) => state.createCertificate);
  const dispatch = useAppDispatch();

  const handleCreateCert = async (certificationData: createCertificate) => {
    dispatch(createCertStart());
    try {
      const response = await agent.Certificate.createCertificate(
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
