import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, Context } from "next-redux-wrapper";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { ChatState } from "./chatSlice";
import { AuthState } from "./authSlice";

export interface RootState {
    auth: AuthState,
    chat: ChatState,
};

const store = (context: Context) => configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const wrapper = createWrapper(store, {
    debug: process.env.NODE_ENV === 'development',
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector