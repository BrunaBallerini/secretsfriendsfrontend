import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const drawStatusSlice = createSlice({
    name: 'drawStatus',
    initialState,
    reducers: {
        setDrawStatus: (_state, action) => action.payload,
    }
});
export const { setDrawStatus } = drawStatusSlice.actions;
export default drawStatusSlice.reducer;