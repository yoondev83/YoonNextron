import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type ChatState = {
    selectedUid: string,
    selectedUserName: string,
};
type ChatPayload = {
    selectedUid: string,
    selectedUserName: string,
};
const initialState: ChatState = {
    selectedUid: "",
    selectedUserName: "",
}

const chatSlice = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {
        passUid(state: ChatState, action: PayloadAction<ChatPayload>) {
            state.selectedUid = action.payload.selectedUid;
            state.selectedUserName = action.payload.selectedUserName;
        },
        logout(state: ChatState) {
            state.selectedUid = "";
            state.selectedUserName = "";
        }
    },
});


export const chatActions = chatSlice.actions;
export default chatSlice.reducer;