import { configureStore } from "@reduxjs/toolkit";
import clockReducer from "../features/clock/clockSlice";

export const store = configureStore({
    reducer: clockReducer
});

export type RootState = ReturnType<typeof store.getState>;