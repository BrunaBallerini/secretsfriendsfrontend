import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const drawNameSlice = createSlice({
    name: 'drawName',
    initialState,
    reducers: {
        setDrawName: (_state, action) => action.payload,
    }
});
export const { setDrawName } = drawNameSlice.actions;
export default drawNameSlice.reducer;