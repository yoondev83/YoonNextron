import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, Context } from "next-redux-wrapper";
import authReducer from "./authSlice";

const store = (context: Context) => configureStore({
    reducer: { auth: authReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const wrapper = createWrapper(store, {
    debug: process.env.NODE_ENV === 'development',
});
