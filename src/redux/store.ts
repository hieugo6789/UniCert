// redux store
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slice/authSlice";
import majorReducer from "../redux/slice/majorSlice";
import accountReducer from "../redux/slice/accountSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    major: majorReducer,
    account: accountReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
