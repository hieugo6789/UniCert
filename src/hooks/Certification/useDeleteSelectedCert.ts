import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { deleteCertificateFailure, deleteCertificateSuccess } from "../../redux/slice/Certification/deleteSelectedCertSlice";

import agent from "../../utils/agent";

const useDeleteSelectedCert = () => {
  const state = useAppSelector((state) => state.getSelectedCert);
  const dispatch = useAppDispatch();

  const handleDeleteCertificate = async (certId: number) => {
    dispatch(deleteCertificateFailure());
    try {
      const response = await agent.Certificate.deleteCertificate(certId);
      dispatch(deleteCertificateSuccess(response.data));
    } catch (error) {
      console.error("Error deleting certification:", error);
      dispatch(deleteCertificateFailure());
    }
  };
  return { state, handleDeleteCertificate };
};
export default useDeleteSelectedCert;
