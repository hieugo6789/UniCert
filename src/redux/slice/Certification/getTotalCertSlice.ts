import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CertCostDetail {
  certList: number[]; // Nếu cần thêm chi tiết danh sách chứng chỉ
  cost: number;
  isLoading: boolean;
  error: boolean;
}

const initialState: CertCostDetail = {
  certList: [],
  cost: 0,
  isLoading: false,
  error: false,
};

const CertCostSlice = createSlice({
  name: "certCost",
  initialState,
  reducers: {
    CertCostStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    CertCostSuccess: (state, action: PayloadAction<number>) => {
      state.isLoading = false;
      state.cost = action.payload;
      state.error = false;
    },
    CertCostFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  CertCostStart,
  CertCostSuccess,
  CertCostFailure,
} = CertCostSlice.actions;

export default CertCostSlice.reducer;
