import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name: 'alert',
    initialState: null,
    reducers: {
        showAlert: (state, action) => {
            return action.payload
        },
        dismissAlert: (state, action) => {
            return null
        }
    }
});

export const { showAlert, dismissAlert } = alertSlice.actions;
export default alertSlice.reducer;