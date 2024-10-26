import { updateCart } from "../../models/cart";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UpdateDetailCartFailure,
  UpdateDetailCartStart,
  UpdateDetailCartSuccess,
} from "../../redux/slice/Cart/CartSlice";
import agent from "../../utils/agent";

const useUpdateCart = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.cart);

  const updateCart = async (userId: string, data: updateCart) => {
    dispatch(UpdateDetailCartStart());
    try {
      const response = await agent.Cart.updateCart(userId, data);
      console.log("Response:", response);
      dispatch(UpdateDetailCartSuccess(response.data));
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      dispatch(
        UpdateDetailCartFailure(error.message || "Failed to update cart detail")
      );
    }
  };

  return {
    updateCart,
    state,
  };
};
export default useUpdateCart;
