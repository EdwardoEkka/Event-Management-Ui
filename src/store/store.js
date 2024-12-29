import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./auth";

export const store = configureStore({
  devTools: true,
  reducer: {
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

