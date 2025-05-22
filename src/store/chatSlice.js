import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState: [],
    reducers: {
        addChatMessages: (state, action) => {
            state.unshift(...action.payload);
        },
        appendMessage: (state, action) => {
            state.push(...action.payload)
        },
        removeChatMessages: () => []
    }
});

export const { addChatMessages, removeChatMessages, appendMessage } = chatSlice.actions;
export default chatSlice.reducer;