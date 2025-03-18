import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const emailResetPasswordSlice = createSlice({
    name: 'emailResetPassword',
    initialState,
    reducers: {
        setEmailResetPasswordStore: (_state, action) => action.payload
    }
});
export const { setEmailResetPasswordStore } = emailResetPasswordSlice.actions;
export default emailResetPasswordSlice.reducer;