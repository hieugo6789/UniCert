import { updateOrganize } from "../../models/organization";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UpdateDetailOrganizeFailure,
  UpdateDetailOrganizeStart,
  UpdateDetailOrganizeSuccess,
} from "../../redux/slice/Organize/organizeDetailSlice";
import agent from "../../utils/agent";

const useUpdateOrganize = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.organizeDetail);

  const updateOrganize = async (organizeId: string, data: updateOrganize) => {
    dispatch(UpdateDetailOrganizeStart());
    try {
      const response = await agent.Organization.updateOrganization(
        organizeId,
        data
      );
      console.log("Response:", response);
      dispatch(UpdateDetailOrganizeSuccess(response.data));
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response) {
        // Log the response data for more details
        console.error("Response data:", error.response.data);
      }
      dispatch(
        UpdateDetailOrganizeFailure(
          error.message || "Failed to update organize"
        )
      );
    }
  };

  return {
    updateOrganize,
    state,
  };
};
export default useUpdateOrganize;
