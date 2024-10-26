import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentCart } from "../../../models/cart";

export interface CartDetail {
  currentCart: currentCart;
  currentUpdateDetail: currentCart;
  isLoading: boolean;
  error: boolean;
}

const initialState: CartDetail = {
  currentCart: {} as currentCart,
  currentUpdateDetail: {} as currentCart,
  isLoading: false,
  error: false,
};
const CartDetailSlice = createSlice({
  name: "cartDetail",
  initialState,
  reducers: {
    CartDetailsStart: (state) => {
      state.isLoading = true;
    },
    CartDetailSuccess: (state, action: PayloadAction<currentCart>) => {
      state.isLoading = false;
      state.currentCart = action.payload;
      state.error = false;
    },
    CartDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    UpdateDetailCartStart: (state) => {
      state.isLoading = true;
    },
    UpdateDetailCartSuccess: (state, action: PayloadAction<currentCart>) => {
      state.isLoading = false;
      state.currentCart = action.payload;
      state.error = false;
    },
    UpdateDetailCartFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  CartDetailsStart,
  CartDetailSuccess,
  CartDetailFailure,
  UpdateDetailCartStart,
  UpdateDetailCartSuccess,
  UpdateDetailCartFailure,
} = CartDetailSlice.actions;

export default CartDetailSlice.reducer;
