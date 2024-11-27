
import { useAppDispatch, useAppSelector } from "../../redux/hook"; // Chỉnh hook Redux
import { CertCostFailure, CertCostStart, CertCostSuccess } from "../../redux/slice/Certification/getTotalCertSlice";
import agent from "../../utils/agent";

const useTotalCost = () => {
  const dispatch = useAppDispatch();
  const { cost, isLoading, error } = useAppSelector((state) => state.certCost);

  const fetchCost = async (certIdList: number[]) => {
    dispatch(CertCostStart());
    try {
      // Giả sử có API để fetch cost topN certificates
      const response = await agent.Certificate.getTotalCertCost(certIdList);
    //   const data = await response.json();
      console.log(response.data);
      dispatch(CertCostSuccess(response.data)); // Giả sử dữ liệu có `cost`
    } catch (err) {
      console.error("Error fetching certificates.", err);
      dispatch(CertCostFailure());
    }
  };

  return {
    cost,     // Chi phí tổng của chứng chỉ
    isLoading,
    error,
    fetchCost
  };
};

export default useTotalCost;
