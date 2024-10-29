import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UpdateDetailOrganizeFailure,
  UpdateDetailOrganizeStart,
  UpdateDetailOrganizeSuccess,
} from "../../redux/slice/Organize/organizeDetailSlice";
import agent from "../../utils/agent";

const useOrganizePermission = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.organizeDetail);

  const updatePermissionOrganizeDetails = async (
    organizeId: number,
    data: number
  ) => {
    dispatch(UpdateDetailOrganizeStart());
    try {
      const response = await agent.Organization.updateOrganizePermission(
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
          error.message || "Failed to update organize detail"
        )
      );
    }
  };

  return {
    updatePermissionOrganizeDetails,
    state,
  };
};
export default useOrganizePermission;
