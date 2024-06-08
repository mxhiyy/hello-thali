import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";


export const sendOtp = createAsyncThunk('auth/sendOtp', async (phoneNumber) => {
    const res = await axios.post('http://localhost:3000/api/auth/send-otp', { phoneNumber });
    return res.data;
})


export const verifyOtp = createAsyncThunk('auth/verifyOtp', async ({ phoneNumber, otp }) => {
    const res = await axios.post('http://localhost:3000/api/auth/verify-otp', { phoneNumber, otp });
    return res.data;
});

export const resendOtp = createAsyncThunk('auth/resendOtp', async (phoneNumber) => {
    const res = await axios.post('http://localhost:3000/api/auth/resend-otp', { phoneNumber });
    return res.data;
});


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
        token: Cookies.get('token') || null,
        openLogin: false, //add for login modal state
        isLoggedIn: !!Cookies.get('token'),
    },

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = true;
            Cookies.remove('token');
        },

        openLoginModal: (state) => {
            state.openLogin = true;
        },

        closeLoginModal: (state) => {
            state.openLogin = false;
        }


    },

    extraReducers: (builder) => {
        builder
        .addCase(sendOtp.pending, (state) => {
            state.loading = true;
        })

        .addCase(sendOtp.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('OTP Send Successfully!');
        })

        .addCase(sendOtp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            toast.error('Failed to Send OTP');
        })

        .addCase(verifyOtp.pending, (state) => {
            state.loading = true;
        })

        .addCase(verifyOtp.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            console.log('Setting the token', state.token);
            state.user = action.payload;
            state.isLoggedIn = true;
            Cookies.set('token', action.payload.token);
            toast.success("OTP Verified Successfully!");
        })

        .addCase(verifyOtp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            toast.error('Invalid or Expired OTP!');
        })

        .addCase(resendOtp.pending, (state) => {
            state.loading = true;
        })

        .addCase(resendOtp.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('OTP Resend Successfully!');
        })

        .addCase(resendOtp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            toast.error('Failed to Resend OTP');
        })
    }
});

export const { setUser, logout, openLoginModal, closeLoginModal } = authSlice.actions;

export default authSlice.reducer;