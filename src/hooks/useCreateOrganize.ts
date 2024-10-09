import { createOrganizationModel } from "../models/organization";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  createOrganizeFailure,
  createOrganizeStart,
  createOrganizeSuccess,
} from "../redux/slice/createOrganizeSlice";
import agent from "../utils/agent";

export function useCreateOrganize() {
  const state = useAppSelector((state) => state.createOrganization);
  const dispatch = useAppDispatch();

  const handleCreateOrganize = async (
    organizationData: createOrganizationModel
  ) => {
    dispatch(createOrganizeStart());
    try {
      const response = await agent.Organization.createOrganize(
        organizationData
      );
      dispatch(createOrganizeSuccess(response));
    } catch (error) {
      console.error("Error creating class:", error);
      dispatch(createOrganizeFailure());
    }
  };

  return { state, handleCreateOrganize };
}
