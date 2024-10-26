import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  CartDetailFailure,
  CartDetailsStart,
  CartDetailSuccess,
} from "../../redux/slice/Cart/CartSlice";

import agent from "../../utils/agent";

const useCartByUserId = () => {
  const state = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const getCart = async (userId: string) => {
    dispatch(CartDetailsStart());
    try {
      const response = await agent.Cart.getCartByUserId(userId);
      dispatch(CartDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching Cart details:", error);
      dispatch(CartDetailFailure());
    }
  };
  return { state, getCart };
};
export default useCartByUserId;
