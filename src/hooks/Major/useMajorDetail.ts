import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  MajorDetailFailure,
  MajorDetailsStart,
  MajorDetailSuccess,
} from "../../redux/slice/majorDetailSlice";
import agent from "../../utils/agent";

const useMajorDetail = () => {
  const state = useAppSelector((state) => state.majorDetail);
  const dispatch = useAppDispatch();
  const getMajorDetails = async (id: string | undefined) => {
    dispatch(MajorDetailsStart());
    try {
      const response = await agent.Major.getDetailMajor(id);
      dispatch(MajorDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching Major details:", error);
      dispatch(MajorDetailFailure());
    }
  };
  return { state, getMajorDetails };
};
export default useMajorDetail;
