'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    phoneNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updatePhoneNumber(state, action) {
            state.phoneNumber = action.payload
        },

        updateProfileDetails(state, action){
            const { firstName, lastName, email, address } = action.payload;
            state.firstName = firstName,
            state.lastName = lastName,
            state.email = email,
            state.address = address
        },
    },
});

export const { updatePhoneNumber, updateProfileDetails } = userSlice.actions;
export default userSlice.reducer;