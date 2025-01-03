import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  CertDetailFailure,
  CertDetailsStart,
  CertDetailSuccess,
} from "../../redux/slice/Certification/certDetailSlice";

import agent from "../../utils/agent";

const useCertDetail = () => {
  const state = useAppSelector((state) => state.certificateDetail);
  const dispatch = useAppDispatch();
  const getCertDetails = async (id: number | undefined) => {
    dispatch(CertDetailsStart());
    try {
      const response = await agent.Certificate.getCertificateDetail(id);
      dispatch(CertDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching Certificate details:", error);
      dispatch(CertDetailFailure());
    }
  };
  return { state, getCertDetails };
};
export default useCertDetail;
