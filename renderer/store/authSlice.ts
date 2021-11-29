import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type AuthState = {
    isLoggedIn: boolean;
    userUid: string;
    userEmail: string;
};
type AuthPayload = {
    userUid: string;
    userEmail: string;
};
const initialState: AuthState = {
    isLoggedIn: false,
    userUid: "",
    userEmail: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logIn(state: AuthState, action: PayloadAction<AuthPayload>) {
            state.isLoggedIn = true;
            state.userUid = action.payload.userUid;
            state.userEmail = action.payload.userEmail;
        },
        logOut(state: AuthState) {
            state.isLoggedIn = false;
            state.userUid = "",
                state.userEmail = ""
        },
    },
});


export const authActions = authSlice.actions;
export default authSlice.reducer;