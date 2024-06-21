import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import Cookies from 'js-cookie'

export const createOrder = createAsyncThunk('order/createOrder', async(orderData, { rejectWithValue }) => {
    const token = Cookies.get('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        }
    }
    try {
        const response = await axios.post('http://localhost:3000/api/create-orders', orderData, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});


export const fetchOrders = createAsyncThunk('order/fetchOrders', async(_, { rejectWithValue }) => {
    const token = Cookies.get('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        }
    }
    try {
        const response = await axios.get('http://localhost:3000/api/create-orders', config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.fulfilled, (state, action) => {
            state.orders.push(action.payload);
            state.status = "succeeded";
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'failed'
        })
        .addCase(fetchOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.status = 'succeeded';
        })
        .addCase(fetchOrders.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        });
    }
});

export default orderSlice.reducer;