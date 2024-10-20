import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  deleteCertificateFailure,
  deleteCertificateStart,
  deleteCertificateSuccess,
} from "../../redux/slice/deleteCertificateSlice";

import agent from "../../utils/agent";

const useDeleteCertificate = () => {
  const state = useAppSelector((state) => state.certificateDelete);
  const dispatch = useAppDispatch();

  const handleDeleteCertificate = async (certId: string) => {
    dispatch(deleteCertificateStart());
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
export default useDeleteCertificate;
