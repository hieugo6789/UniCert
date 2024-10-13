import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  deleteOrganizeFailure,
  deleteOrganizeStart,
  deleteOrganizeSuccess,
} from "../redux/slice/deleteOrganizeSlice";
import agent from "../utils/agent";

const useDeleteOrganize = () => {
  const state = useAppSelector((state) => state.deleteOrganization);
  const dispatch = useAppDispatch();

  const handleDeleteOrganize = async (organizeId: string) => {
    dispatch(deleteOrganizeStart());
    try {
      const response = await agent.Organization.deleteOrganize(organizeId);
      dispatch(deleteOrganizeSuccess(response.data));
    } catch (error) {
      console.error("Error deleting organization:", error);
      dispatch(deleteOrganizeFailure());
    }
  };
  return { state, handleDeleteOrganize };
};
export default useDeleteOrganize;
