import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type AuthState = {
    isLoggedIn: boolean;
    userToken: string;
    userEmail: string;
};
type AuthPayload = {
    userToken: string;
    userEmail: string;
};
const initialState: AuthState = {
    isLoggedIn: false,
    userToken: "",
    userEmail: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logIn(state: AuthState, action: PayloadAction<AuthPayload>) {
            state.isLoggedIn = true;
            state.userToken = action.payload.userToken;
            state.userEmail = action.payload.userEmail;
        },
        logOut(state: AuthState) {
            state.isLoggedIn = false;
            state.userToken = "",
                state.userEmail = ""
        },
    },
});


export const authActions = authSlice.actions;
export default authSlice.reducer;