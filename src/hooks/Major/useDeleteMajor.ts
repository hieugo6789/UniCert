import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  deleteMajorFailure,
  deleteMajorStart,
  deleteMajorSuccess,
} from "../../redux/slice/Major/deleteMajorSlice";
import agent from "../../utils/agent";

const useDeleteMajor = () => {
  const state = useAppSelector((state) => state.majorDelete);
  const dispatch = useAppDispatch();

  const handleDeleteMajor = async (majorId: string) => {
    dispatch(deleteMajorStart());
    try {
      const response = await agent.Major.deleteMajor(majorId);
      dispatch(deleteMajorSuccess(response.data));
    } catch (error) {
      console.error("Error deleting certification:", error);
      dispatch(deleteMajorFailure());
    }
  };
  return { state, handleDeleteMajor };
};
export default useDeleteMajor;
