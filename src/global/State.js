import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: []
};

export const dataSlice = createSlice({
    name: "Data store",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : " light";
        }
    }
});

export const { setMode } = dataSlice.actions;

export default dataSlice.reducer;