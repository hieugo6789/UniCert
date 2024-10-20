import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  OrganizeDetailFailure,
  OrganizeDetailsStart,
  OrganizeDetailSuccess,
} from "../../redux/slice/organizeDetailSlice";

import agent from "../../utils/agent";

const useOrganizeDetail = () => {
  const state = useAppSelector((state) => state.organizeDetail);
  const dispatch = useAppDispatch();
  const getOrganizeDetails = async (id: string | undefined) => {
    dispatch(OrganizeDetailsStart());
    try {
      const response = await agent.Organization.getOrganizationDetail(id);
      dispatch(OrganizeDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching Organization details:", error);
      dispatch(OrganizeDetailFailure());
    }
  };
  return { state, getOrganizeDetails };
};
export default useOrganizeDetail;
