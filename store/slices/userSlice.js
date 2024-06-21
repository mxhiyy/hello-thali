import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from "react-hot-toast";

export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async() => {
    const token = Cookies.get('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        }
    }
    const res = await axios.get('http://localhost:3000/api/user-profile', config);
    return res.data;
});

export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async(profileData)=> {
    const token = Cookies.get('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        }
    }
    const res = await axios.post('http://localhost:3000/api/user-profile', profileData, config);
    return res.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserProfile.pending, (state) => {
            state.status = 'Loading...';
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.status = "Succeeded ",
            state.profile = action.payload;
        })
        .addCase(fetchUserProfile.rejected , (state, action) => {
            state.status = "Failed",
            state.error = action.error.message;
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
            toast.success('Profile Update Successfully')
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
            state.status = "Failed";
            state.error = action.error.message;
            toast.error('Error Occurred! Try After some time')
        })
    }
});

export default userSlice.reducer;