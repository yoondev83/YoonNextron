import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type AuthState = {
    isLoggedIn: boolean;
    userUid: string;
    userEmail: string;
    userName: string;
};
type AuthPayload = {
    userUid: string;
    userEmail: string;
    userName: string;
};
const initialState: AuthState = {
    isLoggedIn: false,
    userUid: "",
    userEmail: "",
    userName: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logIn(state: AuthState, action: PayloadAction<AuthPayload>) {
            state.isLoggedIn = true,
                state.userUid = action.payload.userUid,
                state.userEmail = action.payload.userEmail,
                state.userName = action.payload.userName
        },
        logOut(state: AuthState) {
            state.isLoggedIn = false,
                state.userUid = "",
                state.userEmail = "",
                state.userName = ""
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;