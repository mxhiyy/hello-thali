import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userAddress: [],
};

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        saveAddress: (state, action) => {
            state.userAddress.push(action.payload);
        },

        editAddress: (state, action) => {
            state.userAddress[action.payload.index] = action.payload.address;
        },

        deleteAddress : (state, action) => {
            state.userAddress.splice(action.payload, 1);
        },
    },
});

export const { saveAddress, editAddress, deleteAddress } = addressSlice.actions;
export default addressSlice.reducer;
